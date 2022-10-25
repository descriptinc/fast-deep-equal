'use strict';

var equal = require('../json');
var tests = require('./tests');
var assert = require('assert');


describe('json equal', function() {
  tests.forEach(function (suite) {
    if (suite.json === false) {
      // this test should not pass for json; skipping
      return;
    }
    describe(suite.description, function() {
      suite.tests.forEach(function (test) {
        it(test.description, function() {
          assert.strictEqual(equal(test.value1, test.value2), test.equal);
        });
      });
    });
  });
});
