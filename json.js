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

    if (aKeys.length != keyList(b).length) {
      return false;
    }

    return true;
  }

  return a!==a && b!==b;
};
