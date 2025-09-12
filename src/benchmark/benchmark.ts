import { deepStrictEqual as assertDeepStrictEqual } from 'assert';
import { fastDeepEqual } from '../fastDeepEqual';
import { fastDeepEqualJson } from '../fastDeepEqualJson';
import { deepEqual as jsonJoyDeepEqual } from 'json-joy/lib/json-equal/deepEqual';
import { isEqual as lodashIsEqual } from 'lodash';
import { equals as ramdaEquals } from 'ramda';
// @ts-expect-error No types
import nanoEq from 'nano-equal';
// @ts-expect-error No types
import shallowEqualFuzzy from 'shallow-equal-fuzzy';
import deepEqual from 'deep-equal';
// @ts-expect-error No types
import deepEql from 'deep-eql';
import tests from '../spec/tests';
import Benchmark from 'benchmark';
const suite = new Benchmark.Suite;

/* eslint-disable no-console */

type EqFn = (a: unknown, b: unknown) => boolean;

const equalPackages: Record<string, EqFn> = {
  'fast-deep-equal': fastDeepEqual,
  'fast-deep-equal/json': fastDeepEqualJson,
  'json-joy/json-equal': jsonJoyDeepEqual,
  'nano-equal': nanoEq,
  'shallow-equal-fuzzy': shallowEqualFuzzy,
  'lodash.isEqual': lodashIsEqual,
  'deep-equal': deepEqual,
  'deep-eql': deepEql,
  'assert.deepStrictEqual': (a: unknown, b: unknown) => {
    try { assertDeepStrictEqual(a, b); return true; }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(e) { return false; }
  },
  'ramda.equals': ramdaEquals,
};

for (const equalName in equalPackages) {
  const equalFunc = equalPackages[equalName] ;

  for (const testSuite of tests) {
    for (const test of testSuite.tests) {
      try {
        if (equalFunc(test.value1, test.value2) !== test.equal) {
          console.error('different result', equalName, testSuite.description, test.description);
        }
      } catch(e) {
        console.error(equalName, testSuite.description, test.description, e);
      }
    }
  }

  suite.add(equalName, function() {
    for (const testSuite of tests) {
      for (const test of testSuite.tests) {
        if (test.description != 'pseudo array and equivalent array are not equal') {
          equalFunc(test.value1, test.value2);
        }
      }
    }
  });
}

console.log();

suite
  .on('cycle', (event: { target: unknown }) => console.log(String(event.target)))
  .on('complete', function () {
    // @ts-ignore
    // eslint-disable-next-line no-invalid-this
    console.log('The fastest is ' + this.filter('fastest').map('name'));
  })
  .run({async: true});
