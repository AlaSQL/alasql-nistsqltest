/**
 * Turns one NIST statement into what the runner sends to AlaSQL. Only what SQL-92 has and AlaSQL has in another
 * form is translated; everything else goes to AlaSQL as written, so its answer is AlaSQL's own.
 *
 *   CREATE SCHEMA [name] [AUTHORIZATION id] <elements>
 *       -> {ensureDatabase: <name or id>} (the runner creates it unless it exists); USE it; each element (CREATE TABLE, CREATE VIEW, GRANT, ...); USE the
 *          session's authorization id again. A schema is a database in AlaSQL.
 *   COMMIT [WORK], ROLLBACK [WORK]
 *       -> {control: "commit" | "rollback"} for the runner, which emulates the transaction (AlaSQL's in-memory
 *          ROLLBACK changes nothing), unless the runner runs with --native-transactions.
 *
 * Returns a list of {sql}, {control} and {ensureDatabase}.
 */

// Positions where a new schema element starts: CREATE or GRANT at parenthesis depth 0, outside quotes (not the
// GRANT of WITH GRANT OPTION)
const elementStarts = text => {
	const starts = [];
	let depth = 0, quoted = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (c === "'") quoted = !quoted;
		if (quoted) continue;
		if (c === "(") depth++;
		else if (c === ")") depth--;
		else if (depth === 0 && /[CG]/i.test(c) && (i === 0 || /\s/.test(text[i - 1])) && /^(CREATE|GRANT)\b/i.test(text.slice(i, i + 6)) && !/\bWITH\s+$/i.test(text.slice(Math.max(0, i - 8), i))) starts.push(i);
	}
	return starts;
};

export function translate(sql, session) {
	const s = sql.trim();
	if (/^COMMIT(\s+WORK)?$/i.test(s)) return [{ control: "commit", sql: s }];
	if (/^ROLLBACK(\s+WORK)?$/i.test(s)) return [{ control: "rollback", sql: s }];

	const schema = /^CREATE\s+SCHEMA\b\s*(?!AUTHORIZATION\b)([A-Z_][\w]*)?\s*(?:AUTHORIZATION\s+([A-Z_][\w]*))?\s*(?:DEFAULT\s+CHARACTER\s+SET\s+\S+)?/i.exec(s);
	if (schema) {
		const name = (schema[1] || schema[2] || session.auth).toUpperCase();
		const body = s.slice(schema[0].length);
		const starts = elementStarts(body);
		const elements = starts.map((p, i) => body.slice(p, starts[i + 1] ?? body.length).trim()).filter(Boolean);
		return [
			{ ensureDatabase: name, from: s },
			{ sql: `USE ${name}`, from: s },
			...elements.map(e => ({ sql: e })),
			{ sql: `USE ${session.auth}`, from: s },
		];
	}
	return [{ sql: s }];
}
