'use strict';

const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) {
    return true;
  }

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (isArray(a)) {
      if (isArray(b)) {
        if (a.length != b.length) {
          return false;
        }
        for (let i = a.length; i-- != 0;) {
          if (!equal(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    } else if (isArray(b)) {
      return false;
    }

    if (a instanceof Date) {
      if (b instanceof Date) {
        return a.getTime() == b.getTime();
      }
      return false;
    } else if (b instanceof Date) {
      return false;
    }

    if (a instanceof RegExp) {
      if (b instanceof RegExp) {
        return a.toString() == b.toString();
      }
      return false;
    } else if (b instanceof RegExp) {
      return false;
    }

    if (a instanceof Set) {
      if (b instanceof Set) {
        if (a.size !== b.size) {
          return false;
        }
        const bSetIter = b.keys();
        let bSetNext, aItem;
        // Sets are ordered, so ensure elements appear in the same order
        for (aItem of a) {
          bSetNext = bSetIter.next();
          if (!equal(aItem, bSetNext.value)) {
            return false;
          }
        }
        return true;
      }
      return false;
    } else if (b instanceof Set) {
      return false;
    }

    if (a instanceof Map) {
      if (b instanceof Map) {
        if (a.size !== b.size) {
          return false;
        }
        const bMapIter = b.entries();
        let bMapNext, aEntry;
        // Maps are ordered, so ensure elements appear in the same order
        for (aEntry of a) {
          bMapNext = bMapIter.next();
          if (!equal(aEntry, bMapNext.value)) {
            return false;
          }
        }
        return true;
      }
      return false;
    } else if (b instanceof Map) {
      return false;
    }

    const aKeys = keyList(a);
    let key = '';
    for (let i = aKeys.length; i-- != 0;) {
      key = aKeys[i];
      if (!hasProp.call(b, key)) {
        return false;
      }
      if (!equal(a[key], b[key])) {
        return false;
      }
    }

    if (aKeys.length !== keyList(b).length) {
      return false;
    }

    return true;
  }

  return a!==a && b!==b;
};
