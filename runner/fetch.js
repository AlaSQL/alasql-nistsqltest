/**
 * Downloads the NIST SQL Test Suite, Version 6.0 (MS-DOS zip, Interactive SQL and Embedded C) and unpacks
 * the parts this runner uses into nist/:
 *
 *   nist/sql/     the Interactive SQL test files (*.sql) and run order (runsql.all)
 *   nist/schema/  the schema definitions (*.std, cts5sch*.sql) and run order (runsch.all)
 *   nist/other/   the documentation (readme.1st, version.txt, sqlman60.txt, docu*.txt)
 *
 * NIST took the suite offline; the zip is the Internet Archive's copy of
 * https://www.itl.nist.gov/div897/ctg/v6pcisql.zip. The files are used as NIST released them: the runner
 * translates statements at run time (see README.md) and never edits a file.
 *
 *   bun run runner/fetch.js [--force]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = "https://web.archive.org/web/20220926193506id_/https://www.itl.nist.gov/div897/ctg/v6pcisql.zip";
const sha256 = "3241c55798baa94ffe08ba865b9a2500296013fef2ff6fb7c5df005c3035e2a1";
const target = path.join(root, "nist");
const keep = ["sql/", "schema/", "other/readme.1st", "other/readme.2nd", "other/version.txt", "other/sqlman60.txt", "other/docunist.txt", "other/docu_v5.txt"];

if (fs.existsSync(path.join(target, "sql", "runsql.all")) && !process.argv.includes("--force")) {
	console.log("nist/ is already there (use --force to fetch it again)");
	process.exit(0);
}

console.log("Downloading " + url);
const res = await fetch(url);
if (!res.ok) throw new Error("Download failed: HTTP " + res.status);
const zip = Buffer.from(await res.arrayBuffer());
const hash = new Bun.CryptoHasher("sha256").update(zip).digest("hex");
if (hash !== sha256) throw new Error("Unexpected SHA-256 " + hash + ", expected " + sha256);

const tmp = fs.mkdtempSync(path.join(root, ".fetch-"));
try {
	fs.writeFileSync(path.join(tmp, "v6pcisql.zip"), zip);
	const unzip = Bun.spawnSync(["unzip", "-q", "-o", path.join(tmp, "v6pcisql.zip"), "-d", path.join(tmp, "x")]);
	if (unzip.exitCode !== 0) throw new Error("unzip failed: " + unzip.stderr.toString());
	fs.rmSync(target, { recursive: true, force: true });
	for (const entry of keep) {
		const from = path.join(tmp, "x", entry);
		if (!fs.existsSync(from)) continue;
		fs.cpSync(from, path.join(target, entry), { recursive: true });
	}
} finally {
	fs.rmSync(tmp, { recursive: true, force: true });
}
const count = d => fs.readdirSync(path.join(target, d)).length;
console.log(`nist/ ready: ${count("sql")} files in sql/, ${count("schema")} in schema/, ${count("other")} in other/`);
