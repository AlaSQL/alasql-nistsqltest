/**
 * Runs NIST test files, one per job, with its own AlaSQL instance (the worker is reused for many files).
 *
 * Before each file the databases are put back to the state after the setup (all schemas and dataload
 * programs). A file runs under its authorization id: unqualified names belong to the database of that id.
 * COMMIT and ROLLBACK are emulated (AlaSQL's in-memory ROLLBACK changes nothing), unless --native-transactions:
 * the table contents are saved at the start of the file and at every COMMIT, and put back on ROLLBACK. After
 * DDL since the last COMMIT, a ROLLBACK rebuilds everything from the setup and replays the committed statements.
 */
import fs from "fs";
import { parseFile } from "./parse.js";
import { translate } from "./translate.js";
import { compile } from "./expect.js";

const alasql = require(process.env.ALASQL ? require("path").resolve(process.env.ALASQL) : "alasql");

const message = e => String(e && e.message !== undefined ? e.message : e).replace(/\s+/g, " ").trim() || "no error message";
const DDL = /^(CREATE|DROP|ALTER|GRANT|REVOKE)\b/i;

const parsed = new Map(); // path -> parseFile() result
const parse = file => {
	if (!parsed.has(file)) parsed.set(file, parseFile(fs.readFileSync(file, "utf8")));
	return parsed.get(file);
};

// ---- AlaSQL state --------------------------------------------------------------------------------------------

function resetAll() {
	alasql.useid = "alasql";
	for (const id of Object.keys(alasql.databases)) if (id !== "alasql" && id !== "dbo") delete alasql.databases[id];
	const db = alasql.databases.alasql;
	db.tables = {};
	db.views = {};
	db.triggers = {};
	db.indices = {};
	db.sqlCache = {};
	db.astCache = {};
	alasql.tables = db.tables;
	alasql.sets = {};
}

const use = id => {
	if (!alasql.databases[id]) alasql("CREATE DATABASE " + id);
	alasql("USE " + id);
};

// Runs one statement (already translated); returns {error, rows, columns, count}
function exec(sql) {
	try {
		const res = alasql(sql);
		if (Array.isArray(res)) return { error: null, rows: res, columns: res.length ? Object.keys(res[0]) : [], count: null };
		return { error: null, rows: null, columns: [], count: typeof res === "number" ? res : null };
	} catch (e) {
		return { error: message(e), rows: null, columns: [], count: null };
	}
}

// Saves what a ROLLBACK must put back: per database its tables and views (by reference) and the table contents
// (cloned together, so the rows in uniqs and indices stay the rows in data)
function snapshot() {
	const dbs = {};
	for (const [id, db] of Object.entries(alasql.databases)) {
		const contents = {};
		for (const [name, t] of Object.entries(db.tables)) contents[name] = { data: t.data, uniqs: t.uniqs, indices: t.indices, identities: t.identities };
		dbs[id] = { db, tables: { ...db.tables }, views: { ...db.views }, contents: structuredClone(contents) };
	}
	return dbs;
}

function restore(snap) {
	for (const id of Object.keys(alasql.databases)) if (!snap[id]) delete alasql.databases[id];
	for (const [id, s] of Object.entries(snap)) {
		alasql.databases[id] = s.db;
		s.db.tables = { ...s.tables };
		s.db.views = { ...s.views };
		const contents = structuredClone(s.contents);
		for (const [name, c] of Object.entries(contents)) Object.assign(s.db.tables[name], c);
		s.db.sqlCache = {};
		s.db.astCache = {};
	}
	// alasql.sets stays: CHECK constraints compiled in the setup look their IN lists up there
	if (!alasql.databases[alasql.useid]) alasql.useid = "alasql";
	alasql.tables = alasql.databases[alasql.useid].tables;
}

// ---- setup ---------------------------------------------------------------------------------------------------

let setupPlan = null; // [{file, auth}]
let setupSnap = null;
let setupReport = null;

function runSetup() {
	resetAll();
	const report = { statements: 0, failed: [], files: [] };
	for (const step of setupPlan) {
		use(step.auth);
		const file = { file: step.file, auth: step.auth, statements: 0, failed: 0 };
		report.files.push(file);
		for (const it of parse(step.path).items) {
			if (it.kind !== "sql") continue;
			for (const part of translate(it.sql, { auth: step.auth })) {
				if (part.control) continue;
				if (part.ensureDatabase) {
					if (!alasql.databases[part.ensureDatabase]) alasql("CREATE DATABASE " + part.ensureDatabase);
					continue;
				}
				report.statements++;
				file.statements++;
				const r = exec(part.sql);
				if (r.error) {
					file.failed++;
					report.failed.push({ file: step.file, line: it.line, sql: part.sql, error: r.error });
				}
			}
		}
	}
	alasql.useid = "alasql";
	return report;
}

// ---- one test file -------------------------------------------------------------------------------------------

function runFile(job) {
	const { auth, items, tests } = parse(job.path);
	const session = { auth: job.auth || auth || "HU" };
	use(session.auth);

	let saved = snapshot();
	let ddlSinceCommit = false;
	let committed = []; // statements since the setup that a full rebuild must replay
	let pending = [];
	let rebuilt = 0, rolledBack = 0;
	const results = new Map(); // item index -> result of its statement
	const conditions = [];

	const rollback = () => {
		rolledBack++;
		if (!ddlSinceCommit) return restore(saved);
		rebuilt++;
		runSetup();
		use(session.auth);
		for (const sql of committed) exec(sql);
		saved = snapshot();
	};

	items.forEach((it, index) => {
		if (it.kind === "sql") {
			let last = { error: null, rows: null, columns: [], count: null };
			for (const part of translate(it.sql, session)) {
				if (part.ensureDatabase) {
					if (!alasql.databases[part.ensureDatabase]) alasql("CREATE DATABASE " + part.ensureDatabase);
					continue;
				}
				if (part.control && !job.options.nativeTransactions) {
					if (part.control === "commit") {
						committed.push(...pending);
						pending = [];
						saved = snapshot();
						ddlSinceCommit = false;
					} else {
						rollback();
						pending = [];
						ddlSinceCommit = false;
					}
					continue;
				}
				const r = exec(part.sql);
				if (DDL.test(part.sql)) ddlSinceCommit = true;
				pending.push(part.sql);
				if (r.error || !last.error) last = r;
			}
			results.set(index, last);
			return;
		}
		// a condition: check the result of the statement before it
		const c = compile(it.text);
		const stmt = items[it.sqlIndex];
		const base = { test: it.test, id: it.id, line: it.line, condition: it.text, sql: stmt ? stmt.sql : "", stmtLine: stmt ? stmt.line : null };
		if (c.unparsed) return conditions.push({ ...base, status: "unparsed", why: "condition not read: " + c.unparsed });
		const res = results.get(it.sqlIndex);
		if (!res) return conditions.push({ ...base, status: "unresolved", why: "no statement before the condition" });
		const v = c.check(res);
		if (v.unresolved) return conditions.push({ ...base, status: "unresolved", why: v.unresolved, got: res.error || res.rows || res.count });
		conditions.push({ ...base, status: v.ok ? "pass" : "fail", why: v.why || "", got: v.ok ? undefined : res.error ? { error: res.error } : res.rows ?? res.count });
	});
	return { conditions, tests: tests.length, rolledBack, rebuilt, ddl: items.some(i => i.kind === "sql" && DDL.test(i.sql)) };
}

// ---- messages ------------------------------------------------------------------------------------------------

let dirty = true; // the databases are not in the saved setup state

self.addEventListener("message", ev => {
	const job = ev.data;
	if (job.setup) {
		setupPlan = job.setup;
		dirty = true;
	}
	if (dirty || !setupSnap) {
		setupReport = runSetup();
		setupSnap = snapshot();
		dirty = false;
	} else {
		restore(setupSnap);
	}
	if (job.reportSetup) {
		self.postMessage({ setup: setupReport });
		return;
	}
	let out;
	try {
		out = runFile(job);
	} catch (e) {
		out = { crashed: message(e), conditions: [], tests: 0, rolledBack: 0, rebuilt: 0, ddl: true };
	}
	// DDL in a file can change tables in place (ALTER TABLE), which a restore cannot undo
	if (out.ddl) dirty = true;
	self.postMessage({ file: job.file, ...out });
});
