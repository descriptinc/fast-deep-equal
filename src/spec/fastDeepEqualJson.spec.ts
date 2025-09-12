'use strict';

import { fastDeepEqualJson } from '../fastDeepEqualJson';
import tests from './tests';
import assert from 'assert';

describe('fastDeepEqualJson', function() {
  tests.forEach(function (suite) {
    if (suite.json === false) {
      // this test should not pass for json; skipping
      return;
    }
    describe(suite.description, function() {
      suite.tests.forEach(function (test) {
        it(test.description, function() {
          assert.strictEqual(fastDeepEqualJson(test.value1, test.value2), test.equal);
          assert.strictEqual(fastDeepEqualJson(test.value2, test.value1), test.equal);
        });
      });
    });
  });
});
