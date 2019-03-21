'use strict';

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var setA = a instanceof Set
      , setB = b instanceof Set;
    if (setA != setB) return false;
    if (setA && setB) {
      if (a.size !== b.size) return false;
      var bSetIter = b.keys();
      var bSetNext;
      // Sets are ordered, so ensure elements appear in the same order
      for (var item of a) {
        bSetNext = bSetIter.next();
        if (!equal(item, bSetNext.value)) return false;
      }
      return true;
    }

    var mapA = a instanceof Map
      , mapB = b instanceof Map;
    if (mapA != mapB) return false;
    if (mapA && mapB) {
      if (a.size !== b.size) return false;
      var bMapIter = b.entries();
      var bMapNext;
      // Maps are ordered, so ensure elements appear in the same order
      for (var entry of a) {
        bMapNext = bMapIter.next();
        if (!equal(entry, bMapNext.value)) return false;
      }
      return true;
    }

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a!==a && b!==b;
};
