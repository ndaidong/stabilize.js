/**
 * stabilize.js
 * @ndaidong
 **/

const UNDEF = undefined; // eslint-disable-line no-undefined

import {
  isArray,
  isObject,
  isString,
  hasProperty
} from 'bellajs';

var defProp = (o, key, val = UNDEF, opt = {}) => {
  let {
    enumerable = false,
    configurable = false,
    writable = false,
    value = val
  } = opt;
  Object.defineProperty(o, key, {
    enumerable,
    configurable,
    writable,
    value
  });
  return o;
};

var random = (min, max) => {
  let offset = min;
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + offset;
};

var astabilize, ostabilize;

export var stabilize = (data) => {
  if (isArray(data)) {
    return astabilize(data);
  }
  if (isObject(data)) {
    return ostabilize(data);
  }
  return data;
};

astabilize = (data) => {

  let a = [...data];

  let unique = () => {
    let arr = [...a];
    let r = [];
    for (let i = 0; i < arr.length; i++) {
      if (r.indexOf(arr[i]) === -1) {
        r.push(arr[i]);
      }
    }
    return stabilize(r);
  };

  let min = () => {
    return Math.min.apply({}, a);
  };

  let max = () => {
    return Math.max.apply({}, a);
  };

  let first = () => {
    let r = [...a][0];
    return stabilize(r);
  };

  let last = () => {
    let r = [...a][a.length - 1];
    return stabilize(r);
  };

  let insert = (at = 0, ...items) => {
    let r = [...a];
    let p0 = r.slice(0, at);
    let p1 = r.slice(at, r.length);
    return stabilize([].concat(p0, ...items, p1));
  };

  let append = (...items) => {
    return insert(a.length, items);
  };

  let remove = (start = 0, count = 0) => {
    let r = [...a.slice(0, start), ...a.slice(start + count)];
    return stabilize(r);
  };

  let isort = (fn) => {
    let r = [...a].sort(fn);
    return stabilize(r);
  };

  let msort = (o = 1) => {
    let r = [...a];
    let one = r[0];
    if (o === 1 || o === -1) {
      r.sort((m, n) => {
        return m > n ? o : m < n ? -1 * o : 0; // eslint-disable-line no-nested-ternary
      });
    }
    if (isString(o) && hasProperty(one, o)) {
      r.sort((m, n) => {
        return m[o] > n[o] ? 1 : m[o] < n[o] ? -1 : 0; // eslint-disable-line no-nested-ternary
      });
    }
    if (isObject(o)) {
      for (let key in o) {
        if (hasProperty(one, key)) {
          let order = o[key] === -1 ? -1 : 1;
          /*eslint-disable*/
          r.sort((m, n) => {
            return (m[key] > n[key]) ? order : (m[key] < n[key] ? (-1 * order) : 0);
          });
          /*eslint-enable*/
        }
      }
    }
    return stabilize(r);
  };

  let ireverse = () => {
    let r = [...a].reverse();
    return stabilize(r);
  };

  let shuffle = () => {
    return isort(() => {
      return Math.random() - 0.5;
    });
  };

  let pick = (count = 1) => {
    let b = a.shuffle();
    let c = Math.max(Math.min(count, b.length), 1);
    if (c >= b.length) {
      return b;
    }

    if (c === 1) {
      let ri = random(0, b.length - 1);
      return b[ri];
    }

    return stabilize(b.splice(0, c));
  };

  let addMethods = (met) => {
    defProp(a, met[0], met[1]);
  };

  [
    ['min', min],
    ['max', max],
    ['unique', unique],
    ['first', first],
    ['last', last],
    ['pick', pick],
    ['insert', insert],
    ['append', append],
    ['remove', remove],
    ['isort', isort],
    ['msort', msort],
    ['ireverse', ireverse],
    ['shuffle', shuffle]
  ].map(addMethods);

  return a;
};

ostabilize = (data) => {

  let o = Object.create({});

  let setProp = (key) => {
    defProp(o, key, data[key], {
      enumerable: true
    });
  };

  Object.keys(data).map(setProp);

  defProp(o, 'get', (k) => {
    return o[k];
  });

  defProp(o, 'set', (key, value = false) => {
    let a = Object.assign({}, o);
    let _set = (k, v) => {
      a[k] = v;
    };
    if (isObject(key)) {
      Object.keys(key).forEach((k) => {
        _set(k, key[k]);
      });
    } else {
      _set(key, value);
    }
    return stabilize(a);
  });

  return o;
};
