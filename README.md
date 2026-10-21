# alasql-nistsqltest

The NIST SQL Test Suite, Version 6.0 (Interactive SQL), run against [AlaSQL](https://github.com/AlaSQL/alasql). It is the companion of [alasql-sqllogictest](https://github.com/AlaSQL/alasql-sqllogictest): the same kind of long-running runner with a pool of workers, a Markdown report written as it goes, sampled failures, and every failure as JSON with `--debug`.

```sh
bun install
yarn test           # writes results/output.md
```

## Commands

| Command | What it does |
|---|---|
| `yarn fetch --force` | Downloads the suite again (the Internet Archive's copy of NIST's `v6pcisql.zip`, checked by SHA-256) and unpacks the Interactive SQL files into `nist/`; the files are already in the repository |
| `yarn test [flags]` | Runs `runner/run.js` and writes the report to `results/output.md`; flags go to the runner, for example `yarn test --debug` |
| `yarn triage` | Groups the checks of the last `--debug` run that did not pass by kind, the largest first |

| Flag | |
|---|---|
| `--only-run=FILE[,FILE]` | Run exactly these files, for example `--only-run=nist/sql/dml001.sql` |
| `--include=REGEX`, `--exclude=REGEX` | Filter the test files by path |
| `--concurrency=N` | Number of workers (default: the number of cores) |
| `--debug` | Also write every check that did not pass, with the full SQL and condition, to `results/debug.jsonl` (replaced on every run, not committed) |
| `--printAllErrors` | Print every failure instead of a sample |
| `--curiousErrorprinting=0.05` | Share of repeated failures printed besides the first of each kind (the first is always printed) |
| `--truncSQLStatement=300` | Cut printed SQL after this many characters |
| `--native-transactions` | Send `COMMIT` and `ROLLBACK` to AlaSQL instead of emulating them |
| `--setup` | Print every failed setup statement, not a sample |

`ALASQL=path/to/alasql.fs.js yarn test` tests another build (for example a local `dist/`); by default the npm package.

## How it runs

The suite is written for a person at an SQL prompt: each test is a statement followed by the expected outcome in English, `-- PASS:0001 If 4 rows selected and last EMPNUM = 'E1'?`. The runner does what that person would do.

1. **Setup.** The schemas of `nist/schema/runsch.all` (alternative 1, "schema warning on access rule violation", without the X/Open profile files) and the dataload programs of `nist/sql/runsql.all` (`basetab`, `cugtab`, ...) run first, each under its authorization id. The report starts with one line per setup file: how many statements failed, and the most common failure.
2. **Test files.** The files of `runsql.all` run in parallel, each from the state after the setup, under its authorization id: unqualified names belong to the schema of that id.
3. **Checks.** Each `-- PASS:` condition is one check of the statement before it. `runner/expect.js` reads the condition: row counts (`If 4 rows selected`, `If 1 row is inserted`), values (`If count = 2`, `If last EMPNUM = 'E1'`, `If c1 is NULL`), expected errors (`If ERROR, unique constraint, 0 rows inserted`, `OR SQLSTATE = 22012`), success (`If table is created`), and expected tables (`If 2 rows are selected in the following order`). `bun run runner/expect.js` shows the share it reads (91 %) and the most common rest.
4. **Score.** A check passes, fails, is *not read* (the runner does not understand the condition, for example "this COUNT = previous COUNT"), or is *not resolved* (the condition names a column the result does not have). Only passed and failed checks count for the score. A NIST test (`TEST:0001`) passes when all its checks pass.

What the runner translates, because SQL-92 has it and AlaSQL has it in another form (everything else goes to AlaSQL as written, so its answer is AlaSQL's own):

| SQL-92 | Sent to AlaSQL |
|---|---|
| `CREATE SCHEMA [name] [AUTHORIZATION id] <elements>` | the database `name` (or `id`) is created unless it exists, `USE` it, each element as its own statement, `USE` the session's id again; a schema is a database in AlaSQL |
| the session's authorization id | `USE <id>` before the file |
| `COMMIT WORK`, `ROLLBACK WORK` | emulated by the runner (AlaSQL's in-memory `ROLLBACK` changes nothing): table contents are saved at the start of a file and at each `COMMIT`, and put back on `ROLLBACK`; after DDL the runner rebuilds from the setup and replays the committed statements. `--native-transactions` turns this off |

Not covered: privileges and users (AlaSQL has neither, so tests that expect an access violation fail), the embedded languages (only Interactive SQL is run), and the two manual procedures of `runsql.all` (`mpquic.txt`, `check.lst`).

## Acknowledgment

This repository uses the **SQL Test Suite, Version 6.0**, developed jointly by the U.S. National Institute of Standards and Technology (NIST), National Computing Centre Limited (NCC) in the U.K., and Computer Logic R&D in Greece, released December 31, 1996. NIST makes no claim to copyright in the portions created by its employees (17 U.S.C. § 105); NCC and Computer Logic R&D hold the copyright in the portions their employees created (the CTS5 SQL2 tests). NIST's terms allow using and redistributing the suite with an explicit acknowledgment of NIST's contributions and of any changes made.

Changes: none to the files. `nist/` holds the `sql/`, `schema/` and part of the `other/` folders of the original zip. The runner translates statements at run time as listed above. The suite bears no warranty; NIST assumes no liability for its use or results.
