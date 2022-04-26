# mutation-testing

Mutation testing example with Stryker and Jest

## Steps

Set up npm package:

```
npm init -y
```

Create `index.js` file:

```js
/**
 * @param {number} age
 * @return {boolean}
 */
function isAdult(age) {
  return age >= 18;
}

module.exports = {
  isAdult,
};
```

Install Jest:

```
npm install --save-dev jest
```

Create `index.spec.js` file:

```js
const { isAdult } = require("./index");

describe('isAdult', () => {
  it('should return true for 21', () => {
    expect(isAdult(21)).toBe(true);
  });

  it('should return false for 12', () => {
    expect(isAdult(12)).toBe(false);
  });
});
```

Change `test` script in `package.json` file:

```json
{
  "test": "jest"
}
```

Run tests:

```
npm run test
```

```
 PASS  ./index.spec.js
  isAdult
    ✓ should return true for 21 (2 ms)
    ✓ should return false for 12

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

Add new script to `package.json` file:

```json
{
  "test:cov": "jest --coverage"
}
```

Show coverage:

```
npm run test:cov
```

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 index.js |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```

Install stryker:

```
npm install --save-dev @stryker-mutator/core
```

Setup stryker with CLI:

```
npx stryker init
```

> :exclamation: Set `coverageAnalysis` to `off` for using with Jest!

Or create `stryker.conf.json` file:

```json
{
  "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  "packageManager": "npm",
  "reporters": ["clear-text"],
  "testRunner": "jest",
  "coverageAnalysis": "off",
  "mutate": ["./index.js"]
}
```

Add new script to `package.json` file:

```json
{
  "test:mutate": "stryker run"
}
```

Run mutation tests:

```
npm run test:mutate
```

```
All tests/index.spec.js
  ✓ isAdult should return true for 21 [line 4] (killed 4)
  ✓ isAdult should return false for 12 [line 8] (killed 1)

#3. [Survived] EqualityOperator
index.js:6:10
-     return age >= 18;
+     return age > 18;
Ran all tests for this mutant.

Ran 2.00 tests per mutant on average.
----------|---------|----------|-----------|------------|----------|---------|
File      | % score | # killed | # timeout | # survived | # no cov | # error |
----------|---------|----------|-----------|------------|----------|---------|
All files |   83.33 |        5 |         0 |          1 |        0 |       0 |
 index.js |   83.33 |        5 |         0 |          1 |        0 |       0 |
----------|---------|----------|-----------|------------|----------|---------|
```

Add additional test to `index.spec.js`:

```js
it('should return true for 18', () => {
  expect(isAdult(18)).toBe(true);
});
```

Rerun mutation tests:

```
npm run test:mutate
```

```
All tests/index.spec.js
  ✓ isAdult should return true for 21 [line 4] (killed 4)
  ✓ isAdult should return false for 12 [line 8] (killed 1)
  ✓ isAdult should return true for 18 [line 12] (killed 1)

Ran 3.00 tests per mutant on average.
----------|---------|----------|-----------|------------|----------|---------|
File      | % score | # killed | # timeout | # survived | # no cov | # error |
----------|---------|----------|-----------|------------|----------|---------|
All files |  100.00 |        6 |         0 |          0 |        0 |       0 |
 index.js |  100.00 |        6 |         0 |          0 |        0 |       0 |
----------|---------|----------|-----------|------------|----------|---------|
```
