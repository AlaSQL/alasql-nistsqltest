# NIST SQL Test Suite results for AlaSQL

`2026-10-21T05:22:02.937Z target: alasql@4.20.0`

NIST SQL Test Suite, Version 6.0 (1996), Interactive SQL: 339 test files, COMMIT and ROLLBACK emulated by the runner.

## Setup

28 files (17 schemas, 11 dataload programs), 10,700 statements, 9,894 failed.

| File | Authorization | Statements | Failed | Most common failure |
|---|---|---|---|---|
| `schema/schema1.std` | HU | 115 | 20 | GRANT ALL: Parse error (8) |
| `schema/schema2.std` | CUGINI | 45 | 22 | GRANT ALL: Parse error (6) |
| `schema/schema3.std` | MCGINN | 6 | 0 |  |
| `schema/schema4.std` | SULLIVAN1 | 45 | 3 | GRANT ALL: Parse error (1) |
| `schema/schema5.std` | FLATER | 26 | 10 | GRANT ALL: Parse error (5) |
| `schema/schema6.std` | FLATER | 7 | 1 | GRANT SELECT: Parse error (1) |
| `schema/schema7.std` | CANWEPARSELENGTH18 | 4 | 0 |  |
| `schema/schema8.std` | SUN | 80 | 14 | CREATE TABLE: Parse error (4) |
| `schema/schema9.std` | SULLIVAN | 7 | 4 | GRANT REFERENCES: Parse error (2) |
| `schema/schem10.std` | SCHANZLE | 12 | 0 |  |
| `schema/schem11.std` | FLATER | 5 | 2 | CREATE TABLE: Parse error (1) |
| `schema/schem12.std` | FLATER | 13 | 8 | CREATE DOMAIN: Parse error (6) |
| `schema/cts5sch1.sql` | CTS2 | 6 | 3 | CREATE DOMAIN: Parse error (1) |
| `schema/cts5sch2.sql` | CTS1 | 67 | 15 | CREATE TABLE: Parse error (5) |
| `schema/cts5sch3.sql` | CTS1 | 7 | 3 | CREATE DOMAIN: Parse error (3) |
| `schema/cts5sch4.sql` | CTS4 | 2 | 0 |  |
| `schema/cts5sch5.sql` | CTS3 | 2 | 0 |  |
| `sql/basetab.sql` | HU | 49 | 1 | SELECT USER: Column does not exist: USER (1) |
| `sql/cugtab.sql` | CUGINI | 33 | 1 | SELECT USER: Column does not exist: USER (1) |
| `sql/flattab.sql` | FLATER | 15 | 1 | SELECT USER: Column does not exist: USER (1) |
| `sql/suntab0.sql` | SUN | 30 | 1 | SELECT USER: Column does not exist: USER (1) |
| `sql/suntab1.sql` | SUN | 38 | 17 | INSERT INTO: undefined is not an object (evaluating …) (6) |
| `sql/suntab2.sql` | SUN | 157 | 57 | INSERT INTO: undefined is not an object (evaluating …) (56) |
| `sql/suntab3.sql` | SUN | 51 | 21 | INSERT INTO: Foreign key … not found in table … (20) |
| `sql/sultab1.sql` | SULLIVAN | 18 | 1 | SELECT USER: Column does not exist: USER (1) |
| `sql/sc11tab.sql` | FLATER | 15 | 13 | INSERT INTO: Parse error (4) |
| `sql/sc12tab.sql` | FLATER | 9,661 | 9,658 | INSERT INTO: Table … could not be found (9,398) |
| `sql/cts5tab.sql` | CTS1 | 184 | 18 | INSERT INTO: Parse error (13) |

```sql
GRANT SELECT ON HU.ECCO TO PUBLIC

schema/schema1.std:14
=> Parse error on line 1: GRANT SELECT ON HU.ECCO TO ------^ Expecting 'EOF', 'COMMA', 'LPAR', 'RPAR', 'END', 'ELSE', 'COLONDASH', 'GO', 'SEMICOLON', got 'SELECT'
```

```sql
GRANT SELECT ON AA TO SCHANZLE

schema/schema2.std:11
=> Parse error on line 1: GRANT SELECT ON AA TO SCHA ------^ Expecting 'EOF', 'COMMA', 'LPAR', 'RPAR', 'END', 'ELSE', 'COLONDASH', 'GO', 'SEMICOLON', got 'SELECT'
```

```sql
GRANT SELECT ON CUGINI.BADG1 TO SCHANZLE

schema/schema5.std:11
=> Parse error on line 1: GRANT SELECT ON CUGINI.BAD ------^ Expecting 'EOF', 'COMMA', 'LPAR', 'RPAR', 'END', 'ELSE', 'COLONDASH', 'GO', 'SEMICOLON', got 'SELECT'
```

```sql
GRANT SELECT ON TTT TO SCHANZLE

schema/schema9.std:13
=> Parse error on line 1: GRANT SELECT ON TTT TO SCH ------^ Expecting 'EOF', 'COMMA', 'LPAR', 'RPAR', 'END', 'ELSE', 'COLONDASH', 'GO', 'SEMICOLON', got 'SELECT'
```

```sql
CREATE TABLE STAFFz ( EMPNUM CHAR(3) REFERENCES STAFF3(EMPNUM), SALARY DECIMAL(6) CHECK (SALARY > 0))

schema/cts5sch2.sql:127
=> undefined is not an object (evaluating 'fktable.pk.columns')
```

```sql
SELECT USER FROM HU.ECCO

sql/suntab0.sql:12
=> Column does not exist: USER
```

```sql
SELECT USER FROM HU.ECCO

sql/sc11tab.sql:12
=> Column does not exist: USER
```

```sql
INSERT INTO TIDES.CONSTITUENTS VALUES (0, 0, 0.048E0, 113.4)

sql/sc12tab.sql:35
=> Table 'CONSTITUENTS' could not be found
```

_8 of 77 kinds of setup failure shown; run with --setup to see every failed statement_


---- ---- ---- ---- ---- ---- ----
### 1/339 `nist/sql/flg011.sql` (FLATER)

```sql
ALTER TABLE USIG ADD(COL3 INTEGER, COL4 SMALLINT)

TEST:0831 PASS:0831 If 2 columns added?
=> unparsed: condition not read: 2 columns added
```

#### ★ Ran 1 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 2/339 `nist/sql/sdl005.sql` (CUGINI)

```sql
SELECT EMPNUM,PNUM,USER FROM HU.WORKS WHERE EMPNUM = 'E3'

TEST:0141 PASS:0141 If PNUM = 'P2' and USER = 'CUGINI'?
=> expected PNUM = 'P2', got error: Column does not exist: USER
```

#### ☓ Ran 3 checks in 1 tests

* 1 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 3/339 `nist/sql/sdl032.sql` (FLATER)

```sql
UPDATE HU.STAFF3 SET GRADE = 15

TEST:0472 PASS:0472 If ERROR, syntax error/access violation, 0 rows updated?
=> expected an error, got count 5
```

```sql
SELECT COUNT(*) FROM HU.STAFF3 WHERE CITY = 'Greenmount' OR GRADE = 15

TEST:0472 PASS:0472 If count = 0?
=> expected count 0, got 5
```

```sql
UPDATE HU.VSTAFF3 SET EMPNUM = 'E0' WHERE EMPNUM = 'E1'

TEST:0484 PASS:0484 If 1 row is updated?
=> expected 1 rows updated, got 0
```

#### ☓ Ran 20 checks in 2 tests

* 13 failed
* 35% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 4/339 `nist/sql/dml001.sql` (HU)

```sql
SELECT EMPNAME,PNUM,HOURS FROM STAFF,WORKS WHERE STAFF.EMPNUM = WORKS.EMPNUM UNION SELECT EMPNAME,PNUM,HOURS FROM STAFF,WORKS WHERE NOT EXISTS (SELECT HOURS FROM WORKS WHERE STAFF.EMPNUM = WORKS.EMPNUM)

TEST:0158 PASS:0158 If 21 rows selected?
=> expected 21 rows selected, got 24
```

#### ☓ Ran 8 checks in 8 tests

* 1 failed
* 87% of the checks and 87% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 5/339 `nist/sql/dml004.sql` (HU)

```sql
SELECT EMPNUM,HOURS FROM WORKS WHERE PNUM = 'P8' ORDER BY EMPNUM DESC

TEST:0008 PASS:0008 If 0 rows selected, SQLCODE = 100, end of data?
=> expected SQLCODE = 100, got no rows
```

#### ☓ Ran 4 checks in 2 tests

* 1 failed
* 75% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 6/339 `nist/sql/dml008.sql` (HU)

```sql
SELECT ALL EMPNUM FROM WORKS WHERE HOURS = 12

TEST:0016 PASS:0016 If 2 rows are selected and both EMPNUMs are 'E1'?
=> unparsed: condition not read: both EMPNUMs are 'E1'
```

#### ☓ Ran 7 checks in 6 tests

* 1 failed
* 2 not read (condition text the runner does not understand)
* 80% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 7/339 `nist/sql/flg005.sql` (HU)

#### ★ Ran 2 checks in 2 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 8/339 `nist/sql/dml009.sql` (HU)

```sql
SELECT COUNT(*) FROM TEMP_S

TEST:0023 PASS:0023 If count = 1 or 2 (depending on previous insertion)?
=> unparsed: condition not read: count = 1 or 2 (depending on previous insertion)
```

```sql
INSERT INTO TEMP_S SELECT EMPNUM,GRADE,CITY FROM STAFF WHERE GRADE > 13

TEST:0024 PASS:0024 If 0 rows selected, SQLCODE = 100, end of data?
=> expected SQLCODE = 100, got count 0
```

#### ☓ Ran 12 checks in 5 tests

* 2 failed
* 1 not read (condition text the runner does not understand)
* 81% of the checks and 40% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 9/339 `nist/sql/dml010.sql` (HU)

```sql
SELECT * FROM TMP WHERE T2 = 23 AND T3 = 'xxxx '

TEST:0027 PASS:0027 If T1 = 'xxxx ' ?
=> expected T1 = 'xxxx      ', got no rows
```

#### ☓ Ran 6 checks in 3 tests

* 1 failed
* 83% of the checks and 66% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 10/339 `nist/sql/dml011.sql` (HU)

```sql
UPDATE STAFF SET GRADE=10*STAFF.GRADE WHERE STAFF.EMPNUM NOT IN (SELECT WORKS.EMPNUM FROM WORKS WHERE STAFF.EMPNUM = WORKS.EMPNUM)

TEST:0035 PASS:0035 If 1 row is updated?
=> expected 1 rows updated, got error: undefined is not an object (evaluating 'r['STAFF']['EMPNUM']')
```

#### ☓ Ran 9 checks in 4 tests

* 5 failed
* 44% of the checks and 25% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 11/339 `nist/sql/dml012.sql` (HU)

```sql
DELETE FROM WORKS WHERE WORKS.PNUM IN (SELECT PROJ.PNUM FROM PROJ WHERE PROJ.PNUM=WORKS.PNUM AND PROJ.CITY='Tampa')

TEST:0038 PASS:0038 If 1 row deleted?
=> expected 1 rows deleted, got error: undefined is not an object (evaluating 'r['WORKS']['PNUM']')
```

#### ☓ Ran 8 checks in 2 tests

* 2 failed
* 75% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 12/339 `nist/sql/dml013.sql` (HU)

```sql
SELECT SUM(HOURS)+10 FROM WORKS WHERE PNUM = 'P2'

TEST:0171 PASS:0171 If SUM(HOURS)+10 = 150?
=> unparsed: condition not read: SUM(HOURS)+10 = 150
```

```sql
SELECT EMPNUM FROM STAFF WHERE GRADE = (SELECT MAX(GRADE) FROM STAFF) ORDER BY EMPNUM

TEST:0041 PASS:0041 If 2 rows are selected and EMPNUMs = 'E3' and 'E5'?
=> unparsed: condition not read: 'E5'
```

#### ★ Ran 15 checks in 11 tests

* 2 not read (condition text the runner does not understand)
* 100% of the checks and 81% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 13/339 `nist/sql/dml015.sql` (HU)

#### ★ Ran 5 checks in 2 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 14/339 `nist/sql/dml141.sql` (FLATER)

#### ★ Ran 2 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 15/339 `nist/sql/dml018.sql` (HU)

```sql
SELECT SUM(HOURS) FROM WORKS HAVING MIN(PNUM) > 'P0'

TEST:0073 PASS:0073 If 1 row is selected with SUM(HOURS) = 464?
=> expected 1 rows selected, got error: Parse error on line 2: ...ROM WORKS HAVING MIN(PNUM) > ' ----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'EOF', 'WITH', 'COMMA', 'AS', 'LPAR', 'RPAR', 'PIVOT', 'UNPIVOT', 'DOT', 'ORDER', 'WHERE', 'NOT', 'UNION', 'I…
```

#### ☓ Ran 5 checks in 5 tests

* 1 failed
* 3 not read (condition text the runner does not understand)
* 50% of the checks and 20% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 16/339 `nist/sql/dml019.sql` (HU)

```sql
SELECT PNUM, SUM(HOURS) FROM WORKS GROUP BY PNUM

TEST:0074 PASS:0074 If 6 rows are selected? If PNUMs: 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'? If SUM(HOURS) for 'P2' is 140 ?
=> unparsed: condition not read: PNUMs: 'P1'
```

```sql
SELECT EMPNUM,HOURS FROM WORKS GROUP BY EMPNUM,HOURS

TEST:0076 PASS:0076 If 10 rows are selected and EMPNUM = 'E1' in 4 rows ? for 1 row EMPNUM = 'E1' and HOURS = 12?
=> unparsed: condition not read: EMPNUM = 'E1' in 4 rows  for 1 row EMPNUM = 'E1'
```

#### ★ Ran 10 checks in 6 tests

* 3 not read (condition text the runner does not understand)
* 100% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 17/339 `nist/sql/dml020.sql` (HU)

```sql
SELECT EMPNUM,EMPNAME,GRADE,STAFF.CITY, PNAME, PROJ.CITY FROM STAFF, PROJ WHERE STAFF.CITY = PROJ.CITY

TEST:0080 PASS:0080 If 10 rows are selected with EMPNAMEs:'Alice', 'Betty', ? 'Carmen', and 'Don' but not 'Ed'?
=> unparsed: condition not read: 'Betty'
```

```sql
SELECT DISTINCT STAFF.CITY, PROJ.CITY FROM STAFF, WORKS, PROJ WHERE STAFF.EMPNUM = WORKS.EMPNUM AND WORKS.PNUM = PROJ.PNUM

TEST:0082 PASS:0082 If 5 distinct rows are selected ?
=> unparsed: condition not read: 5 distinct rows are selected
```

```sql
SELECT FIRST1.EMPNUM, SECOND2.EMPNUM FROM STAFF FIRST1, STAFF SECOND2 WHERE FIRST1.CITY = SECOND2.CITY AND FIRST1.EMPNUM < SECOND2.EMPNUM

TEST:0083 PASS:0083 If 2 rows are selected and ? If EMPNUM pairs are 'E1'/'E4' and 'E2'/'E3'?
=> unparsed: condition not read: If EMPNUM pairs are 'E1'/'E4'
```

#### ★ Ran 4 checks in 4 tests

* 4 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 18/339 `nist/sql/dml014.sql` (HU)

#### ★ Ran 27 checks in 15 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 19/339 `nist/sql/dml087.sql` (FLATER)

```sql
SELECT HOURS FROM DV1 ORDER BY HOURS DESC

TEST:0518 PASS:0518 If 4 rows selected AND first HOURS = 80? AND second HOURS = 40 AND third HOURS = 20? AND fourth HOURS = 12?
=> unparsed: condition not read: second HOURS = 40
```

#### ★ Ran 18 checks in 3 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 66% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 20/339 `nist/sql/dml023.sql` (HU)

```sql
SELECT PNUM FROM PROJ WHERE PROJ.CITY = (SELECT STAFF.CITY FROM STAFF WHERE EMPNUM > 'E1' )

TEST:0104 PASS:0104 If ERROR, SELECT returns more than 1 row in subquery? If 0 rows are selected?
=> expected an error, got 2 rows
```

```sql
SELECT EMPNUM,GRADE FROM STAFF ORDER BY GRADE,EMPNUM

TEST:0180 PASS:0180 If 5 rows are selected with NULLs together ? If first EMPNUM is either 'E1' or 'E2'? If last EMPNUM is either 'E4' or 'E5?
=> unparsed: condition not read: first EMPNUM is either 'E1' or 'E2'
```

#### ☓ Ran 11 checks in 7 tests

* 3 failed
* 4 not read (condition text the runner does not understand)
* 57% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 21/339 `nist/sql/dml024.sql` (HU)

#### ☓ Ran 10 checks in 6 tests

* 2 failed
* 80% of the checks and 66% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 22/339 `nist/sql/dml022.sql` (HU)

```sql
SELECT EMPNUM,PNUM FROM WORKS WHERE HOURS <= ALL (SELECT AVG(HOURS) FROM WORKS GROUP BY PNUM)

TEST:0101 PASS:0101 If 2 rows selected and each EMPNUM = 'E1'?
=> unparsed: condition not read: each EMPNUM = 'E1'
```

#### ★ Ran 7 checks in 7 tests

* 4 not read (condition text the runner does not understand)
* 100% of the checks and 42% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 23/339 `nist/sql/dml021.sql` (HU)

#### ★ Ran 24 checks in 12 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 24/339 `nist/sql/dml025.sql` (HU)

#### ★ Ran 4 checks in 4 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 25/339 `nist/sql/flg008.sql` (HU)

```sql
SELECT PTYPE, CITY, SUM (BUDGET), COUNT(*) FROM PROJ GROUP BY CITY ORDER BY CITY

TEST:0454 PASS:0454 If either 3, 4, or 6 rows are selected?
=> unparsed: condition not read: either 3
```

#### ★ Ran 1 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 26/339 `nist/sql/dml027.sql` (HU)

```sql
UPDATE UPUNIQ SET NUMKEY = NUMKEY + 1

TEST:0124 PASS:0124 If 6 rows updated?
=> expected 6 rows updated, got error: Record already exists
```

```sql
SELECT COUNT(*),SUM(NUMKEY) FROM UPUNIQ

TEST:0124 PASS:0124 If count = 6 and SUM(NUMKEY) = 30?
=> expected SUM(NUMKEY) = 30, got 24
```

#### ☓ Ran 4 checks in 2 tests

* 2 failed
* 50% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 27/339 `nist/sql/dml033.sql` (HU)

#### ★ Ran 3 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 28/339 `nist/sql/dml029.sql` (HU)

```sql
SELECT GRADE,CITY FROM STAFF WHERE EMPNUM = 'E8'

TEST:0129 PASS:0129 If GRADE = 15 and CITY = 'Xi'an'?
=> unparsed: condition not read: CITY = 'Xi'an'
```

```sql
INSERT INTO JJ VALUES(123456E-3)

TEST:0131 PASS:0131 If 1 row is inserted?
=> expected 1 rows inserted, got error: undefined is not an object (evaluating 'undefined['undefined']')
```

#### ☓ Ran 8 checks in 4 tests

* 4 failed
* 1 not read (condition text the runner does not understand)
* 42% of the checks and 25% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 29/339 `nist/sql/dml035.sql` (HU)

```sql
SELECT FLOATTEST FROM JJ ORDER BY FLOATTEST DESC

TEST:0157 PASS:0157 If 6 rows are selected ? If last FLOATTEST = -87 OR is between -87.5 and -86.5 ?
=> unparsed: condition not read: last FLOATTEST = -87 OR  is between -87.5
```

#### ★ Ran 7 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 30/339 `nist/sql/dml038.sql` (HU)

#### ★ Ran 1 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 31/339 `nist/sql/dml037.sql` (HU)

#### ★ Ran 2 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 32/339 `nist/sql/dml040.sql` (HU)

```sql
SELECT COL1, EMPNUM, GRADE FROM CUGINI.VTABLE, STAFF WHERE COL1 < 200 AND GRADE > 12

TEST:0209 PASS:0209 If 6 rows are selected and SUM(COL1) = 220?
=> expected 6 rows selected, got error: Table 'STAFF' does not exist in database
```

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 33/339 `nist/sql/dml039.sql` (HU)

#### ★ Ran 4 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 34/339 `nist/sql/dml041.sql` (HU)

```sql
INSERT INTO V_WORKS3 VALUES('E8','P2',85)

TEST:0212 PASS:0212 If either 1 row is inserted OR ? If ERROR, view check constraint, 0 rows inserted?
=> unparsed: condition not read: either 1 row is inserted   OR
```

#### ☓ Ran 7 checks in 1 tests

* 3 failed
* 1 not read (condition text the runner does not understand)
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 35/339 `nist/sql/dml051.sql` (HU)

#### ★ Ran 4 checks in 2 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 36/339 `nist/sql/dml052.sql` (HU)

```sql
SELECT EMPNAME FROM STAFF WHERE EMPNAME LIKE 'Ali%'

TEST:0229 PASS:0229 If 1 row is returned and EMPNAME = 'Alice' (not 'ALICE')?
=> unparsed: condition not read: EMPNAME = 'Alice' (not 'ALICE')
```

#### ★ Ran 3 checks in 1 tests

* 2 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 37/339 `nist/sql/dml053.sql` (HU)

#### ★ Ran 3 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 38/339 `nist/sql/sdl026.sql` (CANWEPARSELENGTH18)

```sql
SELECT * FROM CANWEPARSELENGTH18.CHARACTERS18VIEW18

TEST:0237 PASS:0237 If LONGNAME18LONGNAME = 'VAL4' ?
=> expected LONGNAME18LONGNAME = 'VAL4', got no rows
```

```sql
SELECT CORRELATIONNAMES18.CHARS18NAME18CHARS FROM CHARACTER18TABLE18 CORRELATIONNAMES18 WHERE CORRELATIONNAMES18.CHARS18NAME18CHARS = 'VAL4'

TEST:0237 PASS:0237 If CORRELATIONNAMES18.CHARS18NAME18CHARS = 'VAL4'?
=> expected CORRELATIONNAMES18.CHARS18NAME18CHARS = 'VAL4', got no rows
```

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 39/339 `nist/sql/dml059.sql` (HU)

```sql
SELECT COL1,SUM(2 * COL2 * COL3) FROM VTABLE GROUP BY COL1 HAVING SUM(COL2 * COL3) > 2000 OR SUM(COL2 * COL3) < -2000 ORDER BY COL1

TEST:0258 PASS:0258 If 2 rows are selected? If first row has values (100, 366864) ? If second row has values (1000, -12000000) ?
=> unparsed: condition not read: first row has values (100
```

```sql
SELECT COL1, MAX(COL2) FROM VTABLE GROUP BY COL1 HAVING MAX(COL2) > ANY (SELECT GRADE FROM STAFF) AND MAX(COL2) < SOME (SELECT HOURS FROM WORKS) ORDER BY COL1

TEST:0259 PASS:0259 If 1 row is selected and COL1 = 10 and MAX(COL2) = 20?
=> expected 1 rows selected, got error: p is not defined
```

```sql
SELECT SUM(COL1) FROM VTABLE WHERE 10 + COL1 > COL2 HAVING MAX(COL1) > 100

TEST:0264 PASS:0264 If SUM(COL1) = 1000?
=> expected SUM(COL1) = 1000, got error: Parse error on line 3: ...L1 > COL2 HAVING MAX(COL1) > 1 ----------------------^ Expecting 'EOF', 'WITH', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'ORDER', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'UNION', 'INTERSECT', 'E…
```

#### ☓ Ran 14 checks in 5 tests

* 3 failed
* 2 not read (condition text the runner does not understand)
* 75% of the checks and 20% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 40/339 `nist/sql/dml026.sql` (HU)

```sql
SELECT +MAX(DISTINCT HOURS) FROM WORKS

TEST:0118 PASS:0118 If +MAX(DISTINCT HOURS) = 80?
=> unparsed: condition not read: +MAX(DISTINCT HOURS) = 80
```

```sql
INSERT INTO WORKS SELECT EMPNUM,'P9',20+HOURS FROM WORKS1 WHERE EMPNUM='E9'

TEST:0120 PASS:0120 If 1 row is inserted?
=> expected 1 rows inserted, got error: Wrong NULL value in NOT NULL column PNUM
```

```sql
SELECT +COL1+COL2 - COL3*COL4/COL1 FROM VTABLE WHERE COL1=10

TEST:0121 PASS:0121 If answer is -90?
=> unresolved: no column answer in +COL1 + COL2 - COL3 * COL4 / COL1
```

```sql
SELECT (-COL2+COL1)*COL3 - COL3/COL1 FROM VTABLE WHERE COL4 IS NULL

TEST:0123 PASS:0123 If Answer is 8999997 (plus or minus 0.5)?
=> unparsed: condition not read: Answer is 8999997 (plus or minus 0.5)
```

#### ☓ Ran 12 checks in 6 tests

* 4 failed
* 3 not read (condition text the runner does not understand)
* 1 not resolved (the condition names a column the result does not have)
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 41/339 `nist/sql/dml060.sql` (HU)

```sql
SELECT COL1, COL2 FROM VTABLE WHERE(2*(COL3 - COL2)) BETWEEN 5 AND 200 ORDER BY COL1

TEST:0261 PASS:0261 If 2 rows are selected ? If first row is ( 10, 20)? If second row is (100, 200)?
=> unparsed: condition not read: first row is  ( 10
```

```sql
SELECT * FROM WORKS

TEST:0265 PASS:0265 If 13 rows selected and no EMPNUM = 'E9'?
=> unparsed: condition not read: no EMPNUM = 'E9'
```

```sql
SELECT * FROM WORKS WHERE EMPNUM = 'E3'

TEST:0266 PASS:0266 If 2 rows selected and PNUM values are 'P2' and 'P4'?
=> unparsed: condition not read: PNUM values are 'P2'
```

#### ☓ Ran 17 checks in 6 tests

* 4 failed
* 6 not read (condition text the runner does not understand)
* 63% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 42/339 `nist/sql/dml034.sql` (HU)

```sql
SELECT REALTEST FROM GG

TEST:0088 PASS:0088 If REALTEST = 1.234567 ? OR is between 1.234562 and 1.234572 ?
=> unparsed: condition not read: OR is between 1.234562
```

#### ★ Ran 19 checks in 7 tests

* 7 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 43/339 `nist/sql/dml058.sql` (HU)

```sql
SELECT STR110 FROM T4 WHERE NUM6 = 100

TEST:0255 PASS:0255 If STR110 = 'HU'?
=> expected STR110 = 'HU', got no rows
```

```sql
UPDATE T4 SET STR110 = USER WHERE NUM6 = 101

TEST:0255 PASS:0255 If 1 row is updated?
=> expected 1 rows updated, got error: Wrong NULL value in NOT NULL column STR110
```

```sql
SELECT STR110 FROM T4 WHERE NUM6 = 101

TEST:0255 PASS:0255 If STR110 = 'HU'?
=> expected STR110 = 'HU', got 'Hello'
```

```sql
DELETE FROM T4 WHERE STR110 = USER

TEST:0256 PASS:0256 If 1 row is deleted?
=> expected 1 rows deleted, got 0
```

#### ☓ Ran 32 checks in 6 tests

* 7 failed
* 78% of the checks and 66% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 44/339 `nist/sql/dml069.sql` (HU)

```sql
SELECT * FROM WORKS1 WHERE EMPNUM = 'P2' ORDER BY EMPNUM, PNUM ASC

TEST:0408 PASS:0408 If FOR ROW #1, EMPNO1 = 'P2', PNUM1 = 'E1', HOURS1 = 460? If FOR ROW #2, EMPNO1 = 'P2', PNUM1 = 'E2',HOURS1 = 6640? If FOR ROW #3, EMPNO1 = 'P2', PNUM1 = 'E3', HOURS1 = 460? If FOR ROW #4, EMPNO1 = 'P2', PNUM1 = 'E4', HOURS1 = 460?
=> unparsed: condition not read: FOR ROW #1
```

#### ★ Ran 2 checks in 2 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 45/339 `nist/sql/dml064.sql` (HU)

```sql
SELECT COUNT (*) FROM STAFF WHERE GRADE = 13

TEST:0282 PASS:0282 If count = 1?
=> expected count 1, got 2
```

#### ☓ Ran 9 checks in 3 tests

* 9 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 46/339 `nist/sql/dml065.sql` (HU)

#### ☓ Ran 4 checks in 2 tests

* 3 failed
* 25% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 47/339 `nist/sql/dml062.sql` (HU)

```sql
SELECT EMPNUM,SECOND2 FROM SULLIVAN1.MUL_SCH ORDER BY EMPNUM

TEST:0276 PASS:0276 If 2 rows are selected? If first row EMPNUM = 'E1' and SECOND2 = 'A'? If second row EMPNUM = 'E4' and SECOND2 = 'A'?
=> unparsed: condition not read: first row EMPNUM = 'E1'
```

#### ☓ Ran 20 checks in 4 tests

* 1 failed
* 1 not read (condition text the runner does not understand)
* 94% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 48/339 `nist/sql/dml076.sql` (HU)

```sql
SELECT CHARTEST FROM BB

TEST:0436 PASS:0436 If CHARTEST is NULL (Implementor defined print format)?
=> unparsed: condition not read: CHARTEST is NULL (Implementor defined print format)
```

```sql
SELECT INTTEST FROM EE

TEST:0436 PASS:0436 If INTTEST is NULL (Implementor defined print format)?
=> unparsed: condition not read: INTTEST is NULL (Implementor defined print format)
```

```sql
SELECT REALTEST FROM GG

TEST:0436 PASS:0436 If REALTEST is NULL (Implementor defined print format)?
=> unparsed: condition not read: REALTEST is NULL (Implementor defined print format)
```

```sql
SELECT SMALLTEST FROM HH

TEST:0436 PASS:0436 If SMALLTEST is NULL (Implementor defined print format)?
=> unparsed: condition not read: SMALLTEST is NULL (Implementor defined print format)
```

```sql
SELECT DOUBLETEST FROM II

TEST:0436 PASS:0436 If DOUBLETEST is NULL (Implementor defined print format)?
=> unparsed: condition not read: DOUBLETEST is NULL (Implementor defined print format)
```

```sql
SELECT FLOATTEST FROM JJ

TEST:0436 PASS:0436 If FLOATTEST is NULL (Implementor defined print format)?
=> unparsed: condition not read: FLOATTEST is NULL (Implementor defined print format)
```

```sql
SELECT NUMTEST FROM MM

TEST:0436 PASS:0436 If NUMTEST is NULL (Implementor defined print format)?
=> unparsed: condition not read: NUMTEST is NULL (Implementor defined print format)
```

#### ☓ Ran 11 checks in 1 tests

* 1 failed
* 8 not read (condition text the runner does not understand)
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 49/339 `nist/sql/dml070.sql` (HU)

#### ★ Ran 4 checks in 3 tests

* 2 not read (condition text the runner does not understand)
* 100% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 50/339 `nist/sql/dml077.sql` (HU)

```sql
INSERT INTO TEMP_SS VALUES('E7',NULL,'Frankfurt')

TEST:0443 PASS:0443 If ERROR, view check constraint, 0 rows inserted?
=> expected an error, got count 1
```

#### ☓ Ran 9 checks in 1 tests

* 6 failed
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 51/339 `nist/sql/dml073.sql` (HU)

```sql
SELECT MAX(STAFF1.GRADE), SUM(STAFF1.GRADE) FROM STAFF1, STAFF GROUP BY STAFF1.CITY, STAFF.CITY

TEST:0417 PASS:0417 If 16 rows are selected in any order? Including the following four rows? MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 35? MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 70? MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 70? MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 70?
=> unparsed: condition not read: SUM(STAFF1.GRADE) = 35 MAX(STAFF1.GRADE) = 18
```

```sql
SELECT AVG(T1.COL4), AVG(T1.COL4 + T2.COL4), SUM(T2.COL4), COUNT(DISTINCT T1.COL4) FROM VTABLE T1, VTABLE T2

TEST:0418 PASS:0418 If AVG(T1.COL4) = 147 or 148? If AVG(T1.COL4 + T2.COL4) = 295 or 296? If SUM(T2.COL4) = 1772? If COUNT(DISTINCT T1.COL4) = 3?
=> unparsed: condition not read: AVG(T1.COL4) = 147 or 148
```

#### ★ Ran 7 checks in 7 tests

* 2 not read (condition text the runner does not understand)
* 100% of the checks and 71% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 52/339 `nist/sql/dml086.sql` (HU)

#### ☓ Ran 10 checks in 1 tests

* 6 failed
* 40% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 53/339 `nist/sql/dml075.sql` (HU)

```sql
SELECT PNUM, SUM(HOURS) FROM WORKS GROUP BY PNUM HAVING EXISTS (SELECT PNAME FROM PROJ WHERE PROJ.PNUM = WORKS.PNUM AND SUM(WORKS.HOURS) > PROJ.BUDGET / 200)

TEST:0434 PASS:0434 If 2 rows selected with values (in any order):? PNUM = 'P1', SUM(HOURS) = 80? PNUM = 'P5', SUM(HOURS) = 92?
=> unparsed: condition not read: SUM(HOURS) = 80 PNUM = 'P5'
```

```sql
SELECT PTYPE, CITY FROM PROJ GROUP BY PTYPE, CITY HAVING AVG(BUDGET) > 21000

TEST:0442 PASS:0442 If 3 rows selected with PTYPE/CITY values(in any order):? Code/Vienna, Design/Deale, Test/Tampa?
=> unparsed: condition not read: Design/Deale
```

```sql
SELECT DISTINCT SUM(BUDGET) FROM PROJ GROUP BY PTYPE, CITY HAVING AVG(BUDGET) > 21000

TEST:0442 PASS:0442 If 2 rows selected (in any order):? with SUM(BUDGET) values 30000 and 80000?
=> unparsed: condition not read: 80000
```

#### ☓ Ran 18 checks in 5 tests

* 3 failed
* 4 not read (condition text the runner does not understand)
* 78% of the checks and 40% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 54/339 `nist/sql/dml079.sql` (HU)

```sql
SELECT * FROM STAFF

TEST:0451 PASS:0451 If 6 rows are selected? If EMPNUMs are 'e1','e2','E1','E2','E3','E5'?
=> unparsed: condition not read: EMPNUMs are 'e1'
```

```sql
SELECT * FROM WORKS ORDER BY EMPNUM, PNUM

TEST:0451 PASS:0451 If 15 rows are selected? If EMPNUM/PNUM values include ? e1/p2, E1/p2, e1/P2, e1/P5, E4/p4 ? If no EMPNUM/PNUM values are duplicates ?
=> unparsed: condition not read: EMPNUM/PNUM values include  e1/p2
```

#### ☓ Ran 23 checks in 3 tests

* 3 failed
* 2 not read (condition text the runner does not understand)
* 85% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 55/339 `nist/sql/sdl001.sql` (HU)

```sql
SELECT C1 FROM WHICH_SCHEMA1

TEST:0137 PASS:0137 If 1 row selected ? If C1 starts with 'Use of SCHEMA1.STD is required' ? If C1 ends with ' to pass this test.' ?
=> unparsed: condition not read: C1 starts with 'Use of SCHEMA1.STD is required'
```

#### ★ Ran 2 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 56/339 `nist/sql/dml142.sql` (HU)

#### ☓ Ran 4 checks in 1 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 57/339 `nist/sql/sdl012.sql` (HU)

#### ★ Ran 2 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 58/339 `nist/sql/sdl015.sql` (HU)

#### ★ Ran 1 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 59/339 `nist/sql/sdl014.sql` (HU)

#### ★ Ran 5 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 60/339 `nist/sql/dml061.sql` (HU)

#### ☓ Ran 18 checks in 7 tests

* 3 failed
* 1 not read (condition text the runner does not understand)
* 82% of the checks and 57% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 61/339 `nist/sql/sdl013.sql` (HU)

#### ★ Ran 4 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 62/339 `nist/sql/dml090.sql` (HU)

```sql
SELECT MIN(PNAME) FROM PROJ, WORKS, STAFF WHERE PROJ.PNUM = WORKS.PNUM AND WORKS.EMPNUM = STAFF.EMPNUM AND BUDGET - GRADE * HOURS * 100 IN (-4400, -1000, 4000)

TEST:0512 PASS:0512 If PNAME = 'CALM'?
=> unresolved: no column PNAME in MIN(PNAME)
```

```sql
SELECT CITY, COUNT(*) FROM PROJ GROUP BY CITY HAVING (MAX(BUDGET) - MIN(BUDGET)) / 2 IN (2, 20000, 10000) ORDER BY CITY DESC

TEST:0512 PASS:0512 If in first row: CITY = 'Vienna' AND count = 2? AND in second row: CITY = 'Deale' AND count = 3?
=> unparsed: condition not read: in first row: CITY = 'Vienna'
```

```sql
INSERT INTO TEMP_OBSERV (YEAR_OBSERV, MAX_TEMP) VALUES (-9999, 1234.51)

TEST:0513 PASS:0513 If ERROR, constraint violation, 0 rows inserted?
=> expected an error, got count 1
```

```sql
SELECT EMPNUM, GRADE*1000 FROM HU.STAFF WHERE GRADE * 1000 > ANY (SELECT SUM(BUDGET) FROM HU.PROJ GROUP BY CITY, PTYPE HAVING HU.PROJ.CITY = HU.STAFF.CITY)

TEST:0564 PASS:0564 If EMPNUM = E3 and GRADE * 1000 = 13000?
=> unparsed: condition not read: GRADE * 1000 = 13000
```

#### ☓ Ran 12 checks in 4 tests

* 5 failed
* 2 not read (condition text the runner does not understand)
* 1 not resolved (the condition names a column the result does not have)
* 44% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 63/339 `nist/sql/sdl017.sql` (HU)

#### ★ Ran 1 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 64/339 `nist/sql/sdl018.sql` (HU)

```sql
INSERT INTO CUGINI.VTABLE SELECT * FROM VTABLE

TEST:0154 PASS:0154 If 4 rows are inserted?
=> expected 4 rows inserted, got 0
```

#### ☓ Ran 4 checks in 1 tests

* 2 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 65/339 `nist/sql/sdl019.sql` (HU)

#### ★ Ran 3 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 66/339 `nist/sql/sdl020.sql` (HU)

#### ★ Ran 5 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 67/339 `nist/sql/sdl016.sql` (HU)

#### ☓ Ran 5 checks in 1 tests

* 4 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 68/339 `nist/sql/sdl025.sql` (HU)

#### ☓ Ran 7 checks in 1 tests

* 3 failed
* 57% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 69/339 `nist/sql/sdl028.sql` (HU)

```sql
SELECT EMP1, EMP_AVG, EMP_MAX FROM SET_TEST ORDER BY EMP1

TEST:0397 PASS:0397 If for the first row EMP1 = 'E1',? EMP_AVG is between 38 and 39, and EMP_MAX = 80?
=> unparsed: condition not read: for the first row EMP1 = 'E1'
```

#### ★ Ran 2 checks in 2 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 70/339 `nist/sql/sdl027.sql` (HU)

```sql
SELECT X.CITY, X.MAX_C, Y.MAX_C, (X.MAX_C + Y.MAX_C) / 2 FROM CELSIUS_OBSERV X, CELSIUS_OBSERV Y WHERE X.YEAR_OBSERV = 1984 AND Y.YEAR_OBSERV = 1985 AND X.CITY = Y.CITY ORDER BY 4 DESC

TEST:0391 PASS:0391 If for the first row X.CITY = 'Sun City',? X.MAX_C is between 43.31 and 43.35,? Y.MAX_C is between 40.54 and 40.57? and (X.MAX_C + Y.MAX_C) /2 is between 41.93 and 41.96?
=> unparsed: condition not read: for the first row X.CITY = 'Sun City'
```

```sql
SELECT CITY, YEAR_OBSERV, MIN_C, MAX_C FROM CELSIUS_OBSERV WHERE YEAR_OBSERV = 1984 AND MIN_C > 5

TEST:0401 PASS:0401 If CITY = 'Sun City' and YEAR_OBSERV = 1984? If MIN_C is between 6.65 and 6.68? If MAX_C is between 43.31 and 43.35?
=> unparsed: condition not read: MIN_C is between 6.65
```

```sql
SELECT CITY, HIGH, LOW FROM MULTI_YEAR_OBSERV ORDER BY CITY ASC

TEST:0401 PASS:0401 If for the first row HIGH is between 99.3 and 99.7? and LOW is between 3.3 and 3.7?
=> unparsed: condition not read: for the first row HIGH is between 99.3
```

```sql
SELECT HIGH, YEAR_OBSERV, LOW FROM EXTREME_TEMPS ORDER BY YEAR_OBSERV DESC

TEST:0401 PASS:0401 If for the first row HIGH = 105 and LOW = -82?
=> unparsed: condition not read: for the first row HIGH = 105
```

#### ★ Ran 4 checks in 2 tests

* 4 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 71/339 `nist/sql/cdr028.sql` (SCHANZLE)

```sql
SELECT COUNT(*) FROM RASTER

TEST:0486 PASS:0486 If count >= 0, no ERROR message ?
=> unparsed: condition not read: count >= 0, no ERROR message
```

```sql
INSERT INTO REFRESH VALUES ('cabbage')

TEST:0486 PASS:0486 Consider BOTH current INSERT AND previous SELECT COUNT? ( If ERROR, COUNT not selected ? AND 0 rows inserted in current INSERT) ? OR ? ( successful COMPLETION, count >= 0 ? AND 1 row inserted in current INSERT) ?
=> unparsed: condition not read: Consider BOTH current INSERT
```

#### ★ Ran 2 checks in 1 tests

* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 72/339 `nist/sql/dml080.sql` (SCHANZLE)

```sql
DELETE FROM HU.STAFF WHERE EMPNUM = 'E7'

TEST:0462 PASS:0462 If SQLCODE = 100 or no data, 0 rows deleted?
=> unparsed: condition not read: SQLCODE = 100 or no data, 0 rows deleted
```

```sql
DELETE FROM HU.STAFF

TEST:0462 PASS:0462 If SQLCODE = 100 or no data, 0 rows deleted?
=> unparsed: condition not read: SQLCODE = 100 or no data, 0 rows deleted
```

```sql
UPDATE HU.STAFF SET CITY = 'NOWHERE' WHERE EMPNAME = 'NOBODY'

TEST:0463 PASS:0463 If SQLCODE = 100 or no data, 0 rows updated?
=> unparsed: condition not read: SQLCODE = 100 or no data, 0 rows updated
```

#### ★ Ran 9 checks in 2 tests

* 6 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 73/339 `nist/sql/cdr023.sql` (SCHANZLE)

#### ☓ Ran 8 checks in 3 tests

* 3 failed
* 62% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 74/339 `nist/sql/dml082.sql` (SCHANZLE)

```sql
INSERT INTO HU.STAFF SELECT 'E13','ff',KC,'gg' FROM CPBASE WHERE JUNK1 LIKE '%X%%X_' ESCAPE 'X'

TEST:0493 PASS:0493 If 1 row is inserted?
=> expected 1 rows inserted, got error: Table does not exist: CPBASE
```

#### ☓ Ran 21 checks in 4 tests

* 11 failed
* 47% of the checks and 25% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 75/339 `nist/sql/dml083.sql` (SCHANZLE)

```sql
INSERT INTO HU.STAFF VALUES ('E7','Ella Brown',12,'Claggetsville Maryland')

TEST:0498 PASS:0498 If ERROR, data exception/string right trunc.? If 0 rows inserted OR SQLSTATE = 22001 OR SQLCODE < 0?
=> expected an error, got count 1
```

```sql
SELECT AVG(SMALLTEST) FROM HU.HH

TEST:0500 PASS:0500 If WARNING, null value eliminated in set function? OR SQLSTATE = 01003?
=> unparsed: condition not read: null value eliminated in set function
```

#### ☓ Ran 9 checks in 2 tests

* 3 failed
* 5 not read (condition text the runner does not understand)
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 76/339 `nist/sql/sdl024.sql` (HU)

#### ☓ Ran 4 checks in 1 tests

* 1 failed
* 75% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 77/339 `nist/sql/dml081.sql` (SCHANZLE)

#### ☓ Ran 12 checks in 4 tests

* 6 failed
* 50% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 78/339 `nist/sql/cdr029.sql` (SCHANZLE)

#### ☓ Ran 17 checks in 3 tests

* 5 failed
* 70% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 79/339 `nist/sql/dml084.sql` (SCHANZLE)

```sql
UPDATE HU.UPUNIQ SET COL2 = 'xx'

TEST:0503 PASS:0503 If ERROR, syntax error or access rule violation? 0 rows updated OR SQLSTATE = 42000 OR SQLCODE < 0?
=> expected an error, got count 6
```

```sql
SELECT COL2 FROM HU.UPUPUP WHERE NUMKEY = 1

TEST:0504 PASS:0504 If the SQLSTATE value is the same as? the SQLSTATE value of the previous SELECT?
=> unparsed: condition not read: the SQLSTATE value is the same as the SQLSTATE value of the previous SELECT
```

```sql
UPDATE HU.UPUPUP SET COL2 = 'xx'

TEST:0504 PASS:0504 If the SQLSTATE value is the same as? the SQLSTATE value of the previous UPDATE?
=> unparsed: condition not read: the SQLSTATE value is the same as the SQLSTATE value of the previous UPDATE
```

```sql
DELETE FROM HU.UPUPUP

TEST:0504 PASS:0504 If the SQLSTATE value is the same as? the SQLSTATE value of the previous DELETE?
=> unparsed: condition not read: the SQLSTATE value is the same as the SQLSTATE value of the previous DELETE
```

```sql
INSERT INTO HU.UPUPUP VALUES (9,'M')

TEST:0504 PASS:0504 If the SQLSTATE value is the same as? the SQLSTATE value of the previous INSERT?
=> unparsed: condition not read: the SQLSTATE value is the same as the SQLSTATE value of the previous INSERT
```

#### ☓ Ran 12 checks in 2 tests

* 6 failed
* 5 not read (condition text the runner does not understand)
* 14% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 80/339 `nist/sql/dml091.sql` (SCHANZLE)

```sql
SELECT T_DECIMAL / .000000001 FROM FOUR_TYPES WHERE T_CHAR = 'X'

TEST:0497 PASS:0497 If 1 row is selected and T_DECIMAL = 1.1112222E+16 ? OR ERROR, data exception/numeric value out of range? OR 0 rows selected OR SQLSTATE = 22003 OR SQLCODE < 0?
=> unresolved: no column T_DECIMAL in T_DECIMAL / 1e-9
```

#### ☓ Ran 9 checks in 1 tests

* 1 failed
* 1 not resolved (the condition names a column the result does not have)
* 87% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 81/339 `nist/sql/dml085.sql` (SCHANZLE)

```sql
SELECT COUNT(DISTINCT "sullivan.select") FROM "FLATER"."SULLIVAN.SELECT"

TEST:0508 PASS:0508 If count = 2?
=> expected count 2, got error: Parse error on line 2: ...) FROM "FLATER"."SULLIVAN.SELECT" ----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'EOF', 'WITH', 'COMMA', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS…
```

```sql
SELECT "A<a"."sullivan.select" FROM "FLATER"."SULLIVAN.SELECT" "A<a"

TEST:0508 PASS:0508 If 4 rows selected? If for each row, "sullivan.select" = 0 OR 1 ?
=> unparsed: condition not read: for each row
```

```sql
SELECT "(".CITY FROM HU.STAFF "(" WHERE EMPNUM = 'E5'

TEST:0508 PASS:0508 If 1 row selected and CITY = 'Akron'?
=> expected 1 rows selected, got error: Parse error on line 2: ... FROM HU.STAFF "(" WHERE EMPNU -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'EOF', 'EndTransaction', 'WITH', 'COMMA', 'AS', 'LPAR', 'RPAR', 'SEARCH', 'PIVOT', 'FOR', 'UNPIVOT', 'ORDER'…
```

```sql
SELECT HU.PROJ.CITY AS PCITY, HU.STAFF.CITY SCITY, BUDGET + GRADE * HOURS * 100 REAL_BUDGET FROM HU.STAFF, HU.PROJ, HU.WORKS WHERE HU.WORKS.EMPNUM = HU.STAFF.EMPNUM AND HU.WORKS.PNUM = HU.PROJ.PNUM AND EMPNAME = 'Alice' AND HU.PROJ.PNUM = 'P3'

TEST:0554 PASS:0554 If PCITY = 'Tampa' AND SCITY = 'Deale'? AND REAL_BUDGET = 126000?
=> expected PCITY = 'Tampa', got error: undefined is not an object (evaluating 'p['HU']['WORKS']')
```

#### ☓ Ran 27 checks in 3 tests

* 25 failed
* 1 not read (condition text the runner does not understand)
* 3% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 82/339 `nist/sql/sdl003.sql` (SCHANZLE)

```sql
SELECT EMPNUM,EMPNAME,USER FROM HU.STAFF WHERE EMPNUM = 'E3'

TEST:0139 PASS:0139 If EMPNAME = 'Carmen' and USER = 'SCHANZLE'?
=> expected EMPNAME = 'Carmen', got error: Column does not exist: USER
```

#### ☓ Ran 3 checks in 1 tests

* 1 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 83/339 `nist/sql/sdl030.sql` (SCHANZLE)

```sql
SELECT COUNT(*) FROM CUGINI.EE

TEST:0464 PASS:0464 If count = 1?
=> expected count 1, got 2
```

#### ☓ Ran 19 checks in 4 tests

* 15 failed
* 21% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 84/339 `nist/sql/sdl029.sql` (SCHANZLE)

```sql
SELECT CHARTEST FROM CUGINI.BB

TEST:0459 PASS:0459 IF ERROR, syntax error/access violation, 0 rows selected?
=> expected an error, got 1 rows
```

#### ☓ Ran 19 checks in 4 tests

* 15 failed
* 21% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 85/339 `nist/sql/sdl033.sql` (SCHANZLE)

#### ☓ Ran 12 checks in 1 tests

* 9 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 86/339 `nist/sql/sdl023.sql` (SCHANZLE)

```sql
SELECT COUNT(*) FROM HU.STAFF4

TEST:0201 PASS:0201 If ERROR, syntax error/access violation, OR count = 0?
=> expected an error, got 1 rows
```

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 87/339 `nist/sql/sdl034.sql` (SCHANZLE)

#### ☓ Ran 4 checks in 3 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 88/339 `nist/sql/sdl031.sql` (SCHANZLE)

#### ☓ Ran 13 checks in 4 tests

* 5 failed
* 61% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 89/339 `nist/sql/dml016.sql` (SULLIVAN)

```sql
SELECT USER, PNAME FROM HU.PROJ

TEST:0064 PASS:0064 If 6 rows are selected and each USER = 'SULLIVAN' ?
=> unparsed: condition not read: each USER = 'SULLIVAN'
```

```sql
SELECT 'USER',PNAME FROM HU.PROJ

TEST:0065 PASS:0065 If 6 rows are selected and first column is value 'USER'?
=> unparsed: condition not read: first column is value 'USER'
```

```sql
SELECT EMPNUM,10 FROM HU.STAFF WHERE GRADE = 10

TEST:0066 PASS:0066 If 1 row with values 'E2' and 10?
=> unparsed: condition not read: 1 row with values 'E2'
```

#### ★ Ran 5 checks in 3 tests

* 5 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 90/339 `nist/sql/sdl035.sql` (SCHANZLE)

```sql
SELECT CHARTEST FROM CUGINI.VAA

TEST:0477 PASS:0477 If 1 row is selected and CHARTEST = "Twenty Characters..."?
=> unparsed: condition not read: CHARTEST = "Twenty Characters..."
```

```sql
UPDATE CUGINI.VBB SET CHARTEST = 'B'

TEST:0478 PASS:0478 If syntax error/access violation, 0 rows updated?
=> expected an error, got count 1
```

#### ☓ Ran 19 checks in 4 tests

* 14 failed
* 1 not read (condition text the runner does not understand)
* 22% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 91/339 `nist/sql/sdl002.sql` (SULLIVAN)

#### ☓ Ran 3 checks in 1 tests

* 1 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 92/339 `nist/sql/cdr022.sql` (SULLIVAN)

#### ☓ Ran 4 checks in 2 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 93/339 `nist/sql/sdl009.sql` (SULLIVAN)

```sql
SELECT HU.STAFF.EMPNUM,EMPNAME,HOURS,USER FROM HU.STAFF,HU.WORKS WHERE HU.STAFF.EMPNUM='E1' AND PNUM='P3'

TEST:0145 PASS:0145 If STAFF.EMPNAME = 'Alice', USER = 'SULLIVAN', HOURS =80?
=> expected STAFF.EMPNAME = 'Alice', got error: Column does not exist: USER
```

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 94/339 `nist/sql/sdl004.sql` (SULLIVAN)

```sql
SELECT PNUM,PNAME,USER FROM HU.PROJ WHERE PNUM = 'P3'

TEST:0140 PASS:0140 If PNAME = 'SDP' and USER = 'SULLIVAN'?
=> expected PNAME = 'SDP', got error: Column does not exist: USER
```

#### ☓ Ran 3 checks in 1 tests

* 3 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 95/339 `nist/sql/sdl007.sql` (SULLIVAN)

```sql
SELECT EMPNUM,EMPNAME,USER FROM HU.STAFF2 WHERE EMPNUM = 'E3'

TEST:0143 PASS:0143 If EMPNAME = 'Carmen' and USER = 'SULLIVAN' ?
=> expected USER = 'SULLIVAN', got NULL
```

```sql
SELECT EMPNUM,EMPNAME FROM HU.STAFF WHERE EMPNUM='E8'

TEST:0143 PASS:0143 If EMPNAME = 'Ling'?
=> expected EMPNAME = 'Ling', got no rows
```

#### ☓ Ran 3 checks in 1 tests

* 3 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 96/339 `nist/sql/sdl008.sql` (SULLIVAN)

```sql
SELECT EMPNUM,EMPNAME,GRADE FROM HU.STAFF3 WHERE EMPNUM = 'E8'

TEST:0144 PASS:0144 If EMPNAME = 'Yang' and GRADE = 13?
=> expected EMPNAME = 'Yang', got 'Carmen'
```

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 97/339 `nist/sql/sdl006.sql` (SULLIVAN)

#### ☓ Ran 3 checks in 1 tests

* 1 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 98/339 `nist/sql/sdl036.sql` (SCHANZLE)

#### ☓ Ran 9 checks in 3 tests

* 7 failed
* 22% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 99/339 `nist/sql/sdl021.sql` (SULLIVAN)

#### ☓ Ran 3 checks in 1 tests

* 2 failed
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 100/339 `nist/sql/sdl010.sql` (SULLIVAN)

#### ☓ Ran 6 checks in 1 tests

* 1 failed
* 83% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 101/339 `nist/sql/sdl022.sql` (SULLIVAN)

#### ☓ Ran 3 checks in 1 tests

* 1 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 102/339 `nist/sql/sdl037.sql` (SULLIVAN1)

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 103/339 `nist/sql/sdl011.sql` (SULLIVAN1)

```sql
SELECT FIRST1, USER FROM AUTH_TABLE

TEST:0147 PASS:0147 If FIRST1 = 100 and USER = 'SULLIVAN1'?
=> expected FIRST1 = 100, got error: Column does not exist: USER
```

#### ☓ Ran 2 checks in 1 tests

* 1 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 104/339 `nist/sql/cdr004.sql` (SUN)

#### ☓ Ran 12 checks in 4 tests

* 2 failed
* 83% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 105/339 `nist/sql/cdr002.sql` (SUN)

#### ★ Ran 12 checks in 4 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 106/339 `nist/sql/cdr006.sql` (SUN)

#### ★ Ran 6 checks in 3 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 107/339 `nist/sql/cdr005.sql` (SUN)

#### ★ Ran 6 checks in 3 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 108/339 `nist/sql/cdr008.sql` (SUN)

```sql
SELECT COUNT(*) FROM WORKS3

TEST:0323 PASS:0323 If count = 2?
=> expected count 2, got 0
```

#### ☓ Ran 8 checks in 4 tests

* 5 failed
* 37% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 109/339 `nist/sql/cdr001.sql` (SUN)

```sql
SELECT EMPNAME FROM STAFF14 WHERE EMPNAME = 'SUN'

TEST:0301 PASS:0301 If 1 row selected and EMPNAME = 'SUN'?
=> expected 1 rows selected, got error: Table does not exist: STAFF14
```

#### ☓ Ran 8 checks in 3 tests

* 4 failed
* 50% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 110/339 `nist/sql/cdr007.sql` (SUN)

#### ☓ Ran 9 checks in 4 tests

* 7 failed
* 22% of the checks and 25% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 111/339 `nist/sql/cdr009.sql` (SUN)

#### ☓ Ran 12 checks in 5 tests

* 4 failed
* 66% of the checks and 60% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 112/339 `nist/sql/cdr010.sql` (SUN)

```sql
SELECT COUNT(*) FROM STAFF_C WHERE MGR = 'E1'

TEST:0332 PASS:0332 If count = 3?
=> expected count 3, got 0
```

#### ☓ Ran 4 checks in 3 tests

* 3 failed
* 25% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 113/339 `nist/sql/cdr003.sql` (SUN)

#### ☓ Ran 12 checks in 4 tests

* 1 failed
* 91% of the checks and 75% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 114/339 `nist/sql/cdr012.sql` (SUN)

#### ☓ Ran 4 checks in 3 tests

* 3 failed
* 25% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 115/339 `nist/sql/cdr011.sql` (SUN)

#### ☓ Ran 9 checks in 5 tests

* 7 failed
* 22% of the checks and 20% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 116/339 `nist/sql/cdr013.sql` (SUN)

#### ☓ Ran 7 checks in 4 tests

* 5 failed
* 28% of the checks and 25% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 117/339 `nist/sql/cdr017.sql` (SUN)

```sql
DELETE FROM SIZ2_P WHERE P1 = ' A'

TEST:0356 PASS:0356 If RI ERROR, children exist, 0 rows deleted?
=> expected an error, got count 1
```

```sql
SELECT COUNT(*) FROM SIZ3_F,SIZ3_P1,SIZ3_P2,SIZ3_P3,SIZ3_P4, SIZ3_P5,SIZ3_P6 WHERE P1 = SIZ3_P1.F1 AND P2 = SIZ3_P2.F1 AND P3 = SIZ3_P3.F1 AND P4 = SIZ3_P4.F1 AND P5 = SIZ3_P5.F1 AND P6 = SIZ3_P6.F1 AND SIZ3_P3.F1 BETWEEN 1 AND 2

TEST:0376 PASS:0376 If count = 4?
=> expected count 4, got error: undefined is not an object (evaluating 'p['SIZ3_F']['P1']')
```

#### ☓ Ran 17 checks in 7 tests

* 13 failed
* 23% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 118/339 `nist/sql/cdr021.sql` (SUN)

#### ☓ Ran 4 checks in 2 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 119/339 `nist/sql/cdr024.sql` (SUN)

```sql
INSERT INTO EXACT_DEF VALUES (98.3, -55556, .000001)

TEST:0386 PASS:0386 If 1 row is inserted?
=> expected 1 rows inserted, got error: Table 'EXACT_DEF' could not be found
```

```sql
SELECT COUNT(*) FROM EXACT_DEF WHERE BODY_TEMP = 99.0 AND MAX_NUM = -55555 AND MIN_NUM = .000001 OR BODY_TEMP = 98.6 AND MAX_NUM = 100 AND MIN_NUM = .2

TEST:0386 PASS:0386 If count = 2?
=> expected count 2, got error: Table does not exist: EXACT_DEF
```

```sql
INSERT INTO APPROX_DEF(X_COUNT) VALUES (5.0E5)

TEST:0387 PASS:0387 If 1 row is inserted?
=> expected 1 rows inserted, got error: Table 'APPROX_DEF' could not be found
```

```sql
SELECT COUNT(*) FROM APPROX_DEF WHERE (Y_COUNT BETWEEN -9.991E10 AND -9.989E10) AND (Z_COUNT BETWEEN 3.44E-11 AND 3.46E-11) AND (ZZ_COUNT BETWEEN -7.6778E-7 AND -7.6776E-7) OR (X_COUNT BETWEEN 1.77E12 AND 1.79E12)

TEST:0387 PASS:0387 If count = 2?
=> expected count 2, got error: Table does not exist: APPROX_DEF
```

```sql
SELECT COUNT(*) FROM SIZE_TAB WHERE COL4 BETWEEN -1.46E22 AND -1.048575E22 GROUP BY COL1, COL2, COL3

TEST:0388 PASS:0388 If count = 2?
=> expected count 2, got error: Table does not exist: SIZE_TAB
```

#### ☓ Ran 16 checks in 4 tests

* 12 failed
* 25% of the checks and 25% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 120/339 `nist/sql/cdr019.sql` (SUN)

#### ☓ Ran 9 checks in 4 tests

* 6 failed
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 121/339 `nist/sql/cdr030.sql` (SUN)

```sql
INSERT INTO STAFF11 VALUES('E3','Susan',11,'Hawaii')

TEST:0516 PASS:0516 If 1 row inserted?
=> expected 1 rows inserted, got error: undefined is not an object (evaluating 'alasql.sets["5,22"].has')
```

#### ☓ Ran 10 checks in 1 tests

* 5 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 122/339 `nist/sql/dml099.sql` (FLATER)

```sql
SELECT C1, C2, C3 FROM ICAST2

TEST:0582 PASS:0582 If 1 row is selected with C1 = 3 and C3 = 3.142?
=> expected C3 = 3.142, got 3.142293
```

```sql
SELECT C1, C2, C3 FROM ICAST2

TEST:0582 PASS:0582 If 1 row is selected with C1 = 5 and C3 = 5.241?
=> expected C3 = 5.241, got 5.2413
```

#### ☓ Ran 8 checks in 1 tests

* 2 failed
* 75% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 123/339 `nist/sql/cdr025.sql` (SUN)

```sql
SELECT UNIT_PRICE, FROM_DATE, TO_DATE, COMMODITY FROM DOLLARS_PER_POUND ORDER BY COMMODITY DESC

TEST:0402 PASS:0402 If the first row has the following values? If UNIT_PRICE is between 0.06 and 0.07? If FROM_DATE = 871012 and TO_DATE = 871212?
=> expected a row 'If' 'FROM_DATE' '=' 871012 'and' 'TO_DATE' '=' 871212, got 0.0670745929118774 871012 871212 'Wheat' | 0.5 880707 880707 'Alfalfa'
```

```sql
SELECT CURRENCY, MEASURE, UNIT_PRICE, COMMODITY FROM COST_PER_UNIT

TEST:0403 PASS:0403 If for values CURRENCY = 'DM' and? MEASURE = 'KILO' and COMMODITY = 'Alfalfa'? UNIT_PRICE is between 2.42 and 2.47?
=> unparsed: condition not read: for values CURRENCY = 'DM'
```

#### ☓ Ran 5 checks in 3 tests

* 2 failed
* 1 not read (condition text the runner does not understand)
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 124/339 `nist/sql/cdr027.sql` (SUN)

```sql
INSERT INTO STAFF9(EMPNUM,EMPNAME) VALUES('Z2','tina')

TEST:0449 PASS:0449 If 1 row inserted?
=> expected 1 rows inserted, got error: Violation of CHECK constraint
```

```sql
INSERT INTO EMP VALUES(13,'MARY','Dancer',15,'VOLLEYBALL',010101)

TEST:0450 PASS:0450 If 1 row inserted?
=> expected 1 rows inserted, got error: Foreign key "VOLLEYBALL" not found in table "DEPT"
```

```sql
SELECT * FROM DEPT ORDER BY DNO

TEST:0450 PASS:0450 If 5 rows selected? If DNO values are 11, 12, 13, 14, 15? If DNAME = 'Education' (not 'EDUCATION') for DNO = 14?
=> unparsed: condition not read: DNO values are 11
```

```sql
SELECT ENO, ENAME, DNO, DNAME FROM EMP ORDER BY ENO

TEST:0450 PASS:0450 If 8 rows selected? If ENO values are 13, 21 through 27? If DNAME = 'Physics' (not 'PHYSICS') for ENO = 25?
=> unparsed: condition not read: ENO values are 13
```

#### ☓ Ran 32 checks in 5 tests

* 6 failed
* 2 not read (condition text the runner does not understand)
* 80% of the checks and 40% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 125/339 `nist/sql/cdr020.sql` (SUN)

```sql
SELECT MAX(F1),MIN(F1) FROM SIZ3_P3

TEST:0369 PASS:0369 If MAX(F1) = 5 and MIN(F1) = 1?
=> expected MAX(F1) = 5, got 4
```

```sql
SELECT MAX(F1),MIN(F1) FROM SIZ2_F3

TEST:0370 PASS:0370 If MAX(F1) = 4 and MIN(F1) = 2?
=> expected MAX(F1) = 4, got NULL
```

```sql
SELECT MAX(F_KEY),MIN(F_KEY),MAX(P_KEY),MIN(P_KEY) FROM MID1

TEST:0371 PASS:0371 If MAX(F_KEY) = 4 and MIN(F_KEY) = 2 and? If MAX(P_KEY) = 6 and MIN(P_KEY) = 2?
=> expected MAX(F_KEY) = 4, got NULL
```

#### ☓ Ran 4 checks in 4 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 126/339 `nist/sql/cdr026.sql` (SUN)

```sql
SELECT EXP_NAME, BTH_DATE FROM EXPERIENCE WHERE EXP_NAME IS NOT NULL AND BTH_DATE IS NOT NULL AND DESCR = 'Car Mechanic'

TEST:0438 PASS:0438 If 1 row is seleced with values? EXP_NAME = 'Lilian' and BTH_DATE = 112156?
=> unparsed: condition not read: 1 row is seleced with values EXP_NAME = 'Lilian'
```

```sql
UPDATE EXPERIENCE SET EXP_NAME = NULL ,BTH_DATE = NULL WHERE DESCR = 'Fashion Model'

TEST:0439 PASS:0439 If 1 row is updated?
=> expected 1 rows updated, got 0
```

```sql
UPDATE EXPERIENCE SET EXP_NAME = 'Mary', BTH_DATE = 121245 WHERE DESCR = 'Fireman'

TEST:0439 PASS:0439 If 1 row is updated?
=> expected 1 rows updated, got error: Foreign key "Mary, 121245" not found in table "EMP"
```

```sql
SELECT EXP_NAME, DESCR, BTH_DATE FROM EXPERIENCE ORDER BY EXP_NAME, BTH_DATE

TEST:0439 PASS:0439 If 17 rows are selected? If 'David' the 'Monk' has BTH_DATE = 101024 ? If 3 rows with 'Lilian' have BTH_DATE = 112156 or NULL? If 'Mary' is a 'Fireman' with BTH_DATE = 121245? If EXP_NAME is NULL for 'Photographer'? If EXP_NAME and BTH_DATE are NULL for 'Fashion Model'? If EXP_NAME is NULL for 'Art…
=> unparsed: condition not read: 'David' the 'Monk' has BTH_DATE = 101024
```

#### ☓ Ran 16 checks in 3 tests

* 9 failed
* 2 not read (condition text the runner does not understand)
* 35% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 127/339 `nist/sql/dml108.sql` (FLATER)

```sql
CREATE TABLE TEMPS ( ENTERED TIMESTAMP, START DATE, APPT INTERVAL DAY, HOUR_IN TIME, HOUR_OUT TIME, LUNCH INTERVAL HOUR TO MINUTE)

TEST:0617 PASS:0617 If table is created?
=> expected success, got error: Parse error on line 4: ... DATE, APPT INTERVAL DAY, HOUR ----------------------^ Expecting 'LITERAL', 'EOF', 'COMMA', 'RPAR', 'END', 'ELSE', 'ColumnConstraints', 'ENUM', 'GO', 'SEMICOLON', got 'INTERVAL'
```

```sql
INSERT INTO TEMPS VALUES ( TIMESTAMP '1993-11-10 12:25:14', DATE '1993-11-12', INTERVAL '4' DAY, TIME '08:30:00', TIME '16:30:00', INTERVAL '1:00' HOUR TO MINUTE)

TEST:0617 PASS:0617 If 1 row is inserted?
=> expected 1 rows inserted, got error: Parse error on line 2: ...ALUES ( TIMESTAMP '1993-11-10 12:25:14... ----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', …
```

```sql
SELECT COUNT(*) FROM TEMPS WHERE HOUR_OUT IN (SELECT HOUR_IN + INTERVAL '8' HOUR FROM TEMPS)

TEST:0617 PASS:0617 If count = 2?
=> expected count 2, got error: Table does not exist: TEMPS
```

```sql
SELECT COUNT(*) FROM TEMPS WHERE HOUR_OUT = ANY (SELECT HOUR_IN + INTERVAL '8' HOUR FROM TEMPS)

TEST:0617 PASS:0617 If count = 2?
=> expected count 2, got error: Table does not exist: TEMPS
```

```sql
SELECT EXTRACT (HOUR FROM AVGLUNCH) * 100 + EXTRACT (MINUTE FROM AVGLUNCH) FROM SUBQ1

TEST:0617 PASS:0617 If 1 row selected and value is 49 or 50?
=> unparsed: condition not read: value is 49 or 50
```

```sql
DROP TABLE TEMPS CASCADE

TEST:0617 PASS:0617 If table and view are dropped?
=> unparsed: condition not read: table
```

#### ☓ Ran 24 checks in 1 tests

* 20 failed
* 3 not read (condition text the runner does not understand)
* 4% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 128/339 `nist/sql/dml114.sql` (FLATER)

```sql
SELECT EMPNAME FROM HU.STAFF, WORKWEEK WHERE HU.STAFF.EMPNUM = WORKWEEK.EMPNUM AND HOURS = 12

TEST:0635 PASS:0635 If 1 row selected and EMPNAME = 'Alice'?
=> expected 1 rows selected, got error: undefined is not an object (evaluating 'p['HU']['STAFF']')
```

```sql
SELECT COUNT(*), MAX(EMPNUM), MIN(EMPNUM), AVG(HOURS) FROM WORKWEEK

TEST:0635 PASS:0635 If 1 row selected and count = 10 and MAX(EMPNUM) = 'E4'? AND MIN(EMPNUM) = 'E1' and AVG(HOURS) = 43 (approximately)?
=> unparsed: condition not read: AVG(HOURS) = 43 (approximately)
```

```sql
SELECT COUNT(*) FROM QUALSTAR

TEST:0637 PASS:0637 If count = 12?
=> expected count 12, got error: Table does not exist: QUALSTAR
```

```sql
SELECT EMPNUM, GRADE, CITY, HOURS FROM QUALSTAR WHERE EMPNAME = 'Carmen'

TEST:0637 PASS:0637 If 1 row selected and EMPNUM = 'E3' and GRADE = 13? AND CITY = 'Vienna' and HOURS = 20?
=> expected 1 rows selected, got error: Table does not exist: QUALSTAR
```

```sql
SELECT COUNT(*) FROM CORRQUALSTAR

TEST:0637 PASS:0637 If count = 12?
=> expected count 12, got error: undefined is not an object (evaluating 'p['HU']['WORKS']')
```

```sql
SELECT EMPNUM, GRADE, CITY, HOURS FROM CORRQUALSTAR WHERE EMPNAME = 'Carmen'

TEST:0637 PASS:0637 If 1 row selected and EMPNUM = 'E3'? AND GRADE = 13 and CITY = 'Vienna' and HOURS = 20?
=> expected 1 rows selected, got error: undefined is not an object (evaluating 'p['HU']['WORKS']')
```

```sql
SELECT EMPNUM as WhatsHisNumber, GRADE, CITY FROM Flater.staff FLaterStaff_Flater WHERE EMPNAME = 'Carmen' AND FLATERstaff_fLATER.whatshisnumber = 'E3'

TEST:0639 PASS:0639 If 1 row selected and EMPNUM = 'E3'? AND GRADE = 13 and CITY = 'Vienna'?
=> expected 1 rows selected, got error: undefined is not an object (evaluating 'alasql.databases[fr.databaseid || databaseid].tables')
```

```sql
INSERT INTO FEAT16 VALUES (4, NULL)

TEST:0641 PASS:0641 If 1 row is inserted?
=> expected 1 rows inserted, got error: Cannot insert record, because it already exists in unique index
```

#### ☓ Ran 38 checks in 4 tests

* 14 failed
* 1 not read (condition text the runner does not understand)
* 62% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 129/339 `nist/sql/dml106.sql` (FLATER)

```sql
SELECT * FROM ABOVE_AVERAGE ORDER BY COLUMN_1

TEST:0599 PASS:0599 If 4 rows selected with ordered rows and column values: ? MAX 30000 Tampa ? P2 30000 Vienna ? P3 30000 Tampa ? P6 50000 Deale ?
=> expected P2   30000  Vienna ? | P3   30000  Tampa  ? | P6   50000  Deale  ?, got 'MAX' 30000 NULL | 'P2' 30000 'Vienna' | 'P3' 30000 'Tampa' | 'P6' 50000 'Deale'
```

```sql
SELECT * FROM STAFF_DUP ORDER BY CITY

TEST:0599 PASS:0599 If 10 rows selected ? If first row contains EMPNUM/CITY values E5 / Akron ? If second row contains EMPNUM/CITY values E5 / Akron ?
=> unparsed: condition not read: first row contains EMPNUM/CITY values E5 / Akron
```

```sql
SELECT C2, C1, C3 FROM FOUR_CITIES ORDER BY C3, C2

TEST:0599 PASS:0599 If 7 rows selected with ordered rows and column values ? Akron T -999 ? Deale T -999 ? Vienna X -1 ? Deale P 666 ? Vienna P 666 ? Deale S 777 ? Vienna S 777 ?
=> expected Deale   T     -999  ? | Vienna  X       -1  ? | Deale   P      666  ? | Vienna  P      666  ? | Deale   S      777  ? | Vienna  S      777  ?, got 'Akron' 'T' -999 | 'Deale' 'T' -999 | 'Vienna' 'X' -1 | 'Vienna' 'X' -1 | 'Deale' 'P' 666 | 'Vienna' 'P' 666 | 'Deale' 'S' 777 | 'Vienna' 'S' 7…
```

```sql
INSERT INTO TSSMALL VALUES ( CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP)

TEST:0613 PASS:0613 If 1 row is inserted?
=> expected 1 rows inserted, got error: undefined is not an object (evaluating 'undefined['undefined']')
```

#### ☓ Ran 37 checks in 5 tests

* 20 failed
* 3 not read (condition text the runner does not understand)
* 41% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 130/339 `nist/sql/dml112.sql` (FLATER)

```sql
SELECT COUNT(*) FROM TURNAROUND WHERE DWAIT IS NOT NULL

TEST:0621 PASS:0621 If count = 1?
=> expected count 1, got error: Table does not exist: TURNAROUND
```

```sql
SELECT EXTRACT (DAY FROM RDATE) FROM MERCH, TURNAROUND WHERE MERCH.ITEMKEY = TURNAROUND.ITEMKEY

TEST:0621 PASS:0621 If 1 row selected and value is NULL?
=> expected 1 rows selected, got error: Parse error on line 1: SELECT EXTRACT (DAY FROM RDATE) FRO --------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'RBR…
```

```sql
SELECT COUNT(*) FROM INVENTORY WHERE MWAIT IS NULL AND DWAIT IS NULL

TEST:0621 PASS:0621 If count = 2?
=> expected count 2, got error: Table does not exist: INVENTORY
```

```sql
DROP TABLE MERCH CASCADE

TEST:0621 PASS:0621 If table is dropped?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

```sql
SELECT COUNT(*) FROM JNULL5

TEST:0623 PASS:0623 If count = 0?
=> expected count 0, got error: Column does not exist: D1
```

```sql
SELECT COUNT(*) FROM JNULL6 WHERE C2 IS NOT NULL

TEST:0623 PASS:0623 If count = 3?
=> expected count 3, got error: alasql.databases[source.databaseid].tables[source.tableid].select is not a function. (In 'alasql.databases[source.databaseid].tables[source.tableid].select(params)', 'alasql.databases[source.databaseid].tables[source.tableid].select' is undefined)
```

```sql
SELECT AVG(D1) * 10 FROM JNULL3

TEST:0623 PASS:0623 If value is 15 (approximately)?
=> unparsed: condition not read: value is 15 (approximately)
```

```sql
SELECT MAX(NUMBRR) FROM CHANGGVIEW

TEST:0625 PASS:0625 If ERROR, column does not exist ?
=> expected an error, got 1 rows
```

```sql
INSERT INTO CHANGG VALUES ('OLIVIA', 20, '111-11-1111', 0)

TEST:0625 PASS:0625 If 1 row is inserted?
=> expected 1 rows inserted, got error: The number of values (4) does not match the number of table columns (3). If using a subquery, use INSERT INTO ... SELECT instead of INSERT INTO ... VALUES (SELECT ...)
```

```sql
SELECT EXTRACT (HOUR FROM CHECKIN) + EXTRACT (MINUTE FROM CHECKIN) + EXTRACT (SECOND FROM CHECKIN) FROM BIRTHS

TEST:0631 PASS:0631 If 1 row selected with value 0?
=> expected 1 rows selected, got error: Parse error on line 1: ...ELECT EXTRACT (HOUR FROM CHECKIN) + -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR'…
```

```sql
SELECT COUNT (*) FROM BIRTHS WHERE TESTING <> CHECKOUT OR CHECKOUT IS NULL

TEST:0631 PASS:0631 If count = 0?
=> expected count 0, got error: Table does not exist: BIRTHS
```

```sql
UPDATE WEIRDPAD SET SPONSOR = TRIM ('X' FROM SPONSOR), NAAM = TRIM ('B' FROM NAAM)

TEST:0633 PASS:0633 If 2 rows are updated?
=> expected 2 rows updated, got error: Parse error on line 2: ...SPONSOR = TRIM ('X' FROM SPONSOR), -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', …
```

```sql
DELETE FROM WEIRDPAD WHERE TRIM(LEADING 'K' FROM 'Kest') = TRIM('T' FROM SPONSOR)

TEST:0633 PASS:0633 If 1 row is deleted?
=> expected 1 rows deleted, got error: Parse error on line 2: ...E TRIM(LEADING 'K' FROM 'Kest') = T ----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', …
```

```sql
SELECT COUNT(*) FROM WEIRDPAD WHERE TRIM (PADCHAR FROM SPONSOR) = 'KEITH'

TEST:0633 PASS:0633 If count = 1?
=> expected count 1, got error: Parse error on line 2: ...WHERE TRIM (PADCHAR FROM SPONSOR) = 'KEI -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', '…
```

#### ☓ Ran 114 checks in 5 tests

* 69 failed
* 5 not read (condition text the runner does not understand)
* 36% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 131/339 `nist/sql/dml143.sql` (FLATER)

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 132/339 `nist/sql/dml131.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFO_SCHEM.VIEWS WHERE TABLE_SCHEM = 'HU' AND TABLE_NAME = 'TESTREPORT'

TEST:0684 PASS:0684 If count = 1?
=> expected count 1, got error: undefined is not an object (evaluating 'alasql.databases[fr.databaseid || databaseid].tables')
```

```sql
SELECT COUNT(*) FROM INFO_SCHEM.TABLES WHERE TABLE_SCHEM = 'HU' AND TABLE_NAME = 'FF'

TEST:0684 PASS:0684 If count = 0?
=> expected count 0, got error: Parse error on line 1: ...(*) FROM INFO_SCHEM.TABLES WHERE TABLE -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'TABLE'
```

```sql
SELECT COUNT(*) FROM INFO_SCHEM.COLUMN_PRIVILEGES WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'BASE_WCOV' AND GRANTOR = 'FLATER' AND GRANTEE = 'CUGINI' AND PRIVILEGE_TYPE = 'DELETE' AND IS_GRANTABLE = 'NO'

TEST:0685 PASS:0685 If count = 1?
=> expected count 1, got error: undefined is not an object (evaluating 'alasql.databases[fr.databaseid || databaseid].tables')
```

#### ☓ Ran 48 checks in 5 tests

* 46 failed
* 4% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 133/339 `nist/sql/flg012.sql` (FLATER)

#### ★ Ran 2 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 134/339 `nist/sql/dml104.sql` (FLATER)

```sql
SELECT EMPNUM FROM NMGRP2 WHERE NAME = 'MARY' AND GRP = 20

TEST:0592 PASS:0592 If 1 row is selected and EMPNUM = 1?
=> expected 1 rows selected, got error: Cannot resolve column "EMPNUM" because it exists in two source tables
```

```sql
SELECT COUNT(*) FROM NMGRP2 WHERE NAME <> 'MARY' OR GRP <> 20 OR EMPNUM <> 1 OR NAME IS NULL OR GRP IS NULL OR EMPNUM IS NULL

TEST:0592 PASS:0592 If count = 0?
=> expected count 0, got error: Cannot resolve column "EMPNUM" because it exists in two source tables
```

#### ☓ Ran 83 checks in 4 tests

* 6 failed
* 4 not read (condition text the runner does not understand)
* 92% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 135/339 `nist/sql/dml100.sql` (FLATER)

```sql
INSERT INTO SLACK VALUES (2.4)

TEST:0587 PASS:0587 If ERROR, invalid transaction state, 0 rows inserted?
=> expected an error, got count 1
```

#### ☓ Ran 17 checks in 1 tests

* 7 failed
* 58% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 136/339 `nist/sql/dml119.sql` (FLATER)

```sql
SELECT AVG (USER_INPUT) FROM STANDARD_INPUT

TEST:0647 PASS:0647 If 1 row selected and value is 11.745 +- 0.01?
=> unparsed: condition not read: value is 11.745 +- 0.01
```

```sql
SELECT SUM (USER_INPUT) * 100, SUM (RECEIVABLE) FROM STANDARD_INPUT

TEST:0647 PASS:0647 If 1 row selected and first value is -95301 +- 4? AND second value is -453.02 +- 0.04?
=> unparsed: condition not read: first value is -95301 +- 4
```

#### ☓ Ran 13 checks in 1 tests

* 1 failed
* 3 not read (condition text the runner does not understand)
* 90% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 137/339 `nist/sql/dml117.sql` (FLATER)

```sql
INSERT INTO AUDIT_RECORDS VALUES (2, 2, 1)

TEST:0645 PASS:0645 If 1 row is inserted?
=> expected 1 rows inserted, got error: Table 'AUDIT_RECORDS' could not be found
```

```sql
DELETE FROM LUSERS WHERE NAAM <> 'root'

TEST:0645 PASS:0645 If 2 rows are deleted?
=> expected 2 rows deleted, got error: undefined is not an object (evaluating 'table.data')
```

```sql
SELECT COUNT(*) FROM LUSER_DATA

TEST:0645 PASS:0645 If count = 2?
=> expected count 2, got error: Table does not exist: LUSER_DATA
```

```sql
SELECT COUNT(*) FROM LUSERS

TEST:0645 PASS:0645 If count = 1?
=> expected count 1, got error: Table does not exist: LUSERS
```

```sql
SELECT COUNT(*) FROM AUDIT_RECORDS

TEST:0645 PASS:0645 If count = 12?
=> expected count 12, got error: Table does not exist: AUDIT_RECORDS
```

```sql
DROP TABLE AUDIT_RECORDS CASCADE

TEST:0645 PASS:0645 If table is dropped?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 44 checks in 1 tests

* 35 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 138/339 `nist/sql/dml130.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'LOTSA_TYPES' AND COLUMN_NAME = 'RUDDER' AND ORDINAL_POSITION = 9 AND COLUMN_DEF IS NULL AND DATA_TYPE = 'DECIMAL' AND CHAR_MAX_LENGTH IS NULL AND CHAR_OCTET_LENGTH IS NULL AND NUM_PREC >= 2 AND NUM_SCALE = 0 AND …

TEST:0679 PASS:0679 If count = 1?
=> expected count 1, got error: Parse error on line 1: ...(*) FROM INFO_SCHEM.COLUMNS WHERE TABL -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

```sql
CREATE VIEW LOTSA_TYPES AS SELECT * FROM LT1, LT2

TEST:0680 PASS:0680 If view is created?
=> expected success, got error: Can not create table 'LOTSA_TYPES', because it already exists in the database 'FLATER'
```

```sql
SELECT COUNT(*) FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'LOTSA_DATETIMES' AND COLUMN_NAME = 'C6' AND ORDINAL_POSITION = 6 AND COLUMN_DEF IS NULL AND DATA_TYPE = 'INTERVAL' AND CHAR_MAX_LENGTH IS NULL AND CHAR_OCTET_LENGTH IS NULL AND NUM_PREC IS NULL AND NUM_PREC_RADIX…

TEST:0682 PASS:0682 If count = 1?
=> expected count 1, got error: Parse error on line 1: ...(*) FROM INFO_SCHEM.COLUMNS WHERE TABL -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

#### ☓ Ran 57 checks in 4 tests

* 44 failed
* 2 not read (condition text the runner does not understand)
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 139/339 `nist/sql/dml133.sql` (FLATER)

```sql
SELECT TIMESLOT FROM SHIRLEY_HURWITZ.MEETINGS, LEN_GALLAGHER.TRAVEL WHERE AGENDA = DESTINATION

TEST:0643 PASS:0643 If 1 row selected and TIMESLOT = 10?
=> expected 1 rows selected, got error: Table does not exist: TRAVEL
```

#### ☓ Ran 3 checks in 1 tests

* 2 failed
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 140/339 `nist/sql/dml148.sql` (FLATER)

```sql
SELECT * FROM HU.WORKS NATURAL LEFT JOIN HU.PROJ ORDER BY EMPNUM DESC, PNUM

TEST:0843 PASS:0843 If 12 rows selected? If ordered row and column values for first two rows are: ? P2 E4 20 CALM Code 30000 Vienna ? P4 E4 40 SDP Design 20000 Deale ?
=> unparsed: condition not read: ordered row
```

```sql
SELECT EMPNAME, CITY, T_DECIMAL FROM HU.STAFF LEFT OUTER JOIN SEVEN_TYPES ON -GRADE / 11 BETWEEN T_REAL AND T_DECIMAL ORDER BY EMPNAME

TEST:0844 PASS:0844 If 6 rows selected with ordered rows and column values ? Alice Deale NULL ? Betty Vienna 0 ? Betty Vienna 0 ? Carmen Vienna NULL ? Don Deale NULL ? Ed Akron NULL ?
=> expected Betty  Vienna    0  ? | Betty  Vienna    0  ? | Carmen Vienna NULL  ? | Don    Deale  NULL  ? | Ed     Akron  NULL  ?, got 'Alice' 'Deale' NULL | 'Betty' 'Vienna' NULL | 'Carmen' 'Vienna' NULL | 'Don' 'Deale' NULL | 'Ed' 'Akron' NULL
```

```sql
SELECT T_INT, T_CHAR, EMPNAME, EMPNUM, GRADE FROM SEVEN_TYPES RIGHT JOIN HU.STAFF ON GRADE IN (10, 11, 13) AND EMPNUM = T_CHAR ORDER BY EMPNAME, T_INT

TEST:0844 PASS:0844 If 5 rows selected with ordered rows and column values ? NULL NULL Alice E1 12 ? 2 E2 Betty E2 10 ? NULL NULL Carmen E3 13 ? NULL NULL Don E4 12 ? NULL NULL Ed E5 13 ?
=> expected 2 E2   Betty  E2 10  ? | NULL NULL Carmen E3 13  ? | NULL NULL Don    E4 12  ? | NULL NULL Ed     E5 13  ?, got NULL NULL 'Alice' 'E1' 12 | 2 'E2' 'Betty' 'E2' 10 | NULL NULL 'Carmen' 'E3' 13 | NULL NULL 'Don' 'E4' 12 | NULL NULL 'Ed' 'E5' 13
```

```sql
SELECT XX.PNUM, BUDGET, HOURS, EMPNUM FROM HU.PROJ XX LEFT JOIN HU.WORKS YY ON XX.PNUM = YY.PNUM AND HOURS * BUDGET / 160000 > (SELECT GRADE FROM HU.STAFF WHERE YY.EMPNUM = HU.STAFF.EMPNUM) ORDER BY PNUM

TEST:0844 PASS:0844 If 6 rows selected with ordered rows and column values ? P1 10000 NULL NULL ? P2 30000 80 E2 ? P3 30000 80 E1 ? P4 20000 NULL NULL ? P5 10000 NULL NULL ? P6 50000 NULL NULL ?
=> expected rows, got error: undefined is not an object (evaluating 'this.queriesfn[0]')
```

```sql
SELECT HU.STAFF.CITY,EMPNAME,PNAME,BUDGET FROM HU.STAFF LEFT JOIN HU.PROJ ON HU.STAFF.CITY = HU.PROJ.CITY AND HU.STAFF.CITY <> 'Vienna' AND EMPNAME <> 'Don' WHERE BUDGET > 15000 OR BUDGET IS NULL ORDER BY HU.STAFF.CITY, EMPNAME, BUDGET

TEST:0844 PASS:0844 If 6 rows selected with ordered rows and column values ? Akron Ed NULL NULL ? Deale Alice SDP 20000 ? Deale Alice PAYR 50000 ? Deale Don NULL NULL ? Vienna Betty NULL NULL ? Vienna Carmen NULL NULL ?
=> expected rows, got error: undefined is not an object (evaluating 'p['HU']['STAFF']')
```

```sql
SELECT HU.STAFF.CITY,EMPNAME,PNAME,BUDGET FROM HU.STAFF LEFT JOIN HU.PROJ ON HU.STAFF.CITY = HU.PROJ.CITY AND HU.STAFF.CITY <> 'Vienna' WHERE (BUDGET > 15000 OR BUDGET IS NULL) AND EMPNAME <> 'Don' ORDER BY HU.STAFF.CITY, EMPNAME, BUDGET

TEST:0844 PASS:0844 If 5 rows selected with ordered rows and column values ? Akron Ed NULL NULL ? Deale Alice SDP 20000 ? Deale Alice PAYR 50000 ? Vienna Betty NULL NULL ? Vienna Carmen NULL NULL ?
=> expected rows, got error: undefined is not an object (evaluating 'p['HU']['STAFF']')
```

```sql
SELECT XX.T_INT, YY.T_INT FROM SEVEN_TYPES XX RIGHT OUTER JOIN SEVEN_TYPES YY ON XX.T_INT = YY.T_INT +1 ORDER BY YY.T_INT

TEST:0844 PASS:0844 If 5 rows selected with ordered rows and column values ? 2 1 ? 3 2 ? NULL 3 ? NULL 12 ? NULL 12 ?
=> expected 3      2  ? | NULL   3  ? | NULL  12  ? | NULL  12  ?, got 1 | 2 | 3
```

```sql
SELECT GRADE, T_FLOAT, T_DOUBLE FROM HU.STAFF LEFT JOIN SEVEN_TYPES T7 ON GRADE * -40 > T7.T_FLOAT OR (T_DOUBLE -542.5 < GRADE AND T_DOUBLE -541.5 > GRADE) ORDER BY GRADE

TEST:0844 PASS:0844 If 5 rows selected with ordered rows and column values ? 10 -444 (approximately) -55 (approximately) ? 12 NULL NULL ? 12 NULL NULL ? 13 44 (approximately) 555 (approximately) ? 13 44 (approximately) 555 (approximately) ?
=> expected 12 NULL                 NULL                 ? | 12 NULL                 NULL                 ? | 13   44 (approximately)  555 (approximately) ? | 13   44 (approximately)  555 (approximately) ?, got 10 -444 -55 | 12 NULL NULL | 12 NULL NULL | 13 44 555 | 13 44 555
```

#### ☓ Ran 10 checks in 2 tests

* 7 failed
* 3 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 141/339 `nist/sql/dml121.sql` (FLATER)

```sql
SELECT COUNT(*) FROM SSSLOG WHERE ENTERED_BY = 'FLATER' AND SEVERITY = 1 AND PROBLEM IS NULL

TEST:0649 PASS:0649 If count = 2?
=> expected count 2, got error: Table does not exist: SSSLOG
```

#### ☓ Ran 21 checks in 4 tests

* 16 failed
* 23% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 142/339 `nist/sql/dml135.sql` (FLATER)

```sql
CREATE VIEW "PTypes" ("TYPE", NUM) AS SELECT PTYPE, COUNT(*) FROM "Proj" GROUP BY PTYPE

TEST:0692 PASS:0692 If view is created?
=> expected success, got error: Parse error on line 1: CREATE VIEW "PTypes" ("TYPE", NU ------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'IF', got 'STRING'
```

```sql
CREATE VIEW PTYPES AS SELECT * FROM "PTypes" WHERE NUM > 1

TEST:0692 PASS:0692 If view is created?
=> expected success, got error: Unknown string in FROM clause
```

```sql
SELECT * FROM PTYPES ORDER BY NUM

TEST:0692 PASS:0692 If 3 rows selected with ordered rows and column values ? Test 2 ? Design 3 ? Code 4 ?
=> expected rows, got error: Table does not exist: PTYPES
```

```sql
SELECT NUM, COUNT(*) FROM "PStaff" GROUP BY NUM ORDER BY NUM

TEST:0692 PASS:0692 If 3 rows selected with ordered rows and column values ? 1 2 ? 2 2 ? 4 1 ?
=> expected rows, got error: Unknown string in FROM clause
```

```sql
DELETE FROM "Proj" WHERE PTYPE = 'Design'

TEST:0692 PASS:0692 If 3 rows from "Proj" and 5 rows from "Works" are deleted?
=> unparsed: condition not read: 3 rows from "Proj"
```

```sql
SET TRANSACTION READ ONLY

TEST:0693 PASS:0693 If successful completion?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

```sql
SELECT TABLE_NAME, TABLE_TYPE, COLUMN_NAME, EXTRACT (HOUR FROM CREATE_TIME) FROM TABLESCOLUMNS ORDER BY TABLE_NAME, COLUMN_NAME

TEST:0693 PASS:0693 If 8 rows selected with ordered rows and column values ? CREATIONTIMES BASE TABLE CREATE_TIME 16 ? CREATIONTIMES BASE TABLE TABLE_NAME 16 ? CREATIONTIMES BASE TABLE TABLE_SCHEM 16 ? TABLESCOLUMNS VIEW COLUMN_NAME NULL ? TABLESCOLUMNS VIEW CREATE_TIME NULL ? TABLESCOLUMNS VIEW TABLE_NAME NULL ? TABL…
=> expected rows, got error: Parse error on line 2: ...ME, EXTRACT (HOUR FROM CREATE_TIME) ----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'RBRA', 'E…
```

#### ☓ Ran 50 checks in 3 tests

* 31 failed
* 6 not read (condition text the runner does not understand)
* 29% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 143/339 `nist/sql/dml136.sql` (FLATER)

```sql
CREATE VIEW ALLSCORES (PLAYER_NO, SPLAT_SCORE, FOOM_SCORE1, FOOM_SCORE2, MAX_FOOM_SCORE1, MAX_FOOM_SCORE2, MAX_SPLAT_SCORE) AS SELECT PLAYER_NO, SPLAT_AVG.*, FOOM_AVG.*, MAXIMA.* FROM FOOM_AVG NATURAL JOIN SPLAT_AVG, MAXIMA

TEST:0696 PASS:0696 If view is created?
=> expected success, got error: undefined is not an object (evaluating 'self.select.columns[idx].as = vcol.columnid')
```

```sql
INSERT INTO FOOM VALUES (1, 1, 98.0, INTERVAL '09:48' MINUTE TO SECOND)

TEST:0696 PASS:0696 If 1 row is inserted?
=> expected 1 rows inserted, got error: Parse error on line 1: ...RVAL '09:48' MINUTE TO SECOND) -----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'REGEXP', …
```

```sql
SELECT * FROM NORMALIZED_AVGS ORDER BY PLAYER_NO

TEST:0696 PASS:0696 If 2 rows selected with ordered rows and column values? 1 0.74398 +- 0.0001 ? 2 0.87826 +- 0.0001 ?
=> expected 2   0.87826 +- 0.0001 ?, got 
```

#### ☓ Ran 21 checks in 1 tests

* 10 failed
* 2 not read (condition text the runner does not understand)
* 47% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 144/339 `nist/sql/dml144.sql` (FLATER)

```sql
SELECT CHAR_LENGTH (EMPNAME) FROM HU.STAFF WHERE GRADE = 10

TEST:0834 PASS:0834 If 1 row selected and value is 20?
=> expected 1 rows selected, got error: alasql.fn["CHAR_LENGTH"] is not a function. (In 'alasql.fn["CHAR_LENGTH"](p['STAFF']['EMPNAME'])', 'alasql.fn["CHAR_LENGTH"]' is undefined)
```

```sql
SELECT CHARACTER_LENGTH ('HI' || 'THERE') FROM HU.ECCO

TEST:0834 PASS:0834 If 1 row selected and value is 7?
=> expected 1 rows selected, got error: alasql.fn["CHARACTER_LENGTH"] is not a function. (In 'alasql.fn["CHARACTER_LENGTH"]((y=[('HI'), ('THERE')], (''+(y[0] || '') + (y[1] || ''))))', 'alasql.fn["CHARACTER_LENGTH"]' is undefined)
```

```sql
SELECT CHARACTER_LENGTH (C1) FROM GRUB

TEST:0834 PASS:0834 If 1 row selected and value is 4?
=> expected 1 rows selected, got error: alasql.fn["CHARACTER_LENGTH"] is not a function. (In 'alasql.fn["CHARACTER_LENGTH"](p['GRUB']['C1'])', 'alasql.fn["CHARACTER_LENGTH"]' is undefined)
```

```sql
SELECT S1 FROM X4 WHERE ID = 1

TEST:0835 PASS:0835 If 1 row selected and S1 = 'els'?
=> expected 1 rows selected, got error: Table does not exist: X4
```

#### ☓ Ran 33 checks in 3 tests

* 23 failed
* 1 not read (condition text the runner does not understand)
* 28% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 145/339 `nist/sql/dml137.sql` (FLATER)

#### ☓ Ran 6 checks in 1 tests

* 4 failed
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 146/339 `nist/sql/dml149.sql` (FLATER)

```sql
INSERT INTO USIG VALUES (10, 20)

TEST:0561 PASS:0561 If ERROR, invalid transaction state, 0 rows inserted?
=> expected an error, got count 1
```

```sql
SELECT CAST (CAST (3 AS DEC (5, 3)) AS CHAR (5)) FROM HU.ECCO

TEST:0846 PASS:0846 If 1 row selected and value is '3.000'?
=> expected values '3.000', got '3    '
```

```sql
SELECT OSPREY FROM NO_DUCK WHERE OSPREY < CAST (SEAGULL + 1 AS CHAR (10)) AND OSPREY = CAST (GOOSE * 1 AS CHAR (10))

TEST:0846 PASS:0846 If 1 row selected and OSPREY = '12.00 '?
=> expected OSPREY = '12.00     ', got '12        '
```

```sql
SELECT CAST (ALBATROSS AS CHAR (4)) FROM NO_DUCK

TEST:0846 PASS:0846 If ERROR, string data, right truncation, 0 rows selected?
=> expected an error, got 1 rows
```

```sql
SELECT CAST (NULL AS CHAR (10)), GOOSE FROM NO_DUCK WHERE SEAGULL = 0 UNION SELECT OSPREY, CAST (SEAGULL AS NUMERIC (4, 2)) FROM NO_DUCK WHERE GOOSE > 10000

TEST:0846 PASS:0846 If 1 row selected and first value is NULL?
=> unparsed: condition not read: first value is NULL
```

```sql
SELECT CAST (GOOSE AS INT) FROM NO_DUCK

TEST:0846 PASS:0846 If 1 row selected and value is NULL?
=> expected values NULL, got 0
```

#### ☓ Ran 43 checks in 2 tests

* 26 failed
* 2 not read (condition text the runner does not understand)
* 36% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 147/339 `nist/sql/dml157.sql` (FLATER)

#### ☓ Ran 2 checks in 1 tests

* 2 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 148/339 `nist/sql/ist002.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFO_SCHEM.VIEWS

TEST:0604 PASS:0604 If count is same as that of next statement?
=> unparsed: condition not read: count is same as that of next statement
```

```sql
SELECT COUNT(*) FROM INFO_SCHEM.VIEWS A, INFO_SCHEM.VIEWS B WHERE A.TABLE_SCHEM = B.TABLE_SCHEM AND A.TABLE_NAME = B.TABLE_NAME

TEST:0604 PASS:0604 If count is same as that of previous statement?
=> unparsed: condition not read: count is same as that of previous statement
```

```sql
SELECT CHECK_OPTION, IS_UPDATABLE FROM INFO_SCHEM.VIEWS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'VS4'

TEST:0604 PASS:0604 If 1 row selected AND CHECK_OPTION = NONE? AND IS_UPDATABLE = NO?
=> expected 1 rows selected, got error: undefined is not an object (evaluating 'alasql.databases[fr.databaseid || databaseid].tables')
```

#### ☓ Ran 17 checks in 1 tests

* 15 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 149/339 `nist/sql/dml153.sql` (FLATER)

#### ☓ Ran 5 checks in 1 tests

* 4 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 150/339 `nist/sql/dml162.sql` (FLATER)

```sql
SELECT COUNT(*) FROM BLIVET WHERE EMPNUM = 'E1'

TEST:0863 PASS:0863 If COUNT = 3?
=> expected count 3, got error: Table does not exist: BLIVET
```

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 151/339 `nist/sql/dml185.sql` (FLATER)

```sql
SELECT COLUMN_DEF FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'XX' AND COLUMN_DEF = 'USER'

TEST:0898 PASS:0898 If COLUMN_DEF = USER (no quotes)?
=> unparsed: condition not read: COLUMN_DEF = USER (no quotes)
```

```sql
SELECT COLUMN_DEF FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'XX' AND COLUMN_DEF = '''USER'''

TEST:0898 PASS:0898 If COLUMN_DEF = 'USER' (with quotes)?
=> unparsed: condition not read: COLUMN_DEF = 'USER' (with quotes)
```

```sql
SELECT COLUMN_DEF FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'XX' AND COLUMN_DEF = 'NULL'

TEST:0898 PASS:0898 If COLUMN_DEF = NULL (the character string)?
=> unparsed: condition not read: COLUMN_DEF = NULL (the character string)
```

```sql
SELECT COLUMN_DEF FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'XX' AND ORDINAL_POSITION = 5

TEST:0898 PASS:0898 If COLUMN_DEF = '1993-11-10 00:02:00'?
=> expected COLUMN_DEF = '1993-11-10 00:02:00', got error: Parse error on line 2: ... FROM INFO_SCHEM.COLUMNS WHERE TABLE_ -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

```sql
INSERT INTO XX (C4, C5) VALUES ('Timestamp', CAST ('1993-11-10 00:02:00' AS TIMESTAMP))

TEST:0898 PASS:0898 If 1 row inserted successfully?
=> expected success, got error: Table 'XX' could not be found
```

```sql
SELECT CAST (COLUMN_DEF AS REAL) FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'XX' AND ORDINAL_POSITION = 6

TEST:0898 PASS:0898 If COLUMN_DEF = 33 (+ or - 0.1)?
=> unparsed: condition not read: COLUMN_DEF = 33 (+ or - 0.1)
```

```sql
SELECT COLUMN_DEF FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'XX' AND COLUMN_DEF IS NULL

TEST:0898 PASS:0898 If COLUMN_DEF = NULL value?
=> expected COLUMN_DEF = NULL value, got error: Parse error on line 2: ... FROM INFO_SCHEM.COLUMNS WHERE TABLE_ -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

```sql
DROP TABLE XX CASCADE

TEST:0898 PASS:0898 If table dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 11 checks in 1 tests

* 6 failed
* 5 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 152/339 `nist/sql/ist001.sql` (FLATER)

```sql
SELECT TABLE_TYPE FROM INFO_SCHEM.TABLES WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'VS6'

TEST:0603 PASS:0603 If 1 row selected and TABLE_TYPE = VIEW?
=> expected 1 rows selected, got error: Parse error on line 1: ...YPE FROM INFO_SCHEM.TABLES WHERE TABL -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'TABLE'
```

#### ☓ Ran 20 checks in 1 tests

* 18 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 153/339 `nist/sql/ist007.sql` (FLATER)

```sql
SELECT COUNT (DISTINCT OBJECT_CAT) FROM INFO_SCHEM.USAGE_PRIVILEGES

TEST:0609 PASS:0609 If count = 0 or 1?
=> unparsed: condition not read: count = 0 or 1
```

```sql
SELECT CHAR_SET_CAT, CHAR_SET_SCHEM, CHAR_SET_NAME, COLLATION_CAT, COLLATION_SCHEM, COLLATION_NAME, DOMAIN_CAT, DOMAIN_SCHEM, DOMAIN_NAME, INTERVAL_TYPE, INTERVAL_PREC FROM INFO_SCHEM.COLUMNS WHERE TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'USIG' AND COLUMN_NAME = 'C1'

TEST:0609 PASS:0609 If successful completion? OR WARNING: string data, right truncation?
=> unparsed: condition not read: OR right truncation
```

```sql
SELECT COUNT(*) FROM INFO_SCHEM.USAGE_PRIVILEGES WHERE IS_GRANTABLE IS NULL

TEST:0609 PASS:0609 If count = 0?
=> expected count 0, got error: undefined is not an object (evaluating 'alasql.databases[fr.databaseid || databaseid].tables')
```

#### ☓ Ran 23 checks in 1 tests

* 19 failed
* 4 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 154/339 `nist/sql/mpa010a.sql` (FLATER)

#### ★ Ran 0 checks in 0 tests

* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 155/339 `nist/sql/ist003.sql` (FLATER)

#### ☓ Ran 14 checks in 1 tests

* 11 failed
* 2 not read (condition text the runner does not understand)
* 8% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 156/339 `nist/sql/dml154.sql` (FLATER)

```sql
SELECT * FROM TRANSIENT ORDER BY WINDOW_ID

TEST:0854 PASS:0854 If 2 rows are selected with the following order? window_id ========= If 1 ? If 2 ?
=> expected If     1      ? | If     2      ?, got 1 | 2
```

```sql
DROP TABLE TRANSIENT CASCADE

TEST:0854 PASS:0854 If table dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 5 checks in 2 tests

* 4 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 157/339 `nist/sql/dml134.sql` (FLATER)

```sql
CREATE VIEW GAPS AS SELECT * FROM PORGRAM AS OUTERR WHERE NOT EXISTS (SELECT * FROM PORGRAM AS INNERR WHERE OUTERR.STARTS + OUTERR.LASTS = INNERR.STARTS)

TEST:0690 PASS:0690 If view is created?
=> expected success, got error: Table does not exist: PORGRAM
```

```sql
INSERT INTO PORGRAM VALUES ( 10, TIME '12:55:00', CAST ('03:00' AS INTERVAL MINUTE TO SECOND), 'Stupid commercials')

TEST:0690 PASS:0690 If 1 row is inserted?
=> expected 1 rows inserted, got error: Parse error on line 2: ...VALUES ( 10, TIME '12:55:00', CAST ( ----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'REGE…
```

```sql
SELECT COUNT(*) FROM GAPS

TEST:0690 PASS:0690 If count = 0?
=> expected count 0, got error: Table does not exist: GAPS
```

```sql
SELECT SEGNO FROM PORGRAM ORDER BY STARTS

TEST:0690 PASS:0690 If 13 rows selected with SEGNO in the following order? 1 2 7 4 5 6 3 8 9 10 11 12 13
=> expected rows, got error: Table does not exist: PORGRAM
```

```sql
SELECT SEGNO FROM GAPS

TEST:0690 PASS:0690 If 1 row selected and SEGNO = 10?
=> expected 1 rows selected, got error: Table does not exist: GAPS
```

#### ☓ Ran 66 checks in 3 tests

* 33 failed
* 2 not read (condition text the runner does not understand)
* 48% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 158/339 `nist/sql/ist005.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFO_SCHEM.TABLE_PRIVILEGES A, INFO_SCHEM.TABLE_PRIVILEGES B WHERE A.GRANTOR = B.GRANTOR AND A.GRANTEE = B.GRANTEE AND A.TABLE_SCHEM = B.TABLE_SCHEM AND A.TABLE_NAME = B.TABLE_NAME AND A.PRIVILEGE_TYPE = B.PRIVILEGE_TYPE

TEST:0607 PASS:0607 If count is same as that of previous statement?
=> unparsed: condition not read: count is same as that of previous statement
```

```sql
SELECT COUNT(*) FROM INFO_SCHEM.TABLE_PRIVILEGES A WHERE EXISTS ( SELECT * FROM INFO_SCHEM.TABLES B WHERE A.TABLE_SCHEM = B.TABLE_SCHEM AND A.TABLE_NAME = B.TABLE_NAME)

TEST:0607 PASS:0607 If count > 5?
=> unparsed: condition not read: count > 5
```

#### ☓ Ran 19 checks in 1 tests

* 17 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 159/339 `nist/sql/mpb010c.sql` (HU)

```sql
SELECT COUNT(*) FROM FLATER.GRANT010

TEST:0627 PASS:0627 If count = 1?
=> expected count 1, got error: Table does not exist: GRANT010
```

```sql
UPDATE FLATER.GRANT010 SET C1 = 0

TEST:0627 PASS:0627 If 2 rows are updated?
=> expected 2 rows updated, got error: undefined is not an object (evaluating 'alasql.databases[databaseid].tables[tableid].onupdatefns')
```

```sql
DELETE FROM FLATER.GRANT010

TEST:0627 PASS:0627 If 2 rows are deleted?
=> expected 2 rows deleted, got error: undefined is not an object (evaluating 'table.dirty = !0')
```

#### ☓ Ran 8 checks in 1 tests

* 8 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 160/339 `nist/sql/ist004.sql` (FLATER)

#### ☓ Ran 5 checks in 1 tests

* 5 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 161/339 `nist/sql/mpb010d.sql` (HU)

#### ☓ Ran 4 checks in 1 tests

* 1 failed
* 75% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 162/339 `nist/sql/mpa010e.sql` (FLATER)

#### ★ Ran 0 checks in 0 tests

* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 163/339 `nist/sql/ist006.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFO_SCHEM.COLUMN_PRIVILEGES WHERE GRANTOR = 'FLATER' AND GRANTEE = 'SCHANZLE' AND IS_GRANTABLE = 'NO' AND TABLE_SCHEM = 'FLATER' AND TABLE_NAME = 'WCOV' AND COLUMN_NAME = 'C1' AND PRIVILEGE_TYPE = 'INSERT'

TEST:0608 PASS:0608 If count = 1?
=> expected count 1, got error: undefined is not an object (evaluating 'alasql.databases[fr.databaseid || databaseid].tables')
```

#### ☓ Ran 16 checks in 1 tests

* 15 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 164/339 `nist/sql/mpa010f.sql` (FLATER)

#### ★ Ran 0 checks in 0 tests

* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 165/339 `nist/sql/mpb010a.sql` (HU)

#### ★ Ran 4 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 166/339 `nist/sql/mpa010g.sql` (FLATER)

#### ★ Ran 0 checks in 0 tests

* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 167/339 `nist/sql/mpa010b.sql` (FLATER)

#### ★ Ran 0 checks in 0 tests

* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 168/339 `nist/sql/mpb010b.sql` (HU)

#### ☓ Ran 4 checks in 1 tests

* 1 failed
* 75% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 169/339 `nist/sql/xts700.sql` (CTS1)

```sql
SELECT SALARY, EMPNAME, HOURS, CITY FROM CTS1.STAFFb WHERE NULLIF(SALARY,HOURS) IS NULL ORDER BY EMPNAME

TEST:7001 PASS:7001 If 2 rows are selected with the following order? SALARY EMPNAME HOURS CITY ====== ======= ===== ==== 10000 Kilroy 10000 Athens? NULL Nickos NULL Rhodes?
=> expected ======  =======  =====  ==== | 10000   Kilroy   10000  Athens? | NULL    Nickos   NULL   Rhodes?, got 10000 'Kilroy' 10000 'Athens' | NULL 'Nickos' NULL 'Rhodes'
```

```sql
SELECT SALARY,PNUM,HOURS,NULLIF(EMPNAME,CITY) FROM CTS1.STAFFb WHERE EMPNAME = CITY OR EMPNAME IS NULL ORDER BY PNUM

TEST:7001 PASS:7001 If 2 rows are selected with the following order? SALARY PNUM HOURS NULLIF(EMPNAME,CITY) ====== ==== ===== ==================== 15000 P6 20000 NULL? 10005 P8 30000 NULL?
=> expected ======   ====   =====  ==================== | 15000    P6     20000  NULL? | 10005    P8     30000  NULL?, got 15000 'P6' 20000 NULL | 10005 'P8' 30000 NULL
```

```sql
SELECT SUM(NULLIF(NULLIF(SALARY,10000),20000)) FROM STAFFb

TEST:7001 PASS:7001 If SUM = 195016?
=> unresolved: no column SUM in SUM(NULLIF(NULLIF(SALARY,10000),20000))
```

#### ☓ Ran 9 checks in 1 tests

* 2 failed
* 1 not resolved (the condition names a column the result does not have)
* 75% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 170/339 `nist/sql/xts701.sql` (CTS1)

```sql
SELECT NUM6 FROM T4 WHERE NUM6 = 2 AND STR110 <= 'Second character ' 'literal.'

TEST:7004 PASS:7004 If NUM6 = 2?
=> expected NUM6 = 2, got error: Parse error on line 4: ...haracter ' 'literal.' ----------------------^ Expecting 'EOF', 'WITH', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'ORDER', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'O…
```

```sql
SELECT COUNT(*) FROM T4 WHERE STR110 < 'An indifferent' ' charac' 'ter literal.'

TEST:7004 PASS:7004 If sum of this COUNT and the next COUNT = 3?
=> unparsed: condition not read: sum of this COUNT
```

```sql
INSERT INTO T4 VALUES('This is a comp' 'ound character literal,' ' in the second table row.',12,NULL,NULL)

TEST:7005 PASS:7005 If 1 row inserted successfully?
=> expected success, got error: Parse error on line 2: ...is a comp' 'ound character lite... ----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'REGEXP', 'TILD…
```

```sql
SELECT STR110, COL4 FROM T4 WHERE NUM6 = 11

TEST:7005 PASS:7005 If STR110 = 'This is the first fragment of a compound character literal, and this is the second part.'? If COL4 = 'Compound literal.'?
=> unparsed: condition not read: STR110 = 'This is the first fragment of a compound character literal
```

```sql
SELECT STR110 FROM T4 WHERE NUM6 = 12

TEST:7005 PASS:7005 If STR110 = 'This is a compound character literal, in the second table row.'?
=> unparsed: condition not read: STR110 = 'This is a compound character literal
```

```sql
SELECT 'First fragment of a compound character literal, ' 'and second part.', 'This is the first fragment of a compound character literal,' ' this is the second,' ' and this is the third part.' FROM CTS1.ECCO

TEST:7006 PASS:7006 If 1st value = 'First fragment of a compound character literal, and second part.'? If 2nd value = 'This is the first fragment of a compound character literal, this is the second, and this is the third part.'?
=> unparsed: condition not read: 1st value = 'First fragment of a compound character literal
```

#### ☓ Ran 20 checks in 3 tests

* 11 failed
* 6 not read (condition text the runner does not understand)
* 21% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 171/339 `nist/sql/xts702.sql` (CTS1)

#### ☓ Ran 11 checks in 3 tests

* 2 failed
* 81% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 172/339 `nist/sql/xts703.sql` (CTS1)

```sql
SELECT EMPNUM, GRADE FROM STAFF X WHERE (UNIQUE(SELECT GRADE FROM STAFF Y WHERE X.GRADE = Y.GRADE))

TEST:7011 PASS:7011 If EMPNUM = E2? If GRADE = 10?
=> expected EMPNUM = E2, got error: Parse error on line 2: ...F X WHERE (UNIQUE(SELECT GRADE ----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'LPAR', 'SEARCH', 'NUMBER', 'STRING', 'SHARP', 'DOLLAR', 'AT', 'VALUE', 'COLON', 'NOT', 'IF', 'PLUS', 'STAR', 'QU…
```

#### ☓ Ran 9 checks in 3 tests

* 9 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 173/339 `nist/sql/xts716.sql` (CTS1)

#### ☓ Ran 5 checks in 1 tests

* 2 failed
* 60% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 174/339 `nist/sql/xts717.sql` (CTS1)

#### ☓ Ran 6 checks in 1 tests

* 1 failed
* 83% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 175/339 `nist/sql/xts718.sql` (CTS1)

```sql
SET SESSION AUTHORIZATION 'CTS2'

TEST:7018 PASS:7018 If statement executed successfully without ERRORs?
=> expected success, got error: Parse error on line 1: SET SESSION AUTHORIZATION 'CTS2' ------------^ Expecting 'ARROW', 'DOT', 'EQ', 'ON', 'OFF', got 'LITERAL'
```

#### ☓ Ran 8 checks in 1 tests

* 3 failed
* 62% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 176/339 `nist/sql/xts727.sql` (CTS1)

```sql
SELECT NUM_C1,CH_C1,NUM_C2,CH_C2 FROM TEST6840C WHERE NUM_C1 = 1001

TEST:7027 PASS:7027 If values = 1001, MARIA, 4001, RHODES?
=> unparsed: condition not read: MARIA
```

```sql
SELECT NUM_C1,CH_C1,NUM_C2,CH_C2 FROM TEST6840C WHERE NUM_C1 = 1002

TEST:7027 PASS:7027 If values = 1002, MAKIS, 4002, HANIA?
=> unparsed: condition not read: MAKIS
```

```sql
SELECT NUM_C1,CH_C1,NUM_C2,CH_C2 FROM TEST6840C WHERE NUM_C1 = 1003

TEST:7027 PASS:7027 If values = 1003, GEORGE, 4003, ARTA?
=> unparsed: condition not read: GEORGE
```

```sql
SELECT NUM_C1,CH_C1,NUM_C2,CH_C2 FROM TEST6840C WHERE NUM_C1 = 1004

TEST:7027 PASS:7027 If values = 1004, MORRIS, 4004, PARGA?
=> unparsed: condition not read: MORRIS
```

#### ☓ Ran 7 checks in 1 tests

* 2 failed
* 5 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 177/339 `nist/sql/mpa010c.sql` (FLATER)

#### ★ Ran 0 checks in 0 tests

* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 178/339 `nist/sql/xts728.sql` (CTS1)

```sql
SELECT COL_1,COL_2 FROM CTS1.TABLE728b WHERE COL_1 = 'NICKOS' AND COL_2 = 'GEORGE'

TEST:7028 PASS:7028 If COL_1 = NICKOS and COL_2 = GEORGE?
=> expected COL_1 = NICKOS, got no rows
```

```sql
SELECT COL_1,COL_2 FROM CTS1.TABLE728b WHERE COL_1 = 'HARRY' AND COL_2 = 'TANIA'

TEST:7028 PASS:7028 If COL_1 = HARRY and COL_2 = TANIA?
=> expected COL_1 = HARRY, got no rows
```

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 179/339 `nist/sql/xts730.sql` (CTS1)

```sql
DROP TABLE "LONGIDENTIFIERSAAAA" CASCADE

TEST:7030 PASS:7030 If table dropped successfully?
=> expected success, got error: Parse error on line 1: DROP TABLE "LONGIDENTIFIERSAAAA... -----------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'IF', got 'STRING'
```

#### ☓ Ran 12 checks in 1 tests

* 12 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 180/339 `nist/sql/mpa010d.sql` (FLATER)

#### ★ Ran 0 checks in 0 tests

* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 181/339 `nist/sql/mpb010e.sql` (HU)

#### ★ Ran 4 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 182/339 `nist/sql/mpb010f.sql` (HU)

```sql
SELECT COUNT(*) FROM FLATER.X WHERE A = 0 AND B = 2 AND C = 0 AND D = 0

TEST:0560 PASS:0560 If count = 1?
=> expected count 1, got error: Table does not exist: X
```

#### ☓ Ran 5 checks in 1 tests

* 4 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 183/339 `nist/sql/xts733.sql` (CTS1)

```sql
SELECT * FROM TEST6840A FULL OUTER JOIN TEST6840B ON NUM_A = NUM_B ORDER BY NUM_A

TEST:7033 PASS:7033 If 3 rows selected in one of the following orders? c1 c2 c3 c4 c1 c2 c3 c4 === === === === === === === === If 1 A NULL NULL? or NULL NULL 3 A ? If 2 B 2 C ? or 1 A NULL NULL? If NULL NULL 3 A ? or 2 B 2 C ?
=> expected ===  ===  ===   ===          ===  ===  ===   === | If    1    A   NULL  NULL?   or   NULL  NULL  3     A  ? | If    2    B    2     C  ?   or    1     A   NULL  NULL? | If   NULL NULL  3     A  ?   or    2     B    2     C  ?, got NULL NULL 3 'A' | 1 'A' NULL NULL | 2 'B' 2 'C'
```

```sql
SELECT * FROM (TEST6840B FULL JOIN TEST6840A AS CN1 ON TEST6840B.CH_B = CN1.CH_A) FULL JOIN TEST6840A AS CN2 ON TEST6840B.NUM_B = CN2.NUM_A ORDER BY TEST6840B.NUM_B, CN1.NUM_A

TEST:7033 PASS:7033 If nulls first? ==== ==== ==== ==== ==== ==== If NULL NULL NULL NULL 1 A ? If NULL NULL 2 B NULL NULL? If 2 C NULL NULL 2 B ? If 3 A 1 A NULL NULL?
=> unparsed: condition not read: nulls first ====    ====   ====   ====   ====    ====
```

#### ☓ Ran 17 checks in 1 tests

* 9 failed
* 1 not read (condition text the runner does not understand)
* 43% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 184/339 `nist/sql/xts735.sql` (CTS1)

```sql
SELECT C1,C2 FROM CTS1.TAB735 ORDER BY C1

TEST:7035 PASS:7035 If 3 rows are selected with the following order? c1 c2 ---- ---- If 1 NULL? If 2 ! ? If 3 ! ?
=> expected ----    ---- | If    1      NULL? | If    2       !  ? | If    3       !  ?, got 1 NULL | 2 '!' | 3 '  !'
```

```sql
DROP TABLE TAB735 CASCADE

TEST:7035 PASS:7035 If table dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 6 checks in 1 tests

* 2 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 185/339 `nist/sql/xts734.sql` (CTS1)

#### ☓ Ran 7 checks in 1 tests

* 4 failed
* 42% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 186/339 `nist/sql/xts740.sql` (CTS1)

#### ☓ Ran 17 checks in 1 tests

* 9 failed
* 47% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 187/339 `nist/sql/xts741.sql` (CTS1)

```sql
SELECT COUNT(ALL NULLIF ('Nickos','Nickos ')) FROM EMPTY740

TEST:7041 PASS:7041 If COUNT = 0 and ? WARNING - null value eliminated in set function ?
=> expected count 0, got NULL
```

#### ☓ Ran 14 checks in 1 tests

* 12 failed
* 14% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 188/339 `nist/sql/xts742.sql` (CTS1)

```sql
SELECT COUNT(ALL 115.5), COUNT(ALL 'ATHINA'), COUNT(ALL 255), COUNT(*) FROM CL_DATA_TYPE

TEST:7042 PASS:7042 If COUNTs are 6, 6, 6, 6?
=> unparsed: condition not read: COUNTs are 6
```

#### ★ Ran 6 checks in 1 tests

* 3 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 189/339 `nist/sql/xts744.sql` (CTS1)

```sql
SELECT CHARACTER_SET_SCHEMA, CHARACTER_SET_NAME,NUMBER_OF_CHARACTERS,CHARACTER_SET_CATALOG, DEFAULT_COLLATE_CATALOG, DEFAULT_COLLATE_SCHEMA, DEFAULT_COLLATE_NAME FROM INFORMATION_SCHEMA.CHARACTER_SETS WHERE CHARACTER_SET_SCHEMA = 'INFORMATION_SCHEMA' AND CHARACTER_SET_NAME = 'SQL_CHARACTER'

TEST:7044 PASS:7044 If CHARACTER_SET_SCHEMA = INFORMATION SCHEMA? If CHARACTER_SET_NAME = SQL_CHARACTER? If NUMBER_OF_CHARACTERS = 83? If CHARACTER_SET_CATALOG not NULL? If DEFAULT_COLLATE_CATALOG not NULL? If DEFAULT_COLLATE_SCHEMA not NULL? If DEFAULT_COLLATE_NAME not NULL?
=> unparsed: condition not read: CHARACTER_SET_CATALOG not NULL
```

#### ★ Ran 1 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 190/339 `nist/sql/xts745.sql` (CTS1)

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.CHARACTER_SETS WHERE CHARACTER_SET_SCHEMA = 'INFORMATION_SCHEMA' AND CHARACTER_SET_NAME = 'ASCII_GRAPHIC' AND NUMBER_OF_CHARACTERS = 95 AND CHARACTER_SET_CATALOG IS NOT NULL AND DEFAULT_COLLATE_CATALOG IS NOT NULL AND DEFAULT_COLLATE_SCHEMA IS NOT NULL AND DE…

TEST:7045 PASS:7045 If COUNT = 1?
=> expected count 1, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 191/339 `nist/sql/xts746.sql` (CTS1)

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 192/339 `nist/sql/xts747.sql` (CTS1)

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 193/339 `nist/sql/xts748.sql` (CTS1)

```sql
SELECT CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = 'T12549PC' AND TABLE_SCHEMA = 'T12549PC' ORDER BY CONSTRAINT_NAME

TEST:7048 PASS:7048 If 3 rows are selected in the following order? cname tname ctype ===== ===== ===== If CND12549A TEST12549 CHECK? If CND12549B TEST12549 UNIQUE? If CND12549C TEST12549 CHECK?
=> expected rows, got error: Unknown INFORMATION_SCHEMA table
```

```sql
DROP SCHEMA DT12549PC CASCADE

TEST:7048 PASS:7048 If schema dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 8 checks in 1 tests

* 8 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 194/339 `nist/sql/dml158.sql` (HU)

```sql
DELETE FROM WORKS WHERE EXISTS (SELECT * FROM PROJ JOIN STAFF ON PROJ.CITY <> STAFF.CITY AND EMPNUM = WORKS.EMPNUM AND PNUM = WORKS.PNUM)

TEST:0857 PASS:0857 If delete completed successfully?
=> expected success, got error: undefined is not an object (evaluating 'p['WORKS']['EMPNUM']')
```

```sql
SELECT EMPNUM, PNUM FROM WORKS ORDER BY EMPNUM, PNUM

TEST:0857 PASS:0857 If 6 rows are returned in the following order? empnum pnum ====== ==== If E1 P1 ? If E1 P4 ? If E1 P6 ? If E2 P2 ? If E3 P2 ? If E4 P4 ?
=> expected ======    ==== | If    E1        P1  ? | If    E1        P4  ? | If    E1        P6  ? | If    E2        P2  ? | If    E3        P2  ? | If    E4        P4  ?, got 'E1' 'P1' | 'E1' 'P2' | 'E1' 'P3' | 'E1' 'P4' | 'E1' 'P5' | 'E1' 'P6' | 'E2' 'P1' | 'E2' 'P2' | 'E3' 'P2' | 'E4' 'P2' | 'E4' '…
```

```sql
SELECT EMPNUM, SUM (HOURS) FROM WORKS OWORKS GROUP BY EMPNUM HAVING EMPNUM IN ( SELECT WORKS.EMPNUM FROM WORKS JOIN STAFF ON WORKS.EMPNUM = STAFF.EMPNUM AND HOURS < SUM (OWORKS.HOURS) / 3 AND GRADE > 10) ORDER BY EMPNUM

TEST:0857 PASS:0857 If 2 rows are returned in the following order? empnum sum(hours) ====== ========== If E1 184 ? If E4 140 ?
=> expected rows, got error: g is not defined
```

#### ☓ Ran 4 checks in 1 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 195/339 `nist/sql/xts750.sql` (CTS1)

```sql
SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = 'CTS1' AND DOMAIN_SCHEMA = 'CTS1' AND DOMAIN_NAME = 'D12749'

TEST:7050 PASS:7050 If cname = CND12749?
=> expected cname = CND12749, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 4 checks in 1 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 196/339 `nist/sql/xts732.sql` (CTS1)

```sql
SELECT * FROM TEST6740A NATURAL FULL JOIN TEST6740B FOR READ ONLY

TEST:7032 PASS:7032 If 1 AA NULL?
=> unparsed: condition not read: 1   AA   NULL
```

```sql
SELECT * FROM TEST6740B NATURAL FULL JOIN TEST6740A FOR READ ONLY

TEST:7032 PASS:7032 If 1 NULL AA?
=> unparsed: condition not read: 1   NULL   AA
```

```sql
SELECT * FROM TESTV6740 ORDER BY VNUM1

TEST:7032 PASS:7032 If 2 rows selected in following order? c1 c2 c3 c4 == == == == If 6 PP 1 AA? If 7 QQ 1 AA?
=> expected rows, got error: Table does not exist: TESTV6740
```

#### ☓ Ran 17 checks in 1 tests

* 6 failed
* 2 not read (condition text the runner does not understand)
* 60% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 197/339 `nist/sql/xts729.sql` (CTS1)

```sql
SELECT * FROM CTS1.TESTB6439 ORDER BY cOlUmNoFNUMERIC123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_0

TEST:7029 PASS:7029 If 5 rows selected in the following order? === === === === If AA BB 1 2? If CC DD 3 4? If EE FF 5 6? If GG HH 7 8? If II KK 9 0?
=> expected If      AA   BB   1   2? | If      CC   DD   3   4? | If      EE   FF   5   6? | If      GG   HH   7   8? | If      II   KK   9   0?, got 'AA' 'BB' 1 2 | 'CC' 'DD' 3 4 | 'EE' 'FF' 5 6 | 'GG' 'HH' 7 8 | 'II' 'KK' 9 0
```

```sql
SELECT COLUMN_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'TESTB6439' ORDER BY ORDINAL_POSITION

TEST:7029 PASS:7029 If r1,c1 = COLUMNOFCHARACTERDATATYPE12345678901234567890 1234567890123456789012345678901234567890 1234567890123456789012345678901234567890123? If row1,col2 = 1? If r2,c1 = COLUMNOFCHARACTERDATATYPE12345678901234567890 1234567890123456789012345678901234567890 1234567890123456789012345678901234567890…
=> unparsed: condition not read: r1
```

```sql
SELECT * FROM CTS1.TESTB6439 WHERE COLUMNOFCHARACTERDATATYPE123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012C = 'ADD'

TEST:7029 PASS:7029 If 5 values = TTT TTT 100 100 ADD?
=> unparsed: condition not read: 5 values =  TTT  TTT  100  100  ADD
```

```sql
SELECT * FROM CTS1.TESTC6439 ORDER BY COLUMNOFCHARACTERSA

TEST:7029 PASS:7029 If 3 rows selected in the following order? === === If aaa bbb? If ccc ddd? If eee fff?
=> expected If    aaa    bbb? | If    ccc    ddd? | If    eee    fff?, got 'aaa' 'bbb' | 'ccc' 'ddd' | 'eee' 'fff'
```

#### ☓ Ran 23 checks in 1 tests

* 6 failed
* 2 not read (condition text the runner does not understand)
* 71% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 198/339 `nist/sql/dml147.sql` (FLATER)

```sql
SELECT EMPNUM FROM HU.STAFF3 NATURAL LEFT JOIN HU.STAFF NATURAL INNER JOIN HU.STAFF4 ORDER BY EMPNUM DESC

TEST:0841 PASS:0841 If 2 rows selected? If ordered EMPNUM values are: E5, E4 ?
=> unparsed: condition not read: ordered EMPNUM values are: E5
```

```sql
SELECT EMPNUM, CITY, SALARY FROM HU.STAFF3 LEFT JOIN STAFF66 USING (EMPNUM) UNION SELECT EMPNUM, CITY, SALARY FROM HU.STAFF3 RIGHT JOIN STAFF66 USING (EMPNUM) ORDER BY EMPNUM

TEST:0842 PASS:0842 If 6 rows selected with ordered rows and column values ? E1 Deale NULL ? E2 Vienna NULL ? E3 Vienna 13000 ? E4 Deale 12000 ? E5 NULL 13000 ? E6 Akron NULL ?
=> expected E2   Vienna  NULL   ? | E3   Vienna  13000  ? | E4   Deale   12000  ? | E5   NULL    13000  ? | E6   Akron   NULL   ?, got 'E1' 'Deale' NULL | 'E2' 'Vienna' NULL | 'E3' 'Vienna' NULL | 'E4' 'Deale' NULL | 'E5' NULL NULL | 'E6' 'Akron' NULL
```

```sql
SELECT * FROM STAFF66 NATURAL INNER JOIN HU.STAFF3

TEST:0842 PASS:0842 If 1 row selected? If column values are in the exact order: ? EMPNAME=Carmen,GRADE=13,EMPNUM=E3,SALARY=13000,CITY=Vienna?
=> unparsed: condition not read: column values are in the exact order:  EMPNAME=Carmen
```

```sql
SELECT EMPNUM, EMPNAME, SALARY FROM HU.STAFF3 NATURAL LEFT OUTER JOIN STAFF66 WHERE EMPNUM > 'E1' ORDER BY EMPNUM ASC

TEST:0842 PASS:0842 If 4 rows selected with ordered rows and column values ? E2 Betty NULL ? E3 Carmen 13000 ? E4 Ali NULL ? E6 Ed NULL ?
=> expected rows, got error: Cannot resolve column "EMPNUM" because it exists in two source tables
```

#### ☓ Ran 23 checks in 3 tests

* 8 failed
* 4 not read (condition text the runner does not understand)
* 57% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 199/339 `nist/sql/xts736.sql` (CTS1)

```sql
INSERT INTO TAB736 VALUES(1,DEFAULT,DEFAULT,N'ATHENS')

TEST:7036 PASS:7036 If 1 row inserted successfully?
=> expected success, got error: Parse error on line 1: ...NTO TAB736 VALUES(1,DEFAULT,DEFAULT,N'AT -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'LPAR', 'NUMBER', 'STRING', 'SHARP', 'DOLLAR', 'AT', 'VALUE', 'COLON', 'NOT', 'IF', 'PLUS', 'STAR', 'QUEST…
```

```sql
SELECT COLK,COL1,COL2,COL3 FROM TAB736 ORDER BY COLK DESC

TEST:7036 PASS:7036 If 2 rows selected in the following order? colk col1 col2 col3 ==== ==== ==== ==== If 2 KILLER HELLAS NEW YORK? If 1 KILLER HELLAS ATHENS ?
=> expected ====     ====     ====     ==== | If     2       KILLER   HELLAS   NEW YORK? | If     1       KILLER   HELLAS   ATHENS  ?, got 
```

#### ☓ Ran 12 checks in 1 tests

* 11 failed
* 8% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 200/339 `nist/sql/xts731.sql` (CTS1)

```sql
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'CTS1' AND (TABLE_NAME = 'LONGIDENTIFIERSAAAAABBBBBBBBBBCCCCCCCCCCDDDDDDDDDDEEEEEEEEEEFFFFFFFFFFGGGGGGGGGGHHHHHHHHHHIIIIIIIIIIJJJJJJJJJJKKKKKKKKKKAAAAAAAA' OR TABLE_NAME = 'longidentifiersaaaaabbbbbbbbbbccccccccccddddddddddeeeeeee…

TEST:7031 PASS:7031 If TABLE_NAME = '0"LONGIDENTIFIERSWWWAAAAAAAAAABBBBBBBBBB CCCCCCCCCCDDDDDDDDDDEEEEEEEEEEFFFFFFFFFF GGGGGGGGGGHHHHHHHHHHIIIIIIIIIIJJJJJJJJJJWWWWWW_1'? If TABLE_NAME = '0"LONGIDENTIFIERSWWWAAAAAAAAAABBBBBBBBBB CCCCCCCCCCDDDDDDDDDDEEEEEEEEEEFFFFFFFFFF GGGGGGGGGGHHHHHHHHHHIIIIIIIIIIJJJJJJJJJJWWWWWW_2'?…
=> unparsed: condition not read: TABLE_NAME = 'longIDENTIFIERSWWWWWAAAAAAAAAABBBBBBBBBB CCCCCCCCCCDDDDDDDDDDEEEEEEEEEEFFFFFFFFFF GGGGGGGGGGHHHHHHHHHHIIIIIIIIIIJJJJJJJJJJWW% .
```

```sql
CREATE VIEW "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ""69W" (MYCOUNT) AS SELECT COUNT (*) FROM WORKS

TEST:7031 PASS:7031 If view created successfully?
=> expected success, got error: Parse error on line 1: CREATE VIEW"ZZZZZZZZZZZZZZZZZZZ... -----------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'IF', got 'STRING'
```

```sql
SELECT * FROM "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ""69W"

TEST:7031 PASS:7031 If MYCOUNT = 12?
=> expected MYCOUNT = 12, got error: Unknown string in FROM clause
```

#### ☓ Ran 22 checks in 1 tests

* 17 failed
* 1 not read (condition text the runner does not understand)
* 19% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 201/339 `nist/sql/xts749.sql` (CTS1)

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 202/339 `nist/sql/xts752.sql` (CTS1)

#### ☓ Ran 10 checks in 1 tests

* 8 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 203/339 `nist/sql/xts754.sql` (CTS1)

```sql
INSERT INTO TAB754 VALUES(1000,766,1990)

TEST:7054 PASS:7054 If 1 row inserted successfully?
=> expected success, got error: The number of values (3) does not match the number of table columns (2). If using a subquery, use INSERT INTO ... SELECT instead of INSERT INTO ... VALUES (SELECT ...)
```

#### ☓ Ran 9 checks in 1 tests

* 6 failed
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 204/339 `nist/sql/xts753.sql` (CTS1)

```sql
SELECT COL1,COL2,COL3,COL4,COL5 FROM TAB753 ORDER BY COL1

TEST:7053 PASS:7053 If 2 rows are selected in the following order? col1 col2 col3 col4 col5 ==== ==== ==== ==== ==== If 1000 PHONE NICKOS 12000 blue? If 1001 HULME CHEADLE 12001 velvet?
=> expected ====   ====    ====    ====     ==== | If  1000   PHONE   NICKOS  12000    blue? | If  1001   HULME   CHEADLE 12001    velvet?, got 1000 'PHONE' 'NICKOS' 12000 'blue' | 1001 'HULME' 'CHEADLE' 12001 'velvet'
```

#### ☓ Ran 9 checks in 1 tests

* 4 failed
* 55% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 205/339 `nist/sql/xts760.sql` (CTS1)

#### ☓ Ran 3 checks in 1 tests

* 1 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 206/339 `nist/sql/xts761.sql` (CTS1)

```sql
SELECT COUNT(*) FROM TABCS WHERE COLSTR1 = COLSTR2

TEST:7061 PASS:7061 If COUNT = 0?
=> expected count 0, got error: Table does not exist: TABCS
```

#### ☓ Ran 4 checks in 1 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 207/339 `nist/sql/xts756.sql` (CTS1)

#### ☓ Ran 13 checks in 1 tests

* 7 failed
* 46% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 208/339 `nist/sql/xts766.sql` (CTS1)

```sql
SELECT GRANTOR, GRANTEE, OBJECT_SCHEMA, OBJECT_NAME, OBJECT_TYPE FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES WHERE OBJECT_TYPE = 'CHARACTER SET' AND OBJECT_NAME = 'TESTSET'

TEST:7066 PASS:7066 If GRANTOR = _SYSTEM? If GRANTEE = CTS1? If OBJECT_SCHEMA = CTS1? If OBJECT_NAME = TESTSET? If OBJECT_TYPE = CHARACTER SET?
=> unparsed: condition not read: GRANTOR = _SYSTEM
```

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 209/339 `nist/sql/xts762.sql` (CTS1)

#### ☓ Ran 2 checks in 1 tests

* 2 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 210/339 `nist/sql/xts798.sql` (CTS1)

```sql
SELECT EMPNAME, NULLIF (SALARY,HOURS) FROM CTS1.STAFFb WHERE SEX = 'M' AND PNUM NOT IN ('P1','P2','P3','P6','P8') AND (SALARY <> HOURS OR SALARY IS NULL OR HOURS IS NULL) ORDER BY PNUM

TEST:7002 PASS:7002 If 3 rows selected in the following order? EMPNAME SALARY ======= ====== If Nickos NULL ? If George 10010 ? If Gregory 10001 ?
=> expected =======          ====== | If   Nickos           NULL   ? | If   George           10010  ? | If   Gregory          10001  ?, got 'Nickos' NULL | 'George' 10010 | 'Gregory' 10001
```

```sql
SELECT NULLIF (EMPNAME,CITY), SALARY FROM CTS1.STAFFb WHERE SEX = 'M' AND PNUM NOT IN ('P1','P2','P3','P5','P7') AND (EMPNAME <> CITY OR EMPNAME IS NULL OR CITY IS NULL) ORDER BY PNUM

TEST:7002 PASS:7002 If 3 row selected in the following order? EMPNAME SALARY ======= ====== If Kilroy 10000 ? If NULL 10005 ? If Gregory 10001 ?
=> expected =======           ====== | If   Kilroy            10000  ? | If   NULL              10005  ? | If   Gregory           10001  ?, got 'Kilroy' 10000 | NULL 10005 | 'Gregory' 10001
```

```sql
SELECT * FROM CTS1.TEMP1426 ORDER BY EMPNAME

TEST:7002 PASS:7002 If 3 rows selected in the following order? EMPNAME SALARY ======= ====== If George 10000 ? If Kilroy NULL ? If Nickos 10000 ?
=> expected =======        ====== | If     George         10000  ? | If     Kilroy         NULL   ? | If     Nickos         10000  ?, got NULL 'George' | NULL 'Kilroy' | NULL 'Nickos'
```

#### ☓ Ran 18 checks in 1 tests

* 5 failed
* 72% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 211/339 `nist/sql/xts755.sql` (CTS1)

#### ☓ Ran 7 checks in 1 tests

* 4 failed
* 42% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 212/339 `nist/sql/xts765.sql` (CTS1)

```sql
SELECT TABLE_NAME, COLUMN_NAME, CHARACTER_SET_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = 'COLCH1'

TEST:7065 PASS:7065 If TABLE_NAME = TEMP765A? If COLUMN_NAME = COLCH1? If CHARACTER_SET_NAME = CS? If ORDINAL_POSITION = 1?
=> expected TABLE_NAME = TEMP765A, got error: Parse error on line 3: ... INFORMATION_SCHEMA.COLUMNS WHE -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

```sql
SELECT TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = 'COLN'

TEST:7065 PASS:7065 If TABLE_NAME = TEMP765A? If COLUMN_NAME = COLN? If ORDINAL POSITION = 2?
=> unparsed: condition not read: ORDINAL POSITION = 2
```

```sql
SET SESSION AUTHORIZATION 'CTS3'

TEST:7065 PASS:7065 If statement completed successfully?
=> expected success, got error: Parse error on line 1: SET SESSION AUTHORIZATION 'CTS3' ------------^ Expecting 'ARROW', 'DOT', 'EQ', 'ON', 'OFF', got 'LITERAL'
```

```sql
SELECT TABLE_NAME, COLUMN_NAME, CHARACTER_SET_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = 'COLSTR1'

TEST:7065 PASS:7065 If TABLE_NAME = TEMP765B? If COLUMN_NAME = COLSTR1? If CHARACTER_SET_NAME = CS? If ORDINAL_POSITION = 1?
=> expected TABLE_NAME = TEMP765B, got error: Parse error on line 3: ... INFORMATION_SCHEMA.COLUMNS WHE -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

```sql
SELECT GRANTOR, GRANTEE, OBJECT_NAME, OBJECT_TYPE, IS_GRANTABLE FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES WHERE OBJECT_NAME = 'CS'

TEST:7065 PASS:7065 If GRANTOR = CTS1? If GRANTEE = CTS2? If OBJECT_NAME = CS? If OBJECT_TYPE = CHARACTER SET? If IS_GRANTABLE = NO?
=> expected GRANTOR = CTS1, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT TABLE_NAME, COLUMN_NAME, CHARACTER_SET_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = 'COLNIK1'

TEST:7065 PASS:7065 If TABLE_NAME = TEMP765C? If COLUMN_NAME = COLNIK1? If CHARACTER_SET_NAME = CS? If ORDINAL_POSITION = 1?
=> expected TABLE_NAME = TEMP765C, got error: Parse error on line 3: ... INFORMATION_SCHEMA.COLUMNS WHE -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

```sql
SELECT TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = 'COLNUMBER1'

TEST:7065 PASS:7065 If TABLE_NAME = TEMP765C? If COLUMN_NAME = COLNUMBER1? If ORDINAL_POSITION = 2?
=> expected TABLE_NAME = TEMP765C, got error: Parse error on line 3: ... INFORMATION_SCHEMA.COLUMNS WHE -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'COLUMN'
```

```sql
SELECT TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = 'COLNUMBER1'

TEST:7065 PASS:7065 If TABLE_NAME = TEMP765C? If COLUMN_NAME = CP;MI,BER1? If ORDINAL_POSITION = 1?
=> unparsed: condition not read: MI
```

#### ☓ Ran 40 checks in 1 tests

* 38 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 213/339 `nist/sql/xts764.sql` (CTS1)

```sql
SELECT IS_GRANTABLE FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES WHERE GRANTOR = 'CTS1' AND GRANTEE = 'CTS3' AND OBJECT_TYPE = 'CHARACTER SET' AND OBJECT_NAME = 'CS'

TEST:7064 PASS:7064 If IS_GRANTABLE is "YES"?
=> unparsed: condition not read: IS_GRANTABLE is "YES"
```

#### ☓ Ran 19 checks in 1 tests

* 16 failed
* 2 not read (condition text the runner does not understand)
* 5% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 214/339 `nist/sql/xts768.sql` (CTS1)

```sql
SELECT DEFAULT_COLLATE_SCHEMA,DEFAULT_COLLATE_NAME, CHARACTER_SET_CATALOG,DEFAULT_COLLATE_CATALOG, NUMBER_OF_CHARACTERS FROM INFORMATION_SCHEMA.CHARACTER_SETS WHERE CHARACTER_SET_SCHEMA = 'INFORMATION_SCHEMA' AND CHARACTER_SET_NAME = 'SQL_TEXT'

TEST:7068 PASS:7068 If DEFAULT_COLLATE_SCHEMA = INFORMATION_SCHEMA? If DEFAULT_COLLATE_NAME = SQL_TEXT If CHARACTER_SET_CATALOG is not NULL? If DEFAULT_COLLATE_CATALOG is not NULL? If NUMBER_OF_CHARACTERS >= 83?
=> unparsed: condition not read: NUMBER_OF_CHARACTERS >= 83
```

#### ☓ Ran 2 checks in 1 tests

* 1 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 215/339 `nist/sql/xts763.sql` (CTS1)

```sql
SELECT CHARACTER_SET_CATALOG, DEFAULT_COLLATE_CATALOG, FORM_OF_USE, NUMBER_OF_CHARACTERS FROM INFORMATION_SCHEMA.CHARACTER_SETS WHERE CHARACTER_SET_SCHEMA = 'CTS1' AND CHARACTER_SET_NAME = 'CS'

TEST:7063 PASS:7063 If 1 row is returned with 4 non-null values?
=> expected 1 rows returned, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 3 checks in 1 tests

* 3 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 216/339 `nist/sql/xts767.sql` (CTS1)

```sql
CREATE TABLE TEMP767 ( COLCH1 CHAR(10) CHARACTER SET CTS1.TESTSET, COLCH2 CHAR(5) CHARACTER SET CTS1.TESTSET)

TEST:7067 PASS:7067 If table created successfully?
=> expected success, got error: Parse error on line 2: ... ( COLCH1 CHAR(10) CHARACTER SET CTS1.T -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'NOT', 'UNIQUE', 'ON', 'NULL', 'END', 'ELSE', 'DEFAULT', 'IDENTITY', 'CHECK', 'PRIMARY', 'FOREIGN', 'REFERENCES', 'GO', 'SEMICOLON', got 'LITERAL'
```

#### ☓ Ran 12 checks in 1 tests

* 12 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 217/339 `nist/sql/yts754.sql` (CTS1)

```sql
SELECT litt1 FROM char_in_use ORDER BY numm

TEST:7504 PASS:7504 If 3 rows are selected in the following order? litt1 ===== If a? If z? If A?
=> expected If    a? | If    z? | If    A?, got 'a' | 'z' | 'A'
```

#### ☓ Ran 9 checks in 1 tests

* 4 failed
* 55% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 218/339 `nist/sql/xts799.sql` (CTS1)

```sql
SELECT EMPNUM, COALESCE(SALARY,GRADE,HOURS), COALESCE(EMPNAME,LOC,DEPTNO) FROM CTS1.CL_EMPLOYEE ORDER BY EMPNUM

TEST:7003 PASS:7003 If 5000 NULL NULL ? If 6000 4 JIM ? If 7000 150 P2 ? If 8000 30000 HALDIDA ? If 9000 15000 ANDREWS ?
=> unparsed: condition not read: 5000        NULL       NULL
```

```sql
SELECT EMPNUM, COALESCE(DEPTNO,LOC,'ATHENS'), COALESCE(SALARY,'50000',GRADE) FROM CL_EMPLOYEE WHERE EMPNUM = 5000

TEST:7003 PASS:7003 If 5000 ATHENS 50000?
=> unparsed: condition not read: 5000    ATHENS   50000
```

```sql
SELECT EMPNUM, COALESCE('NICKOS',DEPTNO,LOC), COALESCE(SALARY,GRADE,47000) FROM CL_EMPLOYEE WHERE EMPNUM = 7000

TEST:7003 PASS:7003 If 7000 NICKOS 47000?
=> unparsed: condition not read: 7000   NICKOS   47000
```

```sql
SELECT EMPNUM, COALESCE(EMPNAME,'PAGRATI',LOC), COALESCE('12000',SALARY,GRADE) FROM CL_EMPLOYEE WHERE EMPNUM = 8000

TEST:7003 PASS:7003 If 8000 PAGRATI 12000?
=> unparsed: condition not read: 8000   PAGRATI   12000
```

#### ★ Ran 11 checks in 1 tests

* 4 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 219/339 `nist/sql/yts757.sql` (CTS1)

```sql
SELECT col1, col2 FROM dom_chk

TEST:7507 PASS:7507 If col1 = "c" and col2 = 38?
=> unparsed: condition not read: col1 = "c"
```

```sql
UPDATE dom_chk SET col1 = 'q' WHERE col2 = 38

TEST:7507 PASS:7507 If ERROR - integrity constraint violation?
=> expected an error, got count 1
```

#### ☓ Ran 11 checks in 2 tests

* 7 failed
* 1 not read (condition text the runner does not understand)
* 30% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 220/339 `nist/sql/yts751.sql` (CTS1)

```sql
SELECT DOMAIN_CATALOG, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, CHARACTER_OCTET_LENGTH, COLLATION_CATALOG, COLLATION_SCHEMA, COLLATION_NAME, CHARACTER_SET_CATALOG, CHARACTER_SET_SCHEMA, CHARACTER_SET_NAME, NUMERIC_PRECISION, NUMERIC_PRECISION_RADIX, NUMERIC_SCALE, DATETIME_PRECISION, DOMAIN_DEFAULT FRO…

TEST:7501 PASS:7501 If DOMAIN_CATALOG = not NULL? If DATA_TYPE = CHARACTER? If CHARACTER_MAXIMUM_LENGTH = 10? If CHARACTER_OCTET_LENGTH = not NULL? If COLLATION_CATALOG = not NULL? If COLLATION_SCHEMA = not NULL? If COLLATION_NAME = not NULL? If CHARACTER_SET_CATALOG = not NULL? If CHARACTER_SET_SCHEMA = not NULL? If …
=> expected DOMAIN_CATALOG = not NULL, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 4 checks in 1 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 221/339 `nist/sql/yts752.sql` (CTS1)

#### ☓ Ran 11 checks in 1 tests

* 6 failed
* 45% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 222/339 `nist/sql/yts750.sql` (CTS1)

```sql
SELECT DOMAIN_CATALOG, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, CHARACTER_OCTET_LENGTH, COLLATION_CATALOG, COLLATION_SCHEMA, COLLATION_NAME, CHARACTER_SET_CATALOG, CHARACTER_SET_SCHEMA, CHARACTER_SET_NAME, NUMERIC_PRECISION, NUMERIC_PRECISION_RADIX, NUMERIC_SCALE, DATETIME_PRECISION, DOMAIN_DEFAULT, IN…

TEST:7500 PASS:7500 If DOMAIN_CATALOG = not NULL? If DATA_TYPE = INTEGER? If CHARACTER_MAXIMUM_LENGTH = NULL? If CHARACTER_OCTET_LENGTH = NULL? If COLLATION_CATALOG = NULL? If COLLATION_SCHEMA = NULL? If COLLATION_NAME = NULL? If CHARACTER_SET_CATALOG = NULL? If CHARACTER_SET_SCHEMA = NULL? If CHARACTER_SET_NAME = NUL…
=> unparsed: condition not read: NUMERIC_PRECISION_RADIX = 2 or 10
```

#### ☓ Ran 3 checks in 1 tests

* 2 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 223/339 `nist/sql/yts753.sql` (CTS1)

```sql
DROP DOMAIN intdomain RESTRICT

TEST:7503 PASS:7503 If domain dropped successfully?
=> expected success, got error: Parse error on line 1: DROP DOMAIN intdomain RESTRICT ------------^ Expecting 'DATABASE', got 'LITERAL'
```

#### ☓ Ran 6 checks in 1 tests

* 3 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 224/339 `nist/sql/yts755.sql` (CTS1)

```sql
SELECT num FROM dom_test WHERE lit = 'Z'

TEST:7505 PASS:7505 If num = 15?
=> expected num = 15, got NULL
```

#### ☓ Ran 11 checks in 1 tests

* 6 failed
* 45% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 225/339 `nist/sql/yts756.sql` (CTS1)

#### ☓ Ran 12 checks in 1 tests

* 10 failed
* 16% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 226/339 `nist/sql/yts759.sql` (CTS1)

```sql
INSERT INTO EMP_INFO VALUES (1, 'watters',20000)

TEST:7509 PASS:7509 If 1 row inserted successfully?
=> expected success, got error: Table 'EMP_INFO' could not be found
```

```sql
SELECT col1 FROM emp

TEST:7509 PASS:7509 If col1 = 2?
=> expected col1 = 2, got error: Table does not exist: emp
```

#### ☓ Ran 16 checks in 1 tests

* 12 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 227/339 `nist/sql/yts762.sql` (CTS1)

```sql
SELECT * FROM CTS1.STAFF1 EXCEPT SELECT * FROM CTS1.STAFF4

TEST:7517 PASS:7517 If 3 rows are selected in any order? If E9 Imogen 10 Prague? If E10 John 20 Brussels? If E12 Laura 20 Deale?
=> unparsed: condition not read: E9   Imogen   10   Prague
```

#### ☓ Ran 29 checks in 1 tests

* 8 failed
* 1 not read (condition text the runner does not understand)
* 71% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 228/339 `nist/sql/yts761.sql` (CTS1)

```sql
SELECT COUNT (*) FROM STAFFd WHERE GRADE = 24

TEST:7535 PASS:7535 If COUNT = 1?
=> expected count 1, got 0
```

#### ☓ Ran 8 checks in 1 tests

* 7 failed
* 12% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 229/339 `nist/sql/yts760.sql` (CTS1)

```sql
UPDATE CTS1.STAFFc SET GRADE = CASE GRADE WHEN 13 THEN 23 END, MGR = CASE MGR WHEN 'E5' THEN 'E9' ELSE 'E8' END

TEST:7534 PASS:7534 If update completed successfully?
=> expected success, got error: Cannot declare a let variable twice: 'r'.
```

```sql
SELECT GRADE FROM CTS1.STAFFc WHERE EMPNUM = 'E3'

TEST:7534 PASS:7534 If GRADE = 23?
=> expected GRADE = 23, got 13
```

```sql
SELECT MGR FROM CTS1.STAFFc WHERE EMPNUM = 'E6'

TEST:7534 PASS:7534 If MGR = E9?
=> expected MGR = E9, got 'E5'
```

#### ☓ Ran 5 checks in 1 tests

* 5 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 230/339 `nist/sql/yts767.sql` (CTS1)

```sql
SELECT CONSTRAINT_SCHEMA, CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'STAFF7' AND CONSTRAINT_TYPE = 'CHECK'

TEST:7544 PASS:7544 If 1 row selected?
=> expected 1 rows selected, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT CONSTRAINT_SCHEMA, CONSTRAINT_NAME, CHECK_CLAUSE FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS ORDER BY CONSTRAINT_SCHEMA, CONSTRAINT_NAME

TEST:7544 PASS:7544 If CONSTRAINT_SCHEMA & CONSTRAINT_NAME = previous ? CONSTRAINT_SCHEMA & CONSTRAINT_NAME for exactly ? 1 row and CHECK_CLAUSE is either NULL or ? 'CHECK (GRADE BETWEEN 1 AND 20)' ?
=> unparsed: condition not read: CONSTRAINT_SCHEMA & CONSTRAINT_NAME = previous    CONSTRAINT_SCHEMA & CONSTRAINT_NAME for exactly   1 row
```

```sql
SELECT CONSTRAINT_SCHEMA, CONSTRAINT_NAME, CHECK_CLAUSE FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS ORDER BY CONSTRAINT_SCHEMA, CONSTRAINT_NAME

TEST:7545 PASS:7545 If matches above and CHECK_CLAUSE is NULL or ? 'CHECK (SALARY > 0)' ?
=> unparsed: condition not read: matches above
```

```sql
SELECT CONSTRAINT_SCHEMA, CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = 'CTS1B' AND CONSTRAINT_TYPE = 'CHECK' AND TABLE_NAME = 'STAFFZ'

TEST:7545 PASS:7545 If 1 row selected?
=> expected 1 rows selected, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT COUNT (*) FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS

TEST:7547 PASS:7547 If this COUNT is = to the next COUNT?
=> unparsed: condition not read: this COUNT is = to the next COUNT
```

```sql
SELECT COUNT (*) FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS AS T WHERE UNIQUE ( SELECT * FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS WHERE CONSTRAINT_CATALOG = T.CONSTRAINT_CATALOG AND CONSTRAINT_NAME = T.CONSTRAINT_NAME AND CONSTRAINT_SCHEMA = T.CONSTRAINT_SCHEMA )

TEST:7547 PASS:7547 If this COUNT is = to the previous COUNT?
=> unparsed: condition not read: this COUNT is = to the previous COUNT
```

#### ☓ Ran 21 checks in 4 tests

* 11 failed
* 10 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 231/339 `nist/sql/yts768.sql` (CTS1)

#### ☓ Ran 3 checks in 1 tests

* 3 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 232/339 `nist/sql/yts771.sql` (CTS1)

```sql
SELECT CHARACTER_SET_CATALOG, DEFAULT_COLLATE_CATALOG, DEFAULT_COLLATE_SCHEMA, DEFAULT_COLLATE_NAME FROM INFORMATION_SCHEMA.CHARACTER_SETS WHERE CHARACTER_SET_SCHEMA = 'INFORMATION_SCHEMA' AND CHARACTER_SET_NAME = 'SQL_TEXT'

TEST:7553 PASS:7553 If CHARACTER_SET_CATALOG = DEFAULT_COLLATE_CATALOG? If DEFAULT_COLLATE_SCHEMA = INFORMATION_SCHEMA? If DEFAULT_COLLATE_NAME = SQL_TEXT?
=> expected CHARACTER_SET_CATALOG = DEFAULT_COLLATE_CATALOG, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 2 checks in 1 tests

* 2 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 233/339 `nist/sql/yts769.sql` (CTS1)

```sql
DROP DOMAIN cts1b.esal CASCADE

TEST:7551 PASS:7551 If DOMAIN dropped successfully?
=> expected success, got error: Parse error on line 1: DROP DOMAIN cts1b.esal CASCADE ------------^ Expecting 'DATABASE', got 'LITERAL'
```

#### ☓ Ran 7 checks in 1 tests

* 7 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 234/339 `nist/sql/yts772.sql` (CTS1)

```sql
SELECT CONSTRAINT_CATALOG, CONSTRAINT_SCHEMA, CONSTRAINT_NAME, IS_DEFERRABLE, INITIALLY_DEFERRED FROM INFORMATION_SCHEMA.ASSERTIONS

TEST:7554 PASS:7554 If IS_DEFERRABLE = 'YES' or 'NO'? If INITALLY_DEFERRED = 'YES' or 'NO'? If IS_DEFERRABLE = 'NO' then ? INITIALLY_DEFFERED must also = 'NO' ?
=> unparsed: condition not read: IS_DEFERRABLE = 'YES' or 'NO'
```

#### ☓ Ran 3 checks in 1 tests

* 2 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 235/339 `nist/sql/yts770.sql` (CTS1)

#### ☓ Ran 8 checks in 1 tests

* 8 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 236/339 `nist/sql/yts774.sql` (CTS1)

```sql
SELECT CATALOG_NAME FROM INFORMATION_SCHEMA.INFORMATION_SCHEMA_CATALOG_NAME

TEST:7556 PASS:7556 If select statement completed successfully?
=> expected success, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT TABLE_CATALOG FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'INFORMATION_SCHEMA' AND TABLE_NAME = 'TABLES' AND TABLE_TYPE = 'VIEW' ORDER BY TABLE_CATALOG

TEST:7556 PASS:7556 If 1 or more rows are selected? If exactly 1 row has TABLE_CATALOG matching "cname"?
=> unparsed: condition not read: 1 or more rows are selected
```

#### ☓ Ran 4 checks in 1 tests

* 1 failed
* 3 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 237/339 `nist/sql/yts778.sql` (CTS1)

```sql
SELECT * FROM alt_test ORDER BY K

TEST:7520 PASS:7520 If 3 rows are returned in the following order? c1 c2 c3 c4 == == == == If 1 1 1 1? If 2 2 NULL 2? If 3 50 3 99?
=> expected ==   ==   ==   == | If     1    1    1    1? | If     2    2   NULL  2? | If     3   50    3   99?, got 1 1 1 1 | 2 2 NULL 2 | 3 50 3 NULL
```

```sql
ALTER TABLE alt_test ALTER COLUMN L SET DEFAULT 100

TEST:7520 PASS:7520 If table altered successfully?
=> expected success, got error: Parse error on line 1: ...LTER TABLE alt_test ALTER COLUMN L SET D -----------------------^ Expecting 'DROP', 'RENAME', 'ADD', 'MODIFY', got 'ALTER'
```

```sql
SELECT * FROM alt_test ORDER BY K

TEST:7520 PASS:7520 If 6 rows are returned in the following order? c1 c2 c3 c4 == == == == If 1 1 1 1? If 2 2 NULL 2? If 3 50 3 99? If 4 4 4 4? If 5 5 90 80? If 6 100 6 80?
=> expected ==   ==   ==   == | If     1    1    1    1? | If     2    2   NULL  2? | If     3   50    3   99? | If     4    4    4    4? | If     5    5   90   80? | If     6  100    6   80?, got 1 1 1 1 | 2 2 NULL 2 | 3 50 3 NULL | 4 4 4 4 | 5 5 NULL NULL | 6 50 6 NULL
```

#### ☓ Ran 16 checks in 1 tests

* 9 failed
* 43% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 238/339 `nist/sql/yts763.sql` (CTS1)

```sql
SELECT col2, col3, col4 FROM CTS1.ET ORDER BY col3, col4

TEST:7518 PASS:7518 If 3 rows are selected in the following order? col2 col3 col4 ==== ==== ==== If Betty 10 Vienna? If Don 12 Deale? If Carmen 13 Vienna?
=> expected ====     ====     ==== | If   Betty    10       Vienna? | If   Don      12       Deale? | If   Carmen   13       Vienna?, got 
```

#### ☓ Ran 4 checks in 1 tests

* 1 failed
* 75% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 239/339 `nist/sql/yts780.sql` (CTS1)

#### ☓ Ran 10 checks in 1 tests

* 8 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 240/339 `nist/sql/yts781.sql` (CTS1)

```sql
INSERT INTO TTIME VALUES (1, TIME '12:00:00', TIMESTAMP '1995-04-10 12:00:00')

TEST:7536 PASS:7536 If 1 row inserted successfully?
=> expected success, got error: Parse error on line 2: ...ALUES (1, TIME '12:00:00', TIMESTAM ----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'REGEXP', 'TIL…
```

```sql
SELECT PK, EXTRACT (YEAR FROM TS), EXTRACT (MONTH FROM TS), EXTRACT (DAY FROM TS), EXTRACT (HOUR FROM TS), EXTRACT (MINUTE FROM TS), EXTRACT (HOUR FROM TT), EXTRACT (MINUTE FROM TT) FROM TTIME ORDER BY PK

TEST:7536 PASS:7536 If 1 1995 4 (10 12 0)+TZD (12 0)+TZD ? If 2 1995 4 (10 1 45)+TZD ( 0 15)+TZD ? If 3 1995 4 (10 22 54)+TZD (23 28)+TZD ? If 4 1995 4 (10 11 59)+TZD ( 6 31)+TZD ? If 5 1995 4 (10 19 30)+TZD (18 49)+TZD ?
=> unparsed: condition not read: 1  1995  4   (10  12   0)+TZD  (12    0)+TZD
```

#### ☓ Ran 18 checks in 1 tests

* 17 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 241/339 `nist/sql/yts782.sql` (CTS1)

```sql
INSERT INTO TTIME (PK, TT) VALUES (4, TIME '01:45:00')

TEST:7561 PASS:7561 If 1 row inserted successfully?
=> expected success, got error: Parse error on line 2: ... VALUES (4, TIME '01:45:00') -----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'REGEXP', 'TILDA', '…
```

#### ☓ Ran 12 checks in 1 tests

* 8 failed
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 242/339 `nist/sql/yts764.sql` (CTS1)

```sql
SELECT COUNT (*), col5, col6 FROM CTS1.ET GROUP BY col6, col5 ORDER BY 2,3

TEST:7519 PASS:7519 If 7 rows are returned in the following order? count col5 col6 ===== ==== ==== If 1 15 7000? If 1 30 8000? If 3 30 20000? If 2 35 15000? If 9 40 10000? If 2 60 45000? If 6 70 40000?
=> expected =====   ====   ==== | If   1      15     7000? | If   1      30     8000? | If   3      30     20000? | If   2      35     15000? | If   9      40     10000? | If   2      60     45000? | If   6      70     40000?, got 
```

#### ☓ Ran 4 checks in 1 tests

* 2 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 243/339 `nist/sql/yts788.sql` (CTS1)

```sql
SELECT FORM_OF_USE, NUMBER_OF_CHARACTERS, DEFAULT_COLLATE_CATALOG, DEFAULT_COLLATE_SCHEMA, DEFAULT_COLLATE_NAME FROM INFORMATION_SCHEMA.CHARACTER_SETS WHERE CHARACTER_SET_SCHEMA = 'CTS1' AND CHARACTER_SET_NAME = 'TEST_SET'

TEST:7522 PASS:7522 If selected values = the values of the next SELECT?
=> unparsed: condition not read: selected values = the values of the next SELECT
```

```sql
SELECT FORM_OF_USE, NUMBER_OF_CHARACTERS, DEFAULT_COLLATE_CATALOG, DEFAULT_COLLATE_SCHEMA, DEFAULT_COLLATE_NAME FROM INFORMATION_SCHEMA.CHARACTER_SETS WHERE CHARACTER_SET_SCHEMA = 'INFORMATION_SCHEMA' AND CHARACTER_SET_NAME = 'SQL_TEXT'

TEST:7522 PASS:7522 If selected values = the values of the previous SELECT?
=> unparsed: condition not read: selected values = the values of the previous SELECT
```

#### ☓ Ran 6 checks in 1 tests

* 4 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 244/339 `nist/sql/yts789.sql` (CTS1)

```sql
SELECT COUNT (*) FROM CTSC.Tab

TEST:7523 PASS:7523 If COUNT = 1?
=> expected count 1, got error: Table does not exist: Tab
```

#### ☓ Ran 7 checks in 1 tests

* 5 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 245/339 `nist/sql/yts765.sql` (CTS1)

```sql
SELECT CONSTRAINT_SCHEMA, TABLE_SCHEMA, IS_DEFERRABLE, INITIALLY_DEFERRED FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'WORKS3A' AND CONSTRAINT_TYPE = 'FOREIGN KEY'

TEST:7537 PASS:7537 If TABLE_SCHEMA = CTS1? If IS_DEFFERRABLE = NO? If INITIALLY_DEFERRED = NO?
=> expected TABLE_SCHEMA = CTS1, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT CONSTRAINT_SCHEMA, TABLE_SCHEMA, IS_DEFERRABLE, INITIALLY_DEFERRED FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'WORKS' AND CONSTRAINT_TYPE = 'UNIQUE'

TEST:7537 PASS:7537 If TABLE_SCHEMA = CTS1? If IS_DEFERRABLE = NO? If INITIALLY_DEFERRED = NO?
=> expected TABLE_SCHEMA = CTS1, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 13 checks in 3 tests

* 11 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 246/339 `nist/sql/yts796.sql` (CTS1)

#### ☓ Ran 2 checks in 1 tests

* 1 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 247/339 `nist/sql/yts797.sql` (CTS1)

```sql
SELECT B FROM CTS1.TV WHERE A = 1

TEST:7558 PASS:7558 If B = 'g'?
=> expected B = 'g', got 'a'
```

```sql
SELECT B FROM CTS1.TV WHERE A = 2

TEST:7558 PASS:7558 If B = NULL?
=> expected B = NULL, got 'b'
```

#### ☓ Ran 7 checks in 1 tests

* 6 failed
* 14% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 248/339 `nist/sql/yts798.sql` (CTS1)

```sql
SELECT DISTINCT A, (SELECT D FROM TW WHERE E = X.A) FROM TV AS X, TW AS Y WHERE A = 1

TEST:7559 PASS:7559 If A = 1 and D = 'g'?
=> unresolved: no column D in A, SELECT D FROM TW WHERE E = X.A
```

#### ☓ Ran 3 checks in 1 tests

* 1 failed
* 2 not resolved (the condition names a column the result does not have)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 249/339 `nist/sql/yts799.sql` (CTS1)

```sql
SELECT TTA, TTB, TTC FROM CTS1.TT WHERE (SELECT TUD FROM TU WHERE TU.TUE = TT.TTA) IS NULL ORDER BY TTA DESC

TEST:7531 PASS:7531 If 3 rows are selected in the following order? col1 col2 col3 ==== ==== ==== If 5 42 26 ? If 2 98 NULL? If 1 NULL 99 ?
=> expected ====     ====     ==== | If     5        42       26  ? | If     2        98       NULL? | If     1        NULL     99  ?, got 5 42 26 | 2 98 NULL | 1 NULL 99
```

```sql
SELECT TTA, TTB, TTC FROM CTS1.TT WHERE (SELECT TUD FROM TU WHERE TU.TUE = TT.TTA) IS NOT NULL ORDER BY TTA

TEST:7531 PASS:7531 If 2 rows are selected in the following order? col1 col1 col3 ==== ==== ==== If 3 97 96 ? If 4 NULL NULL?
=> expected ====     ====     ==== | If    3        97       96  ? | If    4        NULL     NULL?, got 3 97 96 | 4 NULL NULL
```

#### ☓ Ran 5 checks in 1 tests

* 2 failed
* 60% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 250/339 `nist/sql/yts800.sql` (CTS1)

#### ☓ Ran 2 checks in 1 tests

* 1 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 251/339 `nist/sql/yts802.sql` (CTS1)

```sql
SELECT FEATURE_ID, FEATURE_NAME, CLASSIFICATION FROM FIPS_DOCUMENTATION.SQL_FEATURES ORDER BY FEATURE_ID

TEST:7548 PASS:7548 If 89 rows are returned ordered by FEATURE_ID? If FEATURE_ID and FEATURE_NAME match those below? SQL_FEATURES TABLE ==================
=> unparsed: condition not read: FEATURE_ID
```

#### ☓ Ran 7 checks in 1 tests

* 6 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 252/339 `nist/sql/yts803.sql` (CTS1)

```sql
SELECT SIZING_ID, DESCRIPTION, ENTRY_VALUE, INTERMEDIATE_VALUE FROM FIPS_DOCUMENTATION.SQL_SIZING ORDER BY SIZING_ID

TEST:7549 PASS:7549 If 46 rows are returned ordered by SIZING_ID? If values for all 4 columns match those below? SQL_SIZING TABLE ================
=> unparsed: condition not read: values for all 4 columns match those below SQL_SIZING TABLE ================
```

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 253/339 `nist/sql/yts805.sql` (CTS1)

```sql
SELECT COUNT (*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = 'ZZZ' AND TABLE_NAME = 'BBB' AND CONSTRAINT_TYPE = 'UNIQUE'

TEST:7562 PASS:7562 If COUNT = 1?
=> expected count 1, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 14 checks in 1 tests

* 6 failed
* 57% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 254/339 `nist/sql/dml139.sql` (HU)

#### ☓ Ran 5 checks in 1 tests

* 3 failed
* 40% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 255/339 `nist/sql/yts766.sql` (CTS1)

```sql
SELECT CONSTRAINT_NAME, UNIQUE_CONSTRAINT_SCHEMA, MATCH_OPTION,UPDATE_RULE,DELETE_RULE FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS ORDER BY CONSTRAINT_NAME

TEST:7540 PASS:7540 If CONST_NAME = previous CONST_NAME for exactly 1 row?
=> unparsed: condition not read: CONST_NAME = previous CONST_NAME for exactly 1 row
```

```sql
SELECT CONSTRAINT_NAME, UNIQUE_CONSTRAINT_SCHEMA, MATCH_OPTION,UPDATE_RULE,DELETE_RULE FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS ORDER BY CONSTRAINT_NAME

TEST:7540 PASS:7540 If MATCH_OPTION = NONE? If UPDATE_RULE = NO ACTION? If DELETE_RULE = NO ACTION?
=> expected MATCH_OPTION = NONE, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT COUNT (*) FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_NAME IS NULL

TEST:7542 PASS:7542 If COUNT = 0?
=> expected count 0, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT COUNT (*) FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS

TEST:7543 PASS:7543 If this COUNT (referenced as COUNT#1) is = to ? the next three COUNTs ?
=> unparsed: condition not read: this COUNT (referenced as COUNT#1) is = to    the next three COUNTs
```

#### ☓ Ran 27 checks in 4 tests

* 17 failed
* 10 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 256/339 `nist/sql/yts808.sql` (CTS1)

```sql
SELECT COUNT (*) FROM TTIME WHERE TT AT LOCAL > TIME '10:30:05+01:45'

TEST:7565 PASS:7565 If the sum of this COUNT and next COUNT = 6?
=> unparsed: condition not read: the sum of this COUNT
```

```sql
SELECT COUNT (*) FROM TTIME WHERE TIME '06:15:05-02:30' >= TT AT LOCAL

TEST:7565 PASS:7565 If the sum of this COUNT and previous COUNT = 6?
=> unparsed: condition not read: the sum of this COUNT
```

#### ☓ Ran 10 checks in 1 tests

* 6 failed
* 4 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 257/339 `nist/sql/yts809.sql` (CTS1)

#### ★ Ran 5 checks in 1 tests

* 4 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 258/339 `nist/sql/yts810.sql` (CTS1)

```sql
SELECT GRADE, COUNT (*) AS CC, EMPNUM FROM TA FULL OUTER JOIN TB ON GRADE > PNUM AND EMPNUM = DEPTNO WHERE GRADE IS NOT NULL GROUP BY GRADE, EMPNUM ORDER BY CC DESC, GRADE

TEST:7567 PASS:7567 If 4 rows returned in the following order? grade grpno empnum ===== ===== ====== If 7 3 abc ? If 8 3 abc ? If 1 1 NULL ? If 2 1 NULL ?
=> expected rows, got error: alasql.databases[source.databaseid].tables[source.tableid].select is not a function. (In 'alasql.databases[source.databaseid].tables[source.tableid].select(params)', 'alasql.databases[source.databaseid].tables[source.tableid].select' is undefined)
```

#### ☓ Ran 15 checks in 1 tests

* 4 failed
* 73% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 259/339 `nist/sql/yts773.sql` (CTS1)

```sql
SELECT COUNT (*) FROM INFORMATION_SCHEMA.SQL_LANGUAGES WHERE SQL_LANGUAGE_BINDING_STYLE = 'EMBEDDED' AND SQL_LANGUAGE_PROGRAMMING_LANGUAGE = 'C'

TEST:7555 PASS:7555 If COUNT not 0?
=> unparsed: condition not read: COUNT not 0
```

#### ☓ Ran 3 checks in 1 tests

* 2 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 260/339 `nist/sql/yts776.sql` (CTS1)

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 261/339 `nist/sql/yts812.sql` (CTS1)

```sql
SELECT TX1 FROM TX WHERE TX3 || TX2 IS NULL

TEST:7569 PASS:7569 If 2 rows returned in any order? If TX1 = 1? If TX1 = 2?
=> expected 2 rows returned, got 0
```

#### ☓ Ran 2 checks in 1 tests

* 2 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 262/339 `nist/sql/yts779.sql` (CTS1)

```sql
ALTER TABLE alt_test ALTER COLUMN L DROP DEFAULT

TEST:7521 PASS:7521 If table altered successfully?
=> expected success, got error: Parse error on line 1: ...LTER TABLE alt_test ALTER COLUMN L DROP -----------------------^ Expecting 'DROP', 'RENAME', 'ADD', 'MODIFY', got 'ALTER'
```

```sql
SELECT * FROM alt_test

TEST:7521 PASS:7521 If column1 = 7? If column2 is NULL? If column3 is NULL? If column4 = 99?
=> unresolved: no column column1 in K, L, M, N
```

#### ☓ Ran 9 checks in 1 tests

* 6 failed
* 1 not resolved (the condition names a column the result does not have)
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 263/339 `nist/sql/yts777.sql` (CTS2)

#### ☓ Ran 14 checks in 1 tests

* 3 failed
* 78% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 264/339 `nist/sql/yts790.sql` (CTS1)

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 265/339 `nist/sql/yts793.sql` (CTS1)

#### ☓ Ran 3 checks in 1 tests

* 3 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 266/339 `nist/sql/yts806.sql` (CTS1)

```sql
SELECT * FROM STAFF1 NATURAL FULL OUTER JOIN STAFFA ORDER BY EMPNUM, EMPNAME, GRADE, PNUM

TEST:7563 PASS:7563 If 12 rows selected in the following order? eno enaam grd cit hrs sal pno === ===== === === === === === If E1 Alice 4 Lyon 20 40000 11 ? If E1 Alice 8 Lyon 20 40000 11 ? If E1 Alice 12 Geneva 20 40000 11 ? If E2 Betty 16 Strasbourg 15 20000 12 ? If E2 Betty 16 Strasbourg 15 20000 13 ? If E2 Betty 2…
=> expected rows, got error: Table does not exist: STAFFA
```

#### ☓ Ran 2 checks in 1 tests

* 1 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 267/339 `nist/sql/xts771.sql` (CTS3)

```sql
SELECT COLNUM1,COLSTR1,COLSTR2 FROM TAB771 ORDER BY COLNUM1

TEST:7071 PASS:7071 If 3 row are selected in the following order? COLNUM1 COLSTR1 COLSTR2 ======= ======= ======= If 20 `$NIK MAY BE ? If 21 ~!KOS{} {ERROR} ? If 22 !$[\]^`{}~ OK ?
=> expected rows, got error: Table does not exist: TAB771
```

```sql
DROP TABLE TAB771 CASCADE

TEST:7071 PASS:7071 If TABLE dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 7 checks in 1 tests

* 7 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 268/339 `nist/sql/yts807.sql` (CTS1)

```sql
SELECT PK, EXTRACT (TIMEZONE_HOUR FROM CAST (TT AS TIME WITH TIME ZONE)), EXTRACT (TIMEZONE_MINUTE FROM CAST (TT AS TIME WITH TIME ZONE)) FROM TTIME WHERE PK = 1

TEST:7564 PASS:7564 If PK = 1? If TIMEZONE_HOUR between -12 and 13? If TIMEZONE_MINUTE between 0 and 59?
=> unparsed: condition not read: TIMEZONE_HOUR between -12
```

```sql
SELECT PK, EXTRACT (TIMEZONE_HOUR FROM TT2), EXTRACT (TIMEZONE_MINUTE FROM TT2), EXTRACT (TIMEZONE_HOUR FROM TS2), EXTRACT (TIMEZONE_MINUTE FROM TS2) FROM TTIME2 WHERE PK = 1

TEST:7564 PASS:7564 If PK = 1? If HOUR1 = 7? If MIN1 = 35? If HOUR2 = 7? If MIN2 = 35?
=> expected PK = 1, got error: Parse error on line 2: ...RACT (TIMEZONE_HOUR FROM TT2), -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'RBRA', 'END…
```

#### ☓ Ran 10 checks in 1 tests

* 9 failed
* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 269/339 `nist/sql/xts719.sql` (CTS4)

#### ☓ Ran 10 checks in 1 tests

* 8 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 270/339 `nist/sql/yts811.sql` (CTS1)

```sql
SELECT VT1, VT2, VT3 FROM V_DATA_TYPE WHERE VT2 = 1

TEST:7568 PASS:7568 If WARNING - null value eliminated in set function? If NULL, 1, 1?
=> unparsed: condition not read: NULL
```

```sql
SELECT SUM(NUM) FROM DATA_TYPE WHERE NUM IS NOT NULL

TEST:7568 PASS:7568 If SUM = 12?
=> unresolved: no column SUM in SUM(NUM)
```

```sql
SELECT SUM(VT1) AS SUNTA1 FROM V_DATA_TYPE AS TB3

TEST:7568 PASS:7568 If WARNING - null value eliminated in set function? If SUM = 12?
=> unresolved: no column SUM in SUNTA1
```

#### ★ Ran 10 checks in 1 tests

* 2 not read (condition text the runner does not understand)
* 2 not resolved (the condition names a column the result does not have)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 271/339 `nist/sql/xts714.sql` (CTS2)

```sql
SELECT * FROM T2831C.TESTAB2831 ORDER BY TNUM

TEST:7014 PASS:7014 If 5 row selected in following order? c1 c2 == == If 1 AA? If 2 BB? If 3 CC? If 4 DD? If 5 EE?
=> expected ==   == | If    1   AA? | If    2   BB? | If    3   CC? | If    4   DD? | If    5   EE?, got 1 'AA' | 2 'BB' | 3 'CC' | 4 'DD' | 5 'EE'
```

```sql
SELECT DT2831C.DTESTAB2831.TNUM, DT2831C.DTESTAB2831.TCHAR FROM DT2831C.DTESTAB2831 WHERE DT2831C.DTESTAB2831.TNUM = 1

TEST:7014 PASS:7014 If one row selected and TNUM = 1 and TCHAR = AA?
=> expected 1 rows selected, got error: undefined is not an object (evaluating 'p['DT2831C']['DTESTAB2831']')
```

```sql
SELECT * FROM DT2831C.DTESTAB2831 WHERE TNUM <> 1 ORDER BY TNUM

TEST:7014 PASS:7014 If 4 rows selected in following order? c1 c2 == == If 2 BB? If 3 CC? If 4 DD? If 5 EE?
=> expected ==   == | If   2   BB? | If   3   CC? | If   4   DD? | If   5   EE?, got 2 'BB' | 3 'CC' | 4 'DD' | 5 'EE'
```

#### ☓ Ran 14 checks in 1 tests

* 5 failed
* 64% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 272/339 `nist/sql/yts794.sql` (CTS2)

```sql
SELECT * FROM TB

TEST:7528 PASS:7528 If value selected = 'def'?
=> unparsed: condition not read: value selected = 'def'
```

#### ☓ Ran 5 checks in 1 tests

* 3 failed
* 1 not read (condition text the runner does not understand)
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 273/339 `nist/sql/yts791.sql` (CTS2)

```sql
SELECT * FROM TB

TEST:7525 PASS:7525 If answer = 'def'?
=> expected answer = 'def', got error: Table does not exist: TB
```

#### ☓ Ran 5 checks in 1 tests

* 5 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 274/339 `nist/sql/xts769.sql` (CTS3)

```sql
INSERT INTO TABLATIN1 VALUES (_LATIN1 'LAMIA', _LATIN1 'ISOS', _LATIN1 'ALLOS',3)

TEST:7069 PASS:7069 If 1 row inserted?
=> expected 1 rows inserted, got error: Parse error on line 2: ...IN1 VALUES(_LATIN1 'LAMIA', _LATIN1 'IS ----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'R…
```

```sql
SELECT COL1, COL2, COL3, COL4 FROM TABLATIN1 WHERE COL1 = _LATIN1'NICKOS'

TEST:7069 PASS:7069 If COL1 = NICKOS? If COL2 = VASO? If COL3 = BILL? If COL4 = 2?
=> expected COL1 = NICKOS, got error: Parse error on line 3: ...WHERE COL1 = _LATIN1'NICKOS' -----------------------^ Expecting 'EOF', 'WITH', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'ORDER', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'UNION', 'INTERSECT', 'EXCEP…
```

#### ☓ Ran 10 checks in 1 tests

* 10 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 275/339 `nist/sql/xts770.sql` (CTS3)

#### ☓ Ran 6 checks in 1 tests

* 6 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 276/339 `nist/sql/xts715.sql` (CTS4)

```sql
SELECT * FROM T7015aPC.TESTAB2931 ORDER BY TNUM

TEST:7015 PASS:7015 If 5 rows selected in following order? c1 c2 == == If 1 AA? If 2 BB? If 3 CC? If 4 DD? If 5 EE?
=> expected rows, got error: undefined is not an object (evaluating 'alasql.databases[fr.databaseid || databaseid].tables')
```

#### ☓ Ran 20 checks in 1 tests

* 20 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 277/339 `nist/sql/xts720.sql` (CTS4)

```sql
DROP TABLE TAB720a CASCADE

TEST:7020 PASS:7020 If table dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 13 checks in 1 tests

* 9 failed
* 30% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 278/339 `nist/sql/xts722.sql` (CTS4)

```sql
SELECT COUNT (DISTINCT TABLE_NAME), COUNT(CONSTRAINT_NAME) FROM INFORMATION_SCHEMA.CONSTRAINT_TABLE_USAGE WHERE CONSTRAINT_SCHEMA = 'CTS4'

TEST:7022 PASS:7022 If first COUNT = 1? If second COUNT = 3?
=> unparsed: condition not read: second COUNT = 3
```

#### ☓ Ran 7 checks in 1 tests

* 4 failed
* 1 not read (condition text the runner does not understand)
* 33% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 279/339 `nist/sql/xts721.sql` (CTS4)

#### ☓ Ran 7 checks in 1 tests

* 5 failed
* 28% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 280/339 `nist/sql/xts724.sql` (CTS4)

#### ☓ Ran 7 checks in 1 tests

* 6 failed
* 14% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 281/339 `nist/sql/xts723.sql` (CTS4)

```sql
DROP TABLE TAB722a CASCADE

TEST:7023 PASS:7023 If table dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 7 checks in 1 tests

* 5 failed
* 28% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 282/339 `nist/sql/yts792.sql` (CTS4)

#### ☓ Ran 7 checks in 1 tests

* 6 failed
* 14% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 283/339 `nist/sql/yts795.sql` (CTS4)

#### ☓ Ran 2 checks in 1 tests

* 1 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 284/339 `nist/sql/dml160.sql` (FLATER)

```sql
SELECT EMPNUM, (SELECT COUNT(*) FROM HU.WORKS JOIN HU.PROJ ON HU.WORKS.PNUM = HU.PROJ.PNUM AND BUDGET > AVG (OSTAFF.GRADE) * 1000 WHERE HU.WORKS.EMPNUM = OSTAFF.EMPNUM) FROM HU.STAFF AS OSTAFF ORDER BY 2, 1

TEST:0859 PASS:0859 If 5 rows are returned in the following order? empnum count ====== ===== If E5 0 ? If E2 1 ? If E3 1 ? If E4 2 ? If E1 4 ?
=> expected rows, got error: undefined is not an object (evaluating 'p['HU']['WORKS']')
```

```sql
SELECT EXTRACT (HOUR FROM MERIDIAN), EXTRACT (MINUTE FROM MERIDIAN) FROM TIDES.LOCATIONS WHERE LOC_NAME LIKE '%Newfound%'

TEST:0860 PASS:0860 If xhour = -3? If xminute = -30?
=> expected xhour = -3, got error: Parse error on line 1: ...ELECT EXTRACT (HOUR FROM MERIDIAN), EXTR -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR'…
```

```sql
INSERT INTO TIDES.LOCATIONS VALUES (300, 'Bath, Maine', -69.8133, 43.9183, 1, 3.422E0, INTERVAL '-05:00' HOUR TO MINUTE, ':US/Eastern')

TEST:0860 PASS:0860 If 1 row inserted successfully?
=> expected success, got error: Parse error on line 3: ...ERVAL '-05:00' HOUR TO MINUTE, ':US/East -----------------------^ Expecting 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'REGEXP'…
```

```sql
SELECT EPOCH FROM CONST_RAD WHERE LOC_ID = 100 AND CONST_ID = 0

TEST:0860 PASS:0860 If EPOCH = 2.11 (+ or - 0.01)?
=> unparsed: condition not read: EPOCH = 2.11 (+ or - 0.01)
```

```sql
SELECT COUNT(*) FROM CONST_RAD_NOT_NORM WHERE EPOCH > 6.2831853E0

TEST:0860 PASS:0860 If COUNT = 4?
=> expected count 4, got error: Table does not exist: CONST_NOT_NORM
```

```sql
SELECT EXTRACT (YEAR FROM CHECK_DATES) FROM CHECK_PTS WHERE JOB_ID = 2 AND FLAG = 1

TEST:0860 PASS:0860 If xyear = 1994?
=> expected xyear = 1994, got error: Parse error on line 1: ...ELECT EXTRACT (YEAR FROM CHECK_DATES) -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR',…
```

```sql
COMMIT WORK

TEST:0860 PASS:0860 If tables and view dropped in 4 previous drops?
=> unparsed: condition not read: tables
```

#### ☓ Ran 33 checks in 2 tests

* 20 failed
* 2 not read (condition text the runner does not understand)
* 35% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 285/339 `nist/sql/dml161.sql` (FLATER)

```sql
SELECT CURRENT_USER FROM HU.ECCO

TEST:0861 PASS:0861 If CURRENT_USER = 'FLATER'?
=> expected CURRENT_USER = 'FLATER', got error: Column does not exist: CURRENT_USER
```

```sql
SELECT SESSION_USER FROM HU.ECCO

TEST:0861 PASS:0861 If SESSION_USER = 'FLATER'?
=> expected SESSION_USER = 'FLATER', got error: Column does not exist: SESSION_USER
```

```sql
SELECT SYSTEM_USER FROM HU.ECCO

TEST:0861 PASS:0861 If SYSTEM_USER = 'FLATER'?
=> expected SYSTEM_USER = 'FLATER', got error: Column does not exist: SYSTEM_USER
```

#### ☓ Ran 7 checks in 2 tests

* 7 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 286/339 `nist/sql/dml171.sql` (FLATER)

```sql
SELECT EMPNUM, CITY, SALARY FROM HU.STAFF3 FULL OUTER JOIN STAFF66 USING (EMPNUM) ORDER BY EMPNUM

TEST:0882 PASS:0882 If 6 rows are returned in the following order? empnum city salary ====== ==== ====== If E1 Deale NULL ? If E2 Vienna NULL ? If E3 Vienna 13000 ? If E4 Deale 12000 ? If E5 NULL 13000 ? If E6 Akron NULL ?
=> expected ======     ====     ====== | If  E1         Deale    NULL   ? | If  E2         Vienna   NULL   ? | If  E3         Vienna   13000  ? | If  E4         Deale    12000  ? | If  E5         NULL     13000  ? | If  E6         Akron    NULL   ?, got 'E1' 'Deale' NULL | 'E2' 'Vienna' NULL | 'E3' 'V…
```

```sql
DROP TABLE STAFF66 CASCADE

TEST:0882 PASS:0882 If table dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 6 checks in 1 tests

* 2 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 287/339 `nist/sql/dml163.sql` (FLATER)

```sql
INSERT INTO HU.STAFF VALUES ( 'E8', 'Wally', CASE WHEN USER = 'FLATER' THEN 15 ELSE 10 END, 'Monash')

TEST:0866 PASS:0866 If insert completed successfully?
=> expected success, got error: undefined is not an object (evaluating 'undefined['undefined']')
```

```sql
SELECT COALESCE (CITY, EMPNUM) FROM HU.STAFF ORDER BY 1

TEST:0866 PASS:0866 If 6 rows are returned in the following order? coalesce(city,empnum) ===================== If Akron? If E1 ? If E4 ? If Monash? If Vienna? If Vienna?
=> expected If  Akron? | If  E1   ? | If  E4   ? | If  Monash? | If  Vienna? | If  Vienna?, got 'Akron' | 'E1' | 'E4' | 'Vienna' | 'Vienna'
```

#### ☓ Ran 13 checks in 2 tests

* 6 failed
* 53% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 288/339 `nist/sql/dml165.sql` (FLATER)

```sql
SELECT * FROM APPLES UNION ALL SELECT * FROM ORANGES ORDER BY 1

TEST:0870 PASS:0870 If 4 rows returned in the following order? col1 col2 ==== ==== If 1.0 (+ or - 0.01) Granny Smith? If 1.5 (+ or - 0.01) Navel? If 2.0 (+ or - 0.01) Red Delicious? If 2.5 (+ or - 0.01) Florida?
=> expected ====                 ==== | If   1.0 (+ or - 0.01)    Granny Smith? | If   1.5 (+ or - 0.01)    Navel? | If   2.0 (+ or - 0.01)    Red Delicious? | If   2.5 (+ or - 0.01)    Florida?, got 1 'Granny Smith' | 2 'Red Delicious' | 1.5 'Navel' | 2.5 'Florida'
```

#### ☓ Ran 9 checks in 1 tests

* 3 failed
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 289/339 `nist/sql/dml164.sql` (FLATER)

```sql
SELECT COUNT(*) FROM TIDES.LOCATIONS WHERE LOC_NAME LIKE '% ' || 'Key' || '%' OR LOC_NAME LIKE '%' || 'Key' || ' %' OR LOC_NAME = 'Key'

TEST:0867 PASS:0867 If COUNT = 13?
=> expected count 13, got error: Table does not exist: LOCATIONS
```

```sql
SELECT LOC_ID FROM TIDES.LOCATIONS WHERE LOC_NAME LIKE '% ' || 'Anchorage' || '%' OR LOC_NAME LIKE '%' || 'Anchorage' || ' %' OR LOC_NAME = 'Anchorage'

TEST:0867 PASS:0867 If LOC_ID= 10?
=> expected LOC_ID= 10, got error: Table does not exist: LOCATIONS
```

#### ☓ Ran 19 checks in 3 tests

* 10 failed
* 47% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 290/339 `nist/sql/dml167.sql` (FLATER)

```sql
SELECT COUNT (DISTINCT TABLE_CATALOG) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS

TEST:0874 PASS:0874 If COUNT = 1?
=> expected count 1, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT ORDINAL_POSITION FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE COLUMN_NAME = 'CONST_ID' AND TABLE_NAME = 'CONSTITUENTS' AND TABLE_SCHEMA = 'TIDES'

TEST:0875 PASS:0875 If ORDINAL_POSITION = 2?
=> expected ORDINAL_POSITION = 2, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS

TEST:0875 PASS:0875 If this COUNT = the next COUNT?
=> unparsed: condition not read: this COUNT = the next COUNT
```

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS WHERE (IS_DEFERRABLE = 'NO' AND INITIALLY_DEFERRED = 'NO') OR (IS_DEFERRABLE = 'YES' AND (INITIALLY_DEFERRED = 'NO' OR INITIALLY_DEFERRED = 'YES'))

TEST:0875 PASS:0875 If this COUNT = the previous COUNT?
=> unparsed: condition not read: this COUNT = the previous COUNT
```

#### ☓ Ran 26 checks in 2 tests

* 22 failed
* 2 not read (condition text the runner does not understand)
* 8% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 291/339 `nist/sql/dml168.sql` (FLATER)

```sql
SELECT COUNT(*) FROM T0876 WHERE C1 = 'T0876'

TEST:0876 PASS:0876 If COUNT = 1?
=> expected count 1, got error: Table does not exist: T0876
```

```sql
SELECT * FROM T0878

TEST:0878 PASS:0878 If answer = 'ABCD'?
=> expected answer = 'ABCD', got no rows
```

```sql
INSERT INTO T0879 VALUES (0, 0)

TEST:0879 PASS:0879 If 1 row inserted successfully?
=> expected success, got error: Violation of CHECK constraint DELME
```

```sql
INSERT INTO T0879 VALUES (2, 0)

TEST:0879 PASS:0879 If ERROR - integrity constraint violation?
=> expected an error, got count 1
```

#### ☓ Ran 25 checks in 3 tests

* 21 failed
* 16% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 292/339 `nist/sql/dml170.sql` (FLATER)

```sql
SELECT C1 FROM T0880 ORDER BY C1

TEST:0880 PASS:0880 If 2 rows are returned in the following order? c1 == If 0 ? If 1 ?
=> expected rows, got error: Table does not exist: T0880
```

```sql
DROP CHARACTER SET "Little boxes on the hillside, Little boxes made of ticky-tacky"

TEST:0881 PASS:0881 If character set dropped successfully?
=> expected success, got error: Parse error on line 1: DROP CHARACTER SET "Little boxes ---------------^ Expecting 'DATABASE', got 'SET'
```

#### ☓ Ran 17 checks in 2 tests

* 16 failed
* 5% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 293/339 `nist/sql/dml184.sql` (FLATER)

```sql
SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.CONSTRAINT_TABLE_USAGE WHERE TABLE_SCHEMA = 'FLATER' AND TABLE_NAME = 'T' AND CONSTRAINT_SCHEMA = 'FLATER'

TEST:0897 PASS:0897 If name = 'UNIQUEONCOLSAANDB'?
=> expected name = 'UNIQUEONCOLSAANDB', got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 14 checks in 1 tests

* 12 failed
* 14% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 294/339 `nist/sql/isi001.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES Z WHERE NOT EXISTS (SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLE_PRIVILEGES X WHERE GRANTEE IN ('PUBLIC', USER) AND X.TABLE_SCHEMA = Z.TABLE_SCHEMA AND X.TABLE_NAME = Z.TABLE_NAME UNION SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_…

TEST:0568 PASS:0568 If COUNT = 0?
=> expected count 0, got error: Parse error on line 2: ... INFORMATION_SCHEMA.TABLES Z WHERE NOT E -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'TABLE'
```

```sql
SELECT TABLE_TYPE FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'FLATER' AND TABLE_NAME = 'USIG'

TEST:0568 PASS:0568 If TABLE_TYPE = 'BASE TABLE'?
=> expected TABLE_TYPE = 'BASE TABLE', got error: Parse error on line 2: ... INFORMATION_SCHEMA.TABLES WHERE TA -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'TABLE'
```

#### ☓ Ran 20 checks in 1 tests

* 18 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 295/339 `nist/sql/isi007.sql` (FLATER)

```sql
SELECT COUNT (DISTINCT OBJECT_CATALOG) FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES

TEST:0574 PASS:0574 If COUNT = 0 or 1?
=> unparsed: condition not read: COUNT = 0 or 1
```

```sql
SELECT TABLE_CATALOG FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'WCOV'

TEST:0574 PASS:0574 If select completed successfully?
=> expected success, got error: Parse error on line 2: ... INFORMATION_SCHEMA.TABLES WHERE TA -----------------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', got 'TABLE'
```

```sql
SELECT TABLE_CATALOG FROM INFORMATION_SCHEMA.TABLES ORDER BY TABLE_CATALOG

TEST:0574 PASS:0574 IF no NULLS? If no value = to previous "noted" TABLE_CATALOG name?
=> unparsed: condition not read: no NULLS
```

```sql
SELECT CHARACTER_SET_CATALOG, CHARACTER_SET_SCHEMA, CHARACTER_SET_NAME, COLLATION_CATALOG, COLLATION_SCHEMA, COLLATION_NAME, DOMAIN_CATALOG, DOMAIN_SCHEMA, DOMAIN_NAME, INTERVAL_TYPE, INTERVAL_PRECISION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'FLATER' AND TABLE_NAME = 'USIG' AND COLUMN…

TEST:0574 PASS:0574 If either: completed successfully or ? WARNING - string data, right truncation?
=> unparsed: condition not read: right truncation
```

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES

TEST:0574 PASS:0574 If this COUNT = next COUNT?
=> unparsed: condition not read: this COUNT = next COUNT
```

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES A, INFORMATION_SCHEMA.USAGE_PRIVILEGES B WHERE A.GRANTOR = B.GRANTOR AND A.GRANTEE = B.GRANTEE AND A.OBJECT_SCHEMA = B.OBJECT_SCHEMA AND A.OBJECT_NAME = B.OBJECT_NAME AND A.OBJECT_TYPE = B.OBJECT_TYPE

TEST:0574 PASS:0574 If this COUNT = previous COUNT?
=> unparsed: condition not read: this COUNT = previous COUNT
```

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES WHERE GRANTOR = '_SYSTEM' AND GRANTEE = 'PUBLIC' AND OBJECT_SCHEMA = 'INFORMATION_SCHEMA' AND OBJECT_NAME = 'SQL_IDENTIFIER' AND OBJECT_TYPE = 'DOMAIN' AND IS_GRANTABLE = 'YES' AND PRIVILEGE_TYPE = 'USAGE'

TEST:0574 PASS:0574 If COUNT = 1?
=> expected count 1, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 29 checks in 1 tests

* 17 failed
* 12 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 296/339 `nist/sql/dml172.sql` (FLATER)

#### ☓ Ran 4 checks in 1 tests

* 4 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 297/339 `nist/sql/xts713.sql` (T7013PC)

#### ☓ Ran 16 checks in 1 tests

* 10 failed
* 37% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 298/339 `nist/sql/isi003.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS

TEST:0570 PASS:0570 If this COUNT(referneced as COUNT1) = next COUNT?
=> unparsed: condition not read: this COUNT(referneced as COUNT1) = next COUNT
```

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS A, INFORMATION_SCHEMA.COLUMNS B WHERE A.TABLE_SCHEMA = B.TABLE_SCHEMA AND A.TABLE_NAME = B.TABLE_NAME AND A.ORDINAL_POSITION = B.ORDINAL_POSITION

TEST:0570 PASS:0570 If this COUNT = previous COUNT1?
=> unparsed: condition not read: this COUNT = previous COUNT1
```

#### ☓ Ran 14 checks in 1 tests

* 11 failed
* 3 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 299/339 `nist/sql/isi004.sql` (FLATER)

```sql
SELECT DISTINCT SCHEMA_OWNER FROM INFORMATION_SCHEMA.SCHEMATA

TEST:0571 PASS:0571 If SCHEMA_OWNER = 'FLATER'?
=> expected SCHEMA_OWNER = 'FLATER', got error: Parse error on line 1: SELECT DISTINCT SCHEMA_OWNER FR ----------------^ Expecting 'LITERAL', 'BRALITERAL', 'KEY', 'OPEN', 'CLOSE', 'SEPARATOR', 'LPAR', 'NUMBER', 'STRING', 'SHARP', 'DOLLAR', 'AT', 'VALUE', 'COLON', 'NOT', 'IF', 'PLUS', 'STAR', 'QUESTION…
```

#### ☓ Ran 5 checks in 1 tests

* 3 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 300/339 `nist/sql/dml042.sql` (HU)

#### ★ Ran 2 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 301/339 `nist/sql/dml005.sql` (HU)

```sql
SELECT LONG_INT, LONG_INT /1000000, LONG_INT - 123456789000000. FROM LONGINT

TEST:0011 PASS:0011 If values are (123456789012345, 123456789, 12345), but? Second value may be between 123456788 and 123456790?
=> unparsed: condition not read: values are (123456789012345
```

#### ★ Ran 2 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 302/339 `nist/sql/dml043.sql` (HU)

#### ★ Ran 4 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 303/339 `nist/sql/dml044.sql` (HU)

```sql
SELECT STR110 FROM T4

TEST:0216 PASS:0216 If STR110 starts with 'This test is trying to test the '? and ends with 'limit on the total length of an index'?
=> unparsed: condition not read: STR110 starts with 'This test is trying to test the '
```

#### ★ Ran 6 checks in 2 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 50% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 304/339 `nist/sql/dml045.sql` (HU)

```sql
SELECT COL6,SUM(COL11),MAX(COL12) FROM T12 GROUP BY COL1,COL5,COL3,COL6,COL2,COL4 ORDER BY COL6 DESC

TEST:0218 PASS:0218 If 2 rows are selected and second COL6 = 0101010101 and ? second SUM(COL11) = 77 and second MAX(COL12) = 48?
=> unparsed: condition not read: second COL6 = 0101010101
```

```sql
SELECT COL5,SUM(COL11),MAX(COL12) FROM T12 GROUP BY COL9,COL5,COL7,COL4,COL3,COL8 ORDER BY COL5 DESC

TEST:0219 PASS:0219 If 2 rows are selected ? If row #1 COL5=88888889, SUM(COL11)=777, MAX(COL12)=448? If row #2 COL5=88888888, SUM(COL11)=333, MAX(COL12)=224?
=> unparsed: condition not read: row #1 COL5=88888889
```

#### ★ Ran 12 checks in 2 tests

* 2 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 305/339 `nist/sql/dml046.sql` (HU)

```sql
SELECT COL5,COL6,COL11,COL3,COL4,COL7,COL8 FROM T12 ORDER BY COL7,COL8,COL3,COL4,COL6,COL5 DESC

TEST:0220 PASS:0220 If 4 rows are selected and first row? COL5 = 88888882, COL6 = 0101010101 and COL11 = 33?
=> unparsed: condition not read: first row COL5 = 88888882
```

```sql
SELECT COL3,COL11,COL9,COL8,COL7,COL5,COL4 FROM T12 ORDER BY COL9,COL8,COL7,COL5,COL4,COL3

TEST:0221 PASS:0221 If 4 rows are selected ? If first row COL3 = 4441 and COL11 = 333?
=> unparsed: condition not read: first row COL3 = 4441
```

#### ★ Ran 12 checks in 2 tests

* 2 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 306/339 `nist/sql/dml047.sql` (HU)

#### ★ Ran 2 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 307/339 `nist/sql/dml050.sql` (HU)

#### ☓ Ran 1 checks in 1 tests

* 1 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 308/339 `nist/sql/dml049.sql` (HU)

#### ★ Ran 6 checks in 1 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 309/339 `nist/sql/dml055.sql` (HU)

#### ★ Ran 14 checks in 3 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 310/339 `nist/sql/dml056.sql` (HU)

#### ★ Ran 5 checks in 2 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 311/339 `nist/sql/cdr014.sql` (SUN)

#### ★ Ran 4 checks in 2 tests

* 100% of the checks and 100% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 312/339 `nist/sql/dml057.sql` (HU)

#### ★ Ran 18 checks in 3 tests

* 6 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 313/339 `nist/sql/cdr015.sql` (SUN)

#### ☓ Ran 5 checks in 3 tests

* 4 failed
* 20% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 314/339 `nist/sql/cdr016.sql` (SUN)

#### ☓ Ran 6 checks in 3 tests

* 3 failed
* 50% of the checks and 33% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 315/339 `nist/sql/cdr018.sql` (SUN)

```sql
UPDATE SIZ3_P10 SET F1 = 100 WHERE F1 = 8

TEST:0362 PASS:0362 If RI ERROR, children exist, 0 rows updated?
=> expected an error, got count 1
```

#### ☓ Ran 13 checks in 5 tests

* 8 failed
* 38% of the checks and 20% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 316/339 `nist/sql/cdr017.sql` (SUN)

#### ☓ Ran 17 checks in 7 tests

* 13 failed
* 23% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 317/339 `nist/sql/dml173.sql` (FLATER)

#### ☓ Ran 4 checks in 1 tests

* 3 failed
* 25% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 318/339 `nist/sql/dml169.sql` (FLATER)

```sql
CREATE TABLE FOO (C1 INT)

TEST:0877 PASS:0877 If table created successfully? If CREATE TABLE is flagged as non-Entry level?
=> unparsed: condition not read: CREATE TABLE is flagged as non-Entry level
```

```sql
SELECT COUNT(*) FROM HU.STAFF WHERE 1 IS NOT NULL

TEST:0877 PASS:0877 If COUNT = 5? If literal with <null predicate> flagged as non_Entry?
=> unparsed: condition not read: literal with <null predicate> flagged as non_Entry
```

```sql
SELECT CURRENT_USER FROM HU.ECCO

TEST:0877 PASS:0877 If statement completed successfully? If CURRENT_USER is flagged as non-Entry level?
=> unparsed: condition not read: CURRENT_USER is flagged as non-Entry level
```

```sql
INSERT INTO HU.STAFF VALUES ( 'EX ', 'Harvey Wallbanger', 15, 'Detroit')

TEST:0877 PASS:0877 If 1 row inserted successfully? If CHAR(4) literal 'EX ' stored as CHAR(3) column ? value is flagged as non_Entry level ?
=> unparsed: condition not read: CHAR(4) literal 'EX  ' stored as CHAR(3) column   value is flagged as non_Entry level
```

#### ★ Ran 4 checks in 1 tests

* 4 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 319/339 `nist/sql/dml106.sql` (FLATER)

```sql
SELECT COUNT(*) FROM TSSMALL WHERE EXTRACT (YEAR FROM SMALLD) = EXTRACT (YEAR FROM SMALLTS)

TEST:0613 PASS:0613 If count = 1?
=> expected count 1, got error: Parse error on line 3: ...WHEREEXTRACT (YEAR FROM SMALLD) = EXTRA ----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR', 'RB…
```

#### ☓ Ran 37 checks in 5 tests

* 20 failed
* 3 not read (condition text the runner does not understand)
* 41% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 320/339 `nist/sql/isi002.sql` (FLATER)

```sql
SELECT CHECK_OPTION, IS_UPDATABLE FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'FLATER' AND TABLE_NAME = 'DV1'

TEST:0569 PASS:0569 If CHECK_OPTION = 'NONE'? If IS_UPDATABLE = 'YES'?
=> expected CHECK_OPTION = 'NONE', got no rows
```

```sql
SELECT CHECK_OPTION, IS_UPDATABLE FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'FLATER' AND TABLE_NAME = 'VS5'

TEST:0569 PASS:0569 IF CHECK_OPTION = 'NONE'? If IS_UPDATABLE = 'NO'?
=> expected CHECK_OPTION = 'NONE', got no rows
```

#### ☓ Ran 17 checks in 1 tests

* 13 failed
* 2 not read (condition text the runner does not understand)
* 13% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 321/339 `nist/sql/dml177.sql` (FLATER)

#### ☓ Ran 28 checks in 2 tests

* 2 failed
* 92% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 322/339 `nist/sql/isi005.sql` (FLATER)

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_PRIVILEGES WHERE GRANTOR IS NULL OR GRANTEE IS NULL OR TABLE_SCHEMA IS NULL OR TABLE_NAME IS NULL OR PRIVILEGE_TYPE IS NULL

TEST:0572 PASS:0572 If CIUNT = 0?
=> expected CIUNT = 0, got error: Unknown INFORMATION_SCHEMA table
```

```sql
SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_PRIVILEGES WHERE GRANTOR = 'FLATER' AND GRANTEE = 'SCHANZLE' AND IS_GRANTABLE = 'NO' AND TABLE_SCHEMA = 'FLATER' AND TABLE_NAME = 'WCOV' AND PRIVILEGE_TYPE = 'REFERENCES'

TEST:0572 PASS:0572 If COUNT = 1?
=> expected count 1, got error: Unknown INFORMATION_SCHEMA table
```

#### ☓ Ran 17 checks in 1 tests

* 15 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 323/339 `nist/sql/dml179.sql` (FLATER)

```sql
SELECT CHAR_LENGTH (NAAM) + CHAR_LENGTH (ADDRESS) + CHAR_LENGTH (KEYWORDS) + CHAR_LENGTH (FUNCTION1) + CHAR_LENGTH (FUNCTION2) + CHAR_LENGTH (DESCRIPT1) + CHAR_LENGTH (DESCRIPT2) + CHAR_LENGTH (DESCRIPT3) + 22 FROM T0892 WHERE INTKEY = 0

TEST:0892 PASS:0892 If CHAR_LENGTH = 8000?
=> expected CHAR_LENGTH = 8000, got error: alasql.fn["CHAR_LENGTH"] is not a function. (In 'alasql.fn["CHAR_LENGTH"](p['T0892']['NAAM'])', 'alasql.fn["CHAR_LENGTH"]' is undefined)
```

#### ☓ Ran 6 checks in 1 tests

* 3 failed
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 324/339 `nist/sql/isi006.sql` (FLATER)

#### ☓ Ran 15 checks in 1 tests

* 13 failed
* 2 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 325/339 `nist/sql/dml182.sql` (FLATER)

```sql
SELECT CODE1, CODE2, CODE3, CODE4, CODE5, CODE6, CODE7, CODE8, CODE9, CODE10, CODE11, CODE12, CODE13, CODE14, CODE15, AVG(COST) FROM ID_ORDERS GROUP BY CODE1, CODE2, CODE3, CODE4, CODE5, CODE6, CODE7, CODE8, CODE9, CODE10, CODE11, CODE12, CODE13, CODE14, CODE15 ORDER BY CODE1, CODE2, CODE3, CODE4, …

TEST:0895 PASS:0895 If 2 rows are returned? avg(cost) ========= If 24.95 (+ or - 0.01) ? If 9.95 (+ or - 0.01) ?
=> unparsed: condition not read: 24.95 (+ or - 0.01)
```

```sql
DROP TABLE ORDERS CASCADE

TEST:0895 PASS:0895 If table dropped successfully?
=> expected success, got error: Parsing halted while starting to recover from another error.
```

#### ☓ Ran 7 checks in 1 tests

* 2 failed
* 1 not read (condition text the runner does not understand)
* 66% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 326/339 `nist/sql/dml132.sql` (FLATER)

#### ★ Ran 14 checks in 3 tests

* 2 not read (condition text the runner does not understand)
* 100% of the checks and 66% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 327/339 `nist/sql/cdr031.sql` (FLATER)

#### ☓ Ran 5 checks in 1 tests

* 2 failed
* 60% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 328/339 `nist/sql/dml186.sql` (FLATER)

```sql
SELECT EXTRACT (YEAR FROM C1), EXTRACT (MONTH FROM C2), EXTRACT (DAY FROM C3), EXTRACT (HOUR FROM C4), EXTRACT (MINUTE FROM C5), EXTRACT (SECOND FROM C6), EXTRACT (SECOND FROM C7) FROM TIMEPREC

TEST:0899 PASS:0899 If int1 = 9999999? If int2 = 9999999? If int3 = 9999999? If int4 = 9999999? If int5 = 9999999? If int6 = 9999999? If int7 = 9999999?
=> expected int1 = 9999999, got error: Parse error on line 1: ...ELECT EXTRACT (YEAR FROM C1), EXTRA -----------------------^ Expecting 'EOF', 'COMMA', 'RPAR', 'IN', 'LIKE', 'ARROW', 'DOT', 'CARET', 'EQ', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'AND', 'OR', 'PLUS', 'STAR',…
```

#### ☓ Ran 6 checks in 1 tests

* 6 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 329/339 `nist/sql/flg009.sql` (HU)

#### ☓ Ran 3 checks in 1 tests

* 3 failed
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 330/339 `nist/sql/dml068.sql` (HU)

```sql
SELECT * FROM AA ORDER BY CHARTEST

TEST:0389 PASS:0389 If character in 1st position matches ? description in positions 2-4 ? If ASCII, then ORDER is: space followed by characters? !"#$%&'()*+,-./09:;<=>?@AZ[\]^_`az{|}~ ?
=> unparsed: condition not read: character in 1st position matches                  description in positions 2-4
```

#### ★ Ran 2 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 100% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 331/339 `nist/sql/dml084.sql` (SCHANZLE)

```sql
SELECT COUNT(*) FROM HU.STAFF WHERE GRADE < (SELECT MAX(HOURS) FROM HU.WORKS) OR GRADE > (SELECT MAX(NUMKEY) FROM HU.UPUNIQ) OR GRADE + 100 > (SELECT MIN(HOURS) FROM HU.WORKS)

TEST:0503 PASS:0503 If ERROR, syntax error or access rule violation? 0 rows selected OR SQLSTATE = 42000 OR SQLCODE < 0?
=> expected an error, got 1 rows
```

#### ☓ Ran 12 checks in 2 tests

* 6 failed
* 5 not read (condition text the runner does not understand)
* 14% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 332/339 `nist/sql/cdr025.sql` (SUN)

#### ☓ Ran 5 checks in 3 tests

* 2 failed
* 1 not read (condition text the runner does not understand)
* 50% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 333/339 `nist/sql/dml176.sql` (FLATER)

#### ☓ Ran 5 checks in 1 tests

* 4 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 334/339 `nist/sql/dml174.sql` (FLATER)

#### ☓ Ran 5 checks in 1 tests

* 4 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 335/339 `nist/sql/dml175.sql` (FLATER)

```sql
SELECT COUNT(*) FROM CONTACTS WHERE DESCRIPTION LIKE N'%gra' AND KEYWORDS LIKE N'%magnetic'

TEST:0887 PASS:0887 If COUNT = 1?
=> expected count 1, got 0
```

#### ☓ Ran 5 checks in 1 tests

* 4 failed
* 20% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 336/339 `nist/sql/dml178.sql` (FLATER)

```sql
SELECT C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18, C19, C20, C21, C22, C23, C24, C25, C26, C27, C28, C29, C30, C31, C32, C33, C34, C35, C36, C37, C38, C39, C40, C41, C42, C43, C44, C45, C46, C47, C48, C49, C50, C51, C52, C53, C54, C55, C56, C57, C58, C59, C60, C…

TEST:0891 PASS:0891 If 250 values are returned with values from 2 thru 251?
=> unparsed: condition not read: 250 values are returned with values from 2 thru 251
```

#### ☓ Ran 5 checks in 1 tests

* 1 failed
* 1 not read (condition text the runner does not understand)
* 75% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 337/339 `nist/sql/dml181.sql` (FLATER)

```sql
SELECT FIRSTNAME, LASTNAME, AVG(COST) FROM PEOPLE_ORDERS GROUP BY LASTNAME, FIRSTNAME ORDER BY LASTNAME, FIRSTNAME

TEST:0894 PASS:0894 If aaaaaaaa.... bbbbbbbb.... 24.95 (+ or - 0.01)? If cccccccc.... dddddddd.... 9.95 (+ or - 0.01)?
=> unparsed: condition not read: aaaaaaaa....    bbbbbbbb....  24.95 (+ or - 0.01)
```

#### ☓ Ran 12 checks in 1 tests

* 8 failed
* 1 not read (condition text the runner does not understand)
* 27% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 338/339 `nist/sql/dml183.sql` (FLATER)

```sql
SELECT EMPNUM, CASE GRADE WHEN 0 THEN 1000 WHEN 1 THEN 997 WHEN 2 THEN 994 WHEN 3 THEN 991 WHEN 4 THEN 988 WHEN 5 THEN 985 WHEN 6 THEN 982 WHEN 7 THEN 979 WHEN 8 THEN 976 WHEN 9 THEN 973 WHEN 10 THEN 970 WHEN 11 THEN 967 WHEN 12 THEN 964 WHEN 13 THEN 961 WHEN 14 THEN 958 WHEN 15 THEN 955 WHEN 16 TH…

TEST:0896 PASS:0896 If empnum = 'E2' and casgrd = 970?
=> unresolved: no column casgrd in EMPNUM, CASE GRADE WHEN 0 THEN 1000, WHEN 1 THEN 997, WHEN 2 THEN 994, WHEN 3 THEN 991, WHEN 4 THEN 988, WHEN 5 THEN 985, WHEN 6 THEN 982, WHEN 7 THEN 979, WHEN 8 THEN 976, WHEN 9 THEN 973, WHEN 10 THEN 970, WHEN 11 THEN 967, WHEN 12 THEN 964, WHEN 13 THEN 961, WHEN 14 THEN 958,…
```

```sql
SELECT EMPNUM, CASE WHEN GRADE = 0 THEN 1000 WHEN GRADE = 1 THEN 997 WHEN GRADE = 2 THEN 994 WHEN GRADE = 3 THEN 991 WHEN GRADE = 4 THEN 988 WHEN GRADE = 5 THEN 985 WHEN GRADE = 6 THEN 982 WHEN GRADE = 7 THEN 979 WHEN GRADE = 8 THEN 976 WHEN GRADE = 9 THEN 973 WHEN GRADE = 11 THEN 967 WHEN GRADE = …

TEST:0896 PASS:0896 If empnum = 'E2' and casgrd = 970?
=> unresolved: no column casgrd in EMPNUM, CASE  WHEN GRADE = 0 THEN 1000, WHEN GRADE = 1 THEN 997, WHEN GRADE = 2 THEN 994, WHEN GRADE = 3 THEN 991, WHEN GRADE = 4 THEN 988, WHEN GRADE = 5 THEN 985, WHEN GRADE = 6 THEN 982, WHEN GRADE = 7 THEN 979, WHEN GRADE = 8 THEN 976, WHEN GRADE = 9 THEN 973, WHEN GRADE = 1…
```

#### ★ Ran 2 checks in 1 tests

* 2 not resolved (the condition names a column the result does not have)
* 0% of the checks and 0% of the tests were OK


---- ---- ---- ---- ---- ---- ----
### 339/339 `nist/sql/flg006.sql` (MCGINN)

```sql
SELECT COL3 FROM VIEWABCDEFGHIKLMN19

TEST:0299 PASS:0299 If the value 299 is selected by any of SQL SELECTs above?
=> unparsed: condition not read: the value 299 is selected by any of SQL SELECTs above
```

#### ★ Ran 1 checks in 1 tests

* 1 not read (condition text the runner does not understand)
* 0% of the checks and 0% of the tests were OK


-----------------------------

## Final result

* `alasql@4.20.0` (Bun 1.4.3)
* Test files: 339
* Checks: 3,570: 1,374 passed, 1,872 failed, 313 not read, 11 not resolved
* Tests (TEST:nnnn, all checks pass): 168 of 675
* ROLLBACK emulated 688 times (20 by rebuilding after DDL)
* Final score: 42 % of the checks and 24 % of the tests were OK

Total script time: 20.9s

_Repeated failures are sampled; run with --printAllErrors to see every one, or --debug for results/debug.jsonl_
