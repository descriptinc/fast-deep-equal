const isArray = Array.isArray;
const hasProp = Object.prototype.hasOwnProperty;

export function fastDeepEqualJson(a: unknown, b: unknown): boolean {
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
          if (!fastDeepEqualJson(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    } else if (isArray(b)) {
      return false;
    }

    // a and b have same ownprops
    let key = '';
    for (key in a) {
      if (hasProp.call(a, key)) {
        if (!hasProp.call(b, key)) {
          return false;
        }
      }
    }

    // values of `a` are same as values of `b`
    let count = 0;
    for (key in a) {
      if (hasProp.call(a, key)) {
        if (!fastDeepEqualJson(a[key], b[key])) {
          return false;
        }
        count++;
      }
    }

    // `a` has same number of properties as `b`
    for (key in b) {
      if (hasProp.call(b, key)) {
        count--;
      }
    }
    return count == 0;
  }

  return a!==a && b!==b;
};
