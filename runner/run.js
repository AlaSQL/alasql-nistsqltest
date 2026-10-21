/**
 * Runs the NIST SQL Test Suite (Interactive SQL) against AlaSQL with a pool of persistent workers and prints a
 * Markdown report to stdout, one section per test file as it finishes (yarn test writes it to results/output.md).
 *
 * Each `-- PASS:` condition in a file is one check. A NIST test (TEST:nnnn) passes when all its checks pass.
 *
 *   --only-run=nist/sql/dml001.sql[,...]   exactly these files
 *   --include=REGEX  --exclude=REGEX       filter the files of runsql.all by path
 *   --concurrency=N                        workers (default: the number of cores)
 *   --debug                                also write every check that is not a pass, as one JSON line, to
 *                                          results/debug.jsonl (replaced on every run)
 *   --printAllErrors                       print every failure, not a sample
 *   --curiousErrorprinting=0.05            share of repeated failures printed besides the first of each kind
 *   --truncSQLStatement=300                cut printed SQL after this many characters
 *   --native-transactions                  send COMMIT / ROLLBACK to AlaSQL instead of emulating them
 *   --setup                                print every failed setup statement, not a sample
 *
 * ALASQL=path/to/alasql.fs.js tests another build, by default the npm package.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseRunOrder } from "./parse.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const alasql = require(process.env.ALASQL ? path.resolve(process.env.ALASQL) : "alasql");

const args = Bun.argv.slice(2);
const arg = (name, def) => {
	const i = args.findIndex(a => a === name || a.startsWith(name + "="));
	if (i < 0) return def;
	if (args[i].includes("=")) return args[i].slice(args[i].indexOf("=") + 1);
	const v = args[i + 1];
	return !v || v.startsWith("--") ? true : v;
};
const flag = name => args.includes(name);
const config = {
	onlyRun: arg("--only-run", ""),
	include: arg("--include", ""),
	exclude: arg("--exclude", ""),
	concurrency: Math.max(1, Number(arg("--concurrency", String(navigator.hardwareConcurrency || 4)))),
	debug: flag("--debug"),
	printAllErrors: flag("--printAllErrors"),
	curious: Number(arg("--curiousErrorprinting", "0.05")),
	trunc: Number(arg("--truncSQLStatement", "300")),
	nativeTransactions: flag("--native-transactions"),
	setupDetails: flag("--setup"),
};

if (!fs.existsSync(path.join(root, "nist/sql/runsql.all"))) {
	console.error("The NIST files are missing: run `yarn fetch` first");
	process.exit(1);
}

// ---- what to run ---------------------------------------------------------------------------------------------

const sqlPath = f => path.join(root, "nist/sql", f.toLowerCase() + (f.includes(".") ? "" : ".sql"));
const runsql = parseRunOrder(fs.readFileSync(path.join(root, "nist/sql/runsql.all"), "utf8"));
// the dataload programs (basetab, cugtab, ...) are part of the setup, not tests
const isDataload = f => /tab\d*$/i.test(f);
// runsch.all, alternative #1 (schema warning on access rule violation); X/Open profile schemas do not apply
const schemas = parseRunOrder(fs.readFileSync(path.join(root, "nist/schema/runsch.all"), "utf8"), { section: 1 }).filter(s => !/^xschema/i.test(s.file));
const setup = [
	...schemas.map(s => ({ file: "schema/" + s.file.toLowerCase(), path: path.join(root, "nist/schema", s.file.toLowerCase()), auth: s.auth })),
	...runsql.filter(r => isDataload(r.file)).map(r => ({ file: "sql/" + r.file.toLowerCase() + ".sql", path: sqlPath(r.file), auth: r.auth })),
];

let jobs = runsql.filter(r => !isDataload(r.file) && fs.existsSync(sqlPath(r.file))).map(r => ({ file: "nist/sql/" + r.file.toLowerCase() + ".sql", path: sqlPath(r.file), auth: r.auth }));
if (config.onlyRun) {
	if (config.onlyRun === true) {
		console.error("--only-run needs a file: --only-run=nist/sql/dml001.sql");
		process.exit(1);
	}
	jobs = config.onlyRun.split(",").map(f => {
		const p = path.resolve(root, f.trim());
		if (!fs.existsSync(p)) {
			console.error("No such test file: " + p);
			process.exit(1);
		}
		const known = runsql.find(r => sqlPath(r.file) === p);
		return { file: path.relative(root, p), path: p, auth: known ? known.auth : null };
	});
} else {
	if (config.include) jobs = jobs.filter(j => new RegExp(config.include).test(j.file));
	if (config.exclude) jobs = jobs.filter(j => !new RegExp(config.exclude).test(j.file));
}

const debugPath = path.join(root, "results/debug.jsonl");
if (config.debug) {
	fs.mkdirSync(path.dirname(debugPath), { recursive: true });
	fs.writeFileSync(debugPath, "");
}

// ---- report helpers ------------------------------------------------------------------------------------------

const fmt = n => n.toLocaleString("en-US");
const pct = (a, b) => (b ? Math.floor((100 * a) / b) : 0);
const trunc = (s, n) => (n > 1 && s.length > n ? s.slice(0, n - 1) + "…" : s);
const oneLine = s => s.replace(/\s+/g, " ").trim();
// the kind of a failure, for printing the first of each kind: the reason without values
// the kind of a failure, for printing the first of each kind in the run: the reason without values and names
const kindOf = c => c.status + ":" + c.why.replace(/'[^']*'|"[^"]*"/g, "").replace(/Parse error.*/, "Parse error").replace(/[\d.]+/g, "").replace(/[^a-z]/gi, "").slice(0, 80);
const seen = new Set();
let failures = 0;

const total = { files: 0, tests: 0, testsPassed: 0, pass: 0, fail: 0, unparsed: 0, unresolved: 0, rolledBack: 0, rebuilt: 0, crashed: 0 };

function report(index, job, res) {
	const out = [];
	out.push("", "---- ---- ---- ---- ---- ---- ----", `### ${index}/${jobs.length} \`${job.file}\`${job.auth ? ` (${job.auth})` : ""}`, "");
	if (res.crashed) out.push("Runner error: " + res.crashed, "");
	const byTest = new Map();
	let printed = 0;
	res.conditions.forEach(c => {
		total[c.status]++;
		if (c.test) {
			const t = byTest.get(c.test) || { pass: true };
			if (c.status !== "pass") t.pass = false;
			byTest.set(c.test, t);
		}
		if (c.status === "pass") return;
		const kind = kindOf(c);
		const curious = config.curious > 0 && failures++ % Math.max(1, Math.round(1 / config.curious)) === 0;
		if (config.printAllErrors || !seen.has(kind) || curious) {
			seen.add(kind);
			printed++;
			out.push("```sql", trunc(oneLine(c.sql), config.trunc), "", `TEST:${c.test || "-"} PASS:${c.id} ${trunc(oneLine(c.condition), config.trunc)}`, `=> ${c.status === "fail" ? "" : c.status + ": "}${trunc(c.why, config.trunc)}`, "```", "");
		}
	});
	const tests = [...byTest.values()];
	const testsPassed = tests.filter(t => t.pass).length;
	total.files++;
	total.tests += tests.length;
	total.testsPassed += testsPassed;
	total.rolledBack += res.rolledBack || 0;
	total.rebuilt += res.rebuilt || 0;
	if (res.crashed) total.crashed++;
	const n = { pass: 0, fail: 0, unparsed: 0, unresolved: 0 };
	for (const c of res.conditions) n[c.status]++;
	const checked = n.pass + n.fail;
	out.push(`#### ${n.fail === 0 && !res.crashed ? "★" : "☓"} Ran ${fmt(res.conditions.length)} checks in ${fmt(tests.length)} tests`, "");
	if (n.fail) out.push(`* ${fmt(n.fail)} failed`);
	if (n.unparsed) out.push(`* ${fmt(n.unparsed)} not read (condition text the runner does not understand)`);
	if (n.unresolved) out.push(`* ${fmt(n.unresolved)} not resolved (the condition names a column the result does not have)`);
	out.push(`* ${pct(n.pass, checked)}% of the checks and ${pct(testsPassed, tests.length)}% of the tests were OK`, "");
	console.log(out.join("\n"));
	if (config.debug) {
		const lines = res.conditions.filter(c => c.status !== "pass").map(c => JSON.stringify({ file: job.file, auth: job.auth, ...c }));
		if (lines.length) fs.appendFileSync(debugPath, lines.join("\n") + "\n");
	}
}

// ---- workers -------------------------------------------------------------------------------------------------

const started = performance.now();
console.log("# NIST SQL Test Suite results for AlaSQL\n");
console.log("`" + new Date().toISOString() + " target: alasql@" + alasql.version + "`\n");
console.log(`NIST SQL Test Suite, Version 6.0 (1996), Interactive SQL: ${jobs.length} test files${config.nativeTransactions ? ", COMMIT and ROLLBACK sent to AlaSQL" : ", COMMIT and ROLLBACK emulated by the runner"}.\n`);

const workers = Array.from({ length: Math.min(config.concurrency, Math.max(1, jobs.length)) }, () => new Worker(new URL("./worker.js", import.meta.url).href, { type: "module" }));
const ask = (w, msg) =>
	new Promise((resolve, reject) => {
		w.onmessage = ev => resolve(ev.data);
		w.onerror = e => reject(e);
		w.postMessage(msg);
	});

// The setup once, to report it
const setupResult = await ask(workers[0], { setup, reportSetup: true });
{
	const s = setupResult.setup;
	console.log(`## Setup\n\n${setup.length} files (${schemas.length} schemas, ${setup.length - schemas.length} dataload programs), ${fmt(s.statements)} statements, ${fmt(s.failed.length)} failed.\n`);
	// the kind of a failure: the statement (first two words) and the error without names, numbers and echoed SQL
	const kindOf = f => f.sql.split(/\s+/).slice(0, 2).join(" ").toUpperCase() + ": " + (/^Parse error/.test(f.error) ? "Parse error" : f.error.replace(/'[^']*'|"[^"]*"/g, "…").replace(/\d+/g, "N").slice(0, 70));
	// one line per setup file, with its most common failure
	console.log("| File | Authorization | Statements | Failed | Most common failure |\n|---|---|---|---|---|");
	for (const f of s.files) {
		const kinds = new Map();
		for (const x of s.failed) if (x.file === f.file) kinds.set(kindOf(x), (kinds.get(kindOf(x)) || 0) + 1);
		const top = [...kinds].sort((a, b) => b[1] - a[1])[0];
		console.log(`| \`${f.file}\` | ${f.auth} | ${fmt(f.statements)} | ${fmt(f.failed)} | ${top ? `${top[0].replace(/\|/g, "\\|")} (${fmt(top[1])})` : ""} |`);
	}
	console.log("");
	// the first failure of each kind per file, sampled unless --setup
	const seen = new Set();
	const firsts = s.failed.filter(x => !seen.has(x.file + kindOf(x)) && seen.add(x.file + kindOf(x)));
	const every = Math.max(1, Math.round(1 / Math.max(config.curious, 0.1)));
	const shown = config.setupDetails ? s.failed : firsts.filter((_, i) => i % every === 0);
	for (const x of shown) console.log("```sql\n" + trunc(oneLine(x.sql), config.trunc) + `\n\n${x.file}:${x.line}\n=> ` + trunc(x.error, config.trunc) + "\n```\n");
	if (!config.setupDetails) console.log(`_${fmt(shown.length)} of ${fmt(firsts.length)} kinds of setup failure shown; run with --setup to see every failed statement_\n`);
}

const queue = jobs.map((j, i) => ({ ...j, index: i + 1 }));
let done = 0;
await Promise.all(
	workers.map(async (w, wi) => {
		let first = wi !== 0;
		while (queue.length) {
			const job = queue.shift();
			const res = await ask(w, { ...job, setup: first ? setup : undefined, options: { nativeTransactions: config.nativeTransactions } });
			first = false;
			done++;
			report(done, job, res);
		}
		w.terminate();
	}),
);

const checked = total.pass + total.fail;
console.log("\n-----------------------------\n");
console.log("## Final result\n");
console.log(`* \`alasql@${alasql.version}\` (Bun ${Bun.version})`);
console.log(`* Test files: ${fmt(total.files)}${total.crashed ? ` (${fmt(total.crashed)} stopped by a runner error)` : ""}`);
console.log(`* Checks: ${fmt(total.pass + total.fail + total.unparsed + total.unresolved)}: ${fmt(total.pass)} passed, ${fmt(total.fail)} failed, ${fmt(total.unparsed)} not read, ${fmt(total.unresolved)} not resolved`);
console.log(`* Tests (TEST:nnnn, all checks pass): ${fmt(total.testsPassed)} of ${fmt(total.tests)}`);
console.log(`* ROLLBACK emulated ${fmt(total.rolledBack)} times (${fmt(total.rebuilt)} by rebuilding after DDL)`);
console.log(`* Final score: ${pct(total.pass, checked)} % of the checks and ${pct(total.testsPassed, total.tests)} % of the tests were OK\n`);
console.log(`Total script time: ${((performance.now() - started) / 1000).toFixed(1)}s\n`);
console.log("_Repeated failures are sampled; run with --printAllErrors to see every one, or --debug for results/debug.jsonl_");
