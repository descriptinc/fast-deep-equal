'use strict';

import fastDeepEqual from "../fastDeepEqual";
import tests from './tests';
import assert from 'assert';

describe('fastDeepEqual', function() {
  tests.forEach(function (suite) {
    describe(suite.description, function() {
      suite.tests.forEach(function (test) {
        it(test.description, function() {
          assert.strictEqual(fastDeepEqual(test.value1, test.value2), test.equal);
          assert.strictEqual(fastDeepEqual(test.value2, test.value1), test.equal);
        });
      });
    });
  });
});
