/**
 * Turns the English condition after `-- PASS:<id>` into a check of the statement's result.
 *
 *   compile(text) -> {check(result) -> {ok, why}} or {unparsed: reason}
 *
 * result is {error: string | null, rows: object[] | null (a query), columns: string[], count: number | null (DML)}.
 *
 * The forms cover what the suite writes most (see `bun run runner/expect.js` for the share of conditions read):
 *   If count = 4?                          one row, its (first) value is 4
 *   If 4 rows selected and last EMPNUM = 'E1'?
 *   If 1 row is inserted?  If 5 rows deleted?
 *   If EMPNAME = 'Alice' and GRADE = 12?   If MAX(STAFF1.GRADE) = 18?   If c1 is NULL?
 *   If 1 row selected and values are -99 and -6?
 *   If table created successfully?  If view is created?  If successful completion?
 *   If ERROR, syntax error/access violation, 0 rows updated?   OR SQLSTATE = 22012 OR SQLCODE < 0?
 *   If 2 rows are selected in the following order?   (then a header line and one line per row)
 * A condition the grammar does not read is reported as unparsed, never as a failure of AlaSQL.
 */

const WORDS = { no: 0, zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20 };
const toNumber = w => (/^\d+$/.test(w) ? Number(w) : WORDS[w.toLowerCase()]);
const NUM = "(\\d+|no|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)";

// A value as the suite writes it: 'text', a number, NULL, or a range "30 to 31"
const VALUE = "((?!(?:previous|next|above|same)\\b)[A-Z][A-Z0-9_]*(?: [A-Z][A-Z0-9_]*)?(?![\\w(])|'(?:[^']|'')*'|-?\\d+(?:\\.\\d+)?(?:E[-+]?\\d+)?(?:\\s+to\\s+-?\\d+(?:\\.\\d+)?)?|NULL)";
const parseValue = v => {
	v = v.trim();
	if (/^NULL$/i.test(v)) return { null: true };
	if (/^'/.test(v)) return { text: v.slice(1, -1).replace(/''/g, "'") };
	if (/^[A-Z]/i.test(v)) return { text: v };
	const r = /^(-?[\d.E+-]+)\s+to\s+(-?[\d.E+-]+)$/i.exec(v);
	if (r) return { from: Number(r[1]), to: Number(r[2]) };
	return { number: Number(v) };
};
const show = v => (v === undefined || v === null ? "NULL" : typeof v === "string" ? `'${v}'` : String(v));

// SQL comparison of a result value with an expected one: CHAR values are compared without trailing blanks,
// numbers with a small tolerance (the suite prints approximate values to a few digits)
export const sameValue = (actual, expected) => {
	if (expected.null) return actual === null || actual === undefined;
	if (actual === null || actual === undefined) return false;
	if (expected.text !== undefined) return String(actual).replace(/\s+$/, "") === expected.text.replace(/\s+$/, "");
	const n = typeof actual === "number" ? actual : Number(String(actual).trim());
	if (Number.isNaN(n)) return false;
	if (expected.from !== undefined) return n >= expected.from && n <= expected.to;
	return Math.abs(n - expected.number) <= 1e-6 * Math.max(1, Math.abs(expected.number));
};

// The result column a condition names: by name (case-insensitive, with or without a table qualifier), or the
// only column when the name is an expression or a word such as count / value
const findColumn = (result, name) => {
	const cols = result.columns || [];
	const norm = s => s.toUpperCase().replace(/\s+/g, "");
	const n = norm(name);
	let c = cols.find(c => norm(c) === n);
	if (c === undefined) c = cols.find(c => norm(c).replace(/^.*\./, "") === n.replace(/^.*\./, ""));
	if (c === undefined && cols.length === 1 && (/[()]/.test(name) || /^(COUNT|VALUE|C1|COLUMN1|RESULT)$/i.test(name))) c = cols[0];
	return c;
};

const describe = r => (r.error ? `error: ${r.error}` : r.rows ? `${r.rows.length} rows` : `count ${r.count}`);

// One clause, such as `4 rows selected`, `last EMPNUM = 'E1'`, `count = 2`, `table created successfully`
function clause(text) {
	const t = text.trim().replace(/^(if|and|then|with)\s+/i, "").trim();
	let m;
	if (!t) return null;
	// expected to fail
	if (/^(an?\s+)?error\b|\berror\b.*\b(violation|exception|constraint)\b|^(RI\s+)?ERROR|violation\b|^SQLCODE\s*<\s*0$/i.test(t))
		return { name: "error", check: r => (r.error ? { ok: true } : { ok: false, why: "expected an error, got " + describe(r) }) };
	if ((m = /^SQLSTATE\s*=\s*'?(\d{2})(\w{3})'?/i.exec(t))) {
		const cls = m[1];
		if (cls === "00" || cls === "01") return { name: "success", check: r => (r.error ? { ok: false, why: `expected SQLSTATE ${m[1]}${m[2]}, got ${describe(r)}` } : { ok: true }) };
		if (cls === "02") return { name: "no data", check: r => (!r.error && ((r.rows && r.rows.length === 0) || r.count === 0) ? { ok: true } : { ok: false, why: "expected no data, got " + describe(r) }) };
		return { name: "error", check: r => (r.error ? { ok: true } : { ok: false, why: `expected SQLSTATE ${m[1]}${m[2]}, got ${describe(r)}` }) };
	}
	// expected to work
	if (/^(the\s+)?(table|view|domain|schema|index|assertion|character set|collation|translation|privileges?|grant|trigger|column|constraint|statement|it)s?\b.*\b(created|dropped|altered|granted|revoked|completed|executed|added|accepted|successful(ly)?)\b|\bsuccessful(ly)?\b|\bcompleted\b|^(no\s+error|executes?\s+successfully)|^WARNING\b/i.test(t))
		return { name: "success", check: r => (r.error ? { ok: false, why: "expected success, got " + describe(r) } : { ok: true }) };
	if (/^end of data$/i.test(t))
		return { name: "no data", check: r => (!r.error && ((r.rows && r.rows.length === 0) || r.count === 0) ? { ok: true } : { ok: false, why: "expected no data, got " + describe(r) }) };
	// a number of rows
	if ((m = new RegExp(`^${NUM}\\s+rows?\\s+(?:is\\s+|are\\s+|were\\s+|was\\s+)?(selected|returned|inserted|updated|deleted|affected|changed|found)`, "i").exec(t))) {
		const n = toNumber(m[1]), what = m[2].toLowerCase();
		return {
			name: "rows",
			rows: n,
			check: r => {
				if (r.error) return { ok: n === 0 && what !== "selected" && what !== "returned" ? false : false, why: `expected ${n} rows ${what}, got ${describe(r)}` };
				const got = r.rows ? r.rows.length : r.count;
				return got === n ? { ok: true } : { ok: false, why: `expected ${n} rows ${what}, got ${got}` };
			},
		};
	}
	// count = N: one row, one value
	if ((m = new RegExp(`^count\\s*=\\s*${VALUE}\\s*$`, "i").exec(t))) {
		const v = parseValue(m[1]);
		return {
			name: "count",
			check: r => {
				if (r.error) return { ok: false, why: "expected count " + m[1] + ", got " + describe(r) };
				if (!r.rows || r.rows.length !== 1) return { ok: false, why: `expected one row with count ${m[1]}, got ${describe(r)}` };
				const got = r.rows[0][r.columns[0]];
				return sameValue(got, v) ? { ok: true } : { ok: false, why: `expected count ${m[1]}, got ${show(got)}` };
			},
		};
	}
	// values are A and B: the columns of the (only) row in order
	if ((m = /^values?\s+(?:are|is|=)\s+(.+)$/i.exec(t))) {
		const vals = m[1].split(/\s*(?:,|\band\b)\s*/i).filter(Boolean);
		if (!vals.every(v => new RegExp(`^${VALUE}$`, "i").test(v))) return null;
		const exp = vals.map(parseValue);
		return {
			name: "values",
			check: r => {
				if (r.error || !r.rows || !r.rows.length) return { ok: false, why: `expected values ${m[1]}, got ${describe(r)}` };
				const got = r.columns.map(c => r.rows[0][c]);
				const ok = exp.length === 1 ? got.some(g => sameValue(g, exp[0])) && got.length >= 1 : exp.every((e, i) => sameValue(got[i], e));
				return ok ? { ok: true } : { ok: false, why: `expected values ${m[1]}, got ${got.map(show).join(", ")}` };
			},
		};
	}
	// [first | last] COLUMN = VALUE, COLUMN is [not] NULL
	if ((m = new RegExp(`^(?:(first|last)\\s+)?([A-Z_][\\w.]*(?:\\s*\\([^)]*\\))?)\\s*(=|<>|is\\s+not|is)\\s*${VALUE}(?:\\s+for\\s+${VALUE})?\\s*$`, "i").exec(t))) {
		const [, pos, col, op, raw] = m;
		if (/^(rows?|values?)$/i.test(col)) return null;
		const v = parseValue(raw);
		const negate = /^(<>|is\s+not)$/i.test(op);
		return {
			name: "value",
			check: r => {
				if (r.error) return { ok: false, why: `expected ${t}, got ${describe(r)}` };
				if (!r.rows) return { ok: false, why: `expected ${t}, got ${describe(r)}` };
				if (!r.rows.length) return { ok: false, why: `expected ${t}, got no rows` };
				const c = findColumn(r, col);
				if (c === undefined) return { unresolved: `no column ${col} in ${r.columns.join(", ")}` };
				const rows = pos === "first" ? [r.rows[0]] : pos === "last" ? [r.rows[r.rows.length - 1]] : r.rows.length === 1 ? r.rows : null;
				if (!rows) {
					// without first/last on several rows: the value must be in one of them (the suite means "the row")
					const ok = r.rows.some(row => sameValue(row[c], v) !== negate);
					return ok ? { ok: true } : { ok: false, why: `expected ${t}, got ${r.rows.map(row => show(row[c])).join(", ")}` };
				}
				const got = rows[0][c];
				return sameValue(got, v) !== negate ? { ok: true } : { ok: false, why: `expected ${t}, got ${show(got)}` };
			},
		};
	}
	return null;
}

// Values of an expected table row: quoted text, ranges "30 to 31", numbers, NULL and bare words
const rowValues = line => {
	const out = [];
	const re = /'(?:[^']|'')*'|-?\d+(?:\.\d+)?\s+to\s+-?\d+(?:\.\d+)?|\S+/gi;
	for (const m of line.replace(/\?\s*$/, "").matchAll(re)) out.push(m[0]);
	return out;
};
const expectedCell = tok => (/^'/.test(tok) || /^-?\d/.test(tok) || /^NULL$/i.test(tok) ? parseValue(tok) : { text: tok });

// "in the following order" / "as follows": a header line, then one line per row
function table(lines, head) {
	const rowLines = lines.slice(2).map(l => l.trim()).filter(l => l && !/^[-=*]+\??$/.test(l));
	if (!rowLines.length) return null;
	const expected = rowLines.map(l => rowValues(l).map(expectedCell));
	const rowNo = /ROW\s*#\s*(\d+)/i.exec(head);
	const ordered = /order/i.test(head);
	return {
		name: "table",
		check: r => {
			if (r.error || !r.rows) return { ok: false, why: "expected rows, got " + describe(r) };
			const got = r.rows.map(row => r.columns.map(c => row[c]));
			const match = (g, e) => g.length >= e.length && e.every((cell, i) => sameValue(g[i], cell));
			if (rowNo) {
				const g = got[Number(rowNo[1]) - 1];
				return g && match(g, expected[0]) ? { ok: true } : { ok: false, why: `expected row #${rowNo[1]} ${rowLines[0]}, got ${g ? g.map(show).join(" ") : "no such row"}` };
			}
			if (ordered) {
				const ok = got.length === expected.length && expected.every((e, i) => match(got[i], e));
				return ok ? { ok: true } : { ok: false, why: `expected ${rowLines.join(" | ")}, got ${got.map(g => g.map(show).join(" ")).join(" | ")}` };
			}
			const rest = [...got];
			for (const e of expected) {
				const i = rest.findIndex(g => match(g, e));
				if (i < 0) return { ok: false, why: `expected a row ${e.map(x => show(x.text ?? x.number ?? null)).join(" ")}, got ${got.map(g => g.map(show).join(" ")).join(" | ")}` };
				rest.splice(i, 1);
			}
			return { ok: true };
		},
	};
}

export function compile(text) {
	const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
	if (!lines.length) return { unparsed: "empty condition" };
	// the first line, and alternatives on lines that start with OR
	const main = [lines[0]], alternatives = [];
	let tableLines = null;
	for (const l of lines.slice(1)) {
		if (/^OR\b/i.test(l)) alternatives.push(l.replace(/^OR\s+/i, ""));
		else if (tableLines) tableLines.push(l);
		else if (/following|as follows|in this order|ordered rows/i.test(lines[0])) tableLines = [lines[0], l];
		else main.push(l);
	}
	const head = main.join(" ").replace(/\?\s*$/, "").replace(/\?\s+/g, " ").trim();
	const checks = [];
	if (tableLines) {
		const t = table(tableLines, head);
		if (!t) return { unparsed: "table: " + lines.join(" / ") };
		checks.push(t);
		const count = new RegExp(`${NUM}\\s+rows?`, "i").exec(head);
		if (count) checks.push(clause(`${count[1]} rows selected`));
	} else {
		// split the main condition into clauses on "and" / ";" / ","
		const parts = head.replace(/^if\s+/i, "").split(/\s*(?:;|\s\bif\b\s|,(?!\s*(?:syntax|access|check|unique|parent|integrity|substring|view|data|invalid|division|string|0 rows|no\b))|\band\b(?![^(]*\)))\s*/i).filter(Boolean);
		let errorClause = false;
		for (const p of parts) {
			const c = clause(p);
			if (c && c.name === "error") errorClause = true;
			if (!c) {
				if (errorClause) continue; // the words after ERROR describe the error: "ERROR, unique constraint, 0 rows inserted"
				return { unparsed: p };
			}
			if (errorClause && c.name === "rows") continue;
			checks.push(c);
		}
	}
	const alts = [];
	for (const a of alternatives) {
		const c = compile(a);
		if (c.unparsed) return { unparsed: "OR " + c.unparsed };
		alts.push(c);
	}
	return {
		checks,
		check(result) {
			let first = null;
			for (const c of checks) {
				const v = c.check(result);
				if (v.unresolved) { first = first || v; continue; }
				if (!v.ok) { first = v; break; }
			}
			if (!first) return { ok: true };
			for (const a of alts) if (a.check(result).ok) return { ok: true };
			return first;
		},
	};
}

// bun run runner/expect.js: the share of conditions in nist/sql that the grammar reads, and the most common rest
if (import.meta.main) {
	const fs = await import("fs");
	const { parseFile } = await import("./parse.js");
	let total = 0, read = 0;
	const rest = {};
	for (const f of fs.readdirSync("nist/sql").filter(f => f.endsWith(".sql"))) {
		for (const it of parseFile(fs.readFileSync("nist/sql/" + f, "utf8")).items) {
			if (it.kind !== "pass") continue;
			total++;
			const c = compile(it.text);
			if (c.unparsed) {
				const k = c.unparsed.replace(/'[^']*'/g, "'…'").replace(/\b\d+(\.\d+)?\b/g, "N").slice(0, 90);
				rest[k] = (rest[k] || 0) + 1;
			} else read++;
		}
	}
	console.log(`${read} of ${total} conditions read (${((100 * read) / total).toFixed(1)} %)`);
	for (const [k, n] of Object.entries(rest).sort((a, b) => b[1] - a[1]).slice(0, Number(process.argv[2] || 30))) console.log(String(n).padStart(5), k);
}
