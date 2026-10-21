/**
 * Reads a NIST SQL Test Suite file (Interactive SQL *.sql or a schema definition *.std) into a list of items:
 *
 *   {kind: "sql", sql, line, test}           a statement, without its terminating ;
 *   {kind: "pass", id, text, lines, line, test, sqlIndex}
 *                                             the condition after `-- PASS:<id>`, joined over the lines that
 *                                             continue it; sqlIndex points to the statement it checks
 *
 * plus `auth`, the authorization id from `-- AUTHORIZATION <id>`, and `tests`, the TEST numbers in the file.
 *
 * Statements end at a ; outside quotes. A schema definition (*.std) has no ; at all: the whole file is one
 * CREATE SCHEMA statement with its elements.
 */

// Removes a -- comment that follows SQL on the same line, outside quotes
const stripTrailingComment = line => {
	let quoted = false;
	for (let i = 0; i < line.length; i++) {
		if (line[i] === "'") quoted = !quoted;
		else if (!quoted && line[i] === "-" && line[i + 1] === "-") return line.slice(0, i);
	}
	return line;
};

// Splits SQL text at ; outside quotes; returns [complete statements, rest]
const splitStatements = text => {
	const out = [];
	let quoted = false, start = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i] === "'") quoted = !quoted;
		else if (!quoted && text[i] === ";") {
			out.push(text.slice(start, i));
			start = i + 1;
		}
	}
	return [out, text.slice(start)];
};

export function parseFile(content) {
	const lines = content.replace(/\r/g, "").split("\n");
	const items = [];
	const tests = [];
	let auth = null, test = null, buffer = "", bufferLine = 0, lastSql = -1, pass = null;

	const flush = () => {
		const [stmts, rest] = splitStatements(buffer);
		for (const s of stmts) {
			if (s.trim()) {
				items.push({ kind: "sql", sql: s.trim(), line: bufferLine, test });
				lastSql = items.length - 1;
			}
		}
		buffer = rest;
		if (!rest.trim()) buffer = "";
	};

	lines.forEach((raw, i) => {
		const lineNo = i + 1;
		const line = raw.trimEnd();
		const comment = /^\s*--(.*)$/.exec(line);
		if (!comment) {
			const sql = stripTrailingComment(line);
			if (sql.trim()) {
				if (!buffer.trim()) bufferLine = lineNo;
				buffer += sql + "\n";
				if (sql.includes(";")) flush();
				pass = null;
			}
			return;
		}
		const text = comment[1];
		let m;
		if ((m = /^\s*AUTHORIZATION\s+(\S+)/i.exec(text))) {
			auth = auth || m[1].toUpperCase();
		} else if ((m = /^\s*TEST\s*:\s*(\d+)\s*(.*?)!?\s*$/i.exec(text))) {
			test = m[1];
			tests.push({ id: m[1], title: m[2], line: lineNo });
			pass = null;
		} else if (/^\s*END TEST\b/i.test(text)) {
			test = null;
			pass = null;
		} else if ((m = /^\s*PASS\s*:\s*([^\s]+)\s?(.*)$/i.exec(text))) {
			// a condition belongs to the last complete statement before it
			if (buffer.trim()) flush();
			if (pass && pass.id === m[1] && pass.sqlIndex === lastSql) {
				pass.lines.push(m[2]);
				pass.text += "\n" + m[2];
			} else {
				pass = { kind: "pass", id: m[1], text: m[2], lines: [m[2]], line: lineNo, test, sqlIndex: lastSql };
				items.push(pass);
			}
		} else if (pass && /^\s{2,}\S/.test(text) && !/^\s*(\*|TEST|END)/i.test(text)) {
			// an indented comment right after a PASS line continues it (rows of an expected table)
			pass.lines.push(text);
			pass.text += "\n" + text;
		} else {
			pass = null;
		}
	});
	// a schema definition without any ; is one statement
	if (buffer.trim()) {
		items.push({ kind: "sql", sql: buffer.trim(), line: bufferLine, test });
	}
	return { auth, items, tests };
}

// Reads a NIST run order file (runsql.all, runsch.all): [{file, auth, note}] for the RUNSQL / RUNSCH lines
// of the given section (runsch.all lists three alternatives; section 1 is "schema warning")
export function parseRunOrder(content, { section = null } = {}) {
	const out = [];
	let current = null;
	for (const raw of content.replace(/\r/g, "").split("\n")) {
		const s = /^NOTE\s+#(\d)\s*$/.exec(raw);
		if (s) current = Number(s[1]);
		const m = /^(RUNSQL|RUNSCH)\s+(\S+)\s+(\S+)\s*(?:-\s*(.*))?$/.exec(raw.trim());
		if (!m) continue;
		if (section !== null && current !== section) continue;
		out.push({ file: m[2], auth: m[3].toUpperCase(), note: (m[4] || "").trim() });
	}
	return out;
}
