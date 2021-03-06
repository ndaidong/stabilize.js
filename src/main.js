/**
 * stabilize.js
 * @ndaidong
 **/

const UNDEF = undefined; // eslint-disable-line no-undefined

import {
  isArray,
  isObject,
  isString,
  hasProperty,
} from 'bellajs';

const defProp = (o, key, val = UNDEF, opt = {}) => {
  const {
    enumerable = false,
    configurable = false,
    writable = false,
    value = val,
  } = opt;
  Object.defineProperty(o, key, {
    enumerable,
    configurable,
    writable,
    value,
  });
  return o;
};

const random = (min, max) => {
  const offset = min;
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + offset;
};

export const stabilize = (data) => {
  if (isArray(data)) {
    return astabilize(data); // eslint-disable-line
  }
  if (isObject(data)) {
    return ostabilize(data); // eslint-disable-line
  }
  return data;
};


const astabilize = (data) => {
  const a = [...data];

  const unique = () => {
    const arr = [...a];
    const r = [];
    for (let i = 0; i < arr.length; i++) {
      if (r.indexOf(arr[i]) === -1) {
        r.push(arr[i]);
      }
    }
    return stabilize(r);
  };

  const min = () => {
    return Math.min.apply({}, a);
  };

  const max = () => {
    return Math.max.apply({}, a);
  };

  const first = () => {
    const r = [...a][0];
    return stabilize(r);
  };

  const last = () => {
    const r = [...a][a.length - 1];
    return stabilize(r);
  };

  const insert = (at = 0, ...items) => {
    const r = [...a];
    const p0 = r.slice(0, at);
    const p1 = r.slice(at, r.length);
    return stabilize([].concat(p0, ...items, p1));
  };

  const append = (...items) => {
    return insert(a.length, items);
  };

  const remove = (start = 0, count = 0) => {
    const r = [...a.slice(0, start), ...a.slice(start + count)];
    return stabilize(r);
  };

  const isort = (fn) => {
    const r = [...a].sort(fn);
    return stabilize(r);
  };

  const msort = (o = 1) => {
    const r = [...a];
    const one = r[0];
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
      for (const key in o) {
        if (hasProperty(one, key)) {
          const order = o[key] === -1 ? -1 : 1;
          /* eslint-disable */
          r.sort((m, n) => {
            return (m[key] > n[key]) ? order : (m[key] < n[key] ? (-1 * order) : 0);
          });
          /* eslint-enable */
        }
      }
    }
    return stabilize(r);
  };

  const ireverse = () => {
    const r = [...a].reverse();
    return stabilize(r);
  };

  const shuffle = () => {
    return isort(() => {
      return Math.random() - 0.5;
    });
  };

  const pick = (count = 1) => {
    const b = a.shuffle();
    const c = Math.max(Math.min(count, b.length), 1);
    if (c >= b.length) {
      return b;
    }

    if (c === 1) {
      const ri = random(0, b.length - 1);
      return b[ri];
    }

    return stabilize(b.splice(0, c));
  };

  const addMethods = (met) => {
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
    ['shuffle', shuffle],
  ].map(addMethods);

  return a;
};

const ostabilize = (data) => {
  const o = Object.create({});

  const setProp = (key) => {
    defProp(o, key, data[key], {
      enumerable: true,
    });
  };

  Object.keys(data).map(setProp);

  defProp(o, 'get', (k) => {
    return o[k];
  });

  defProp(o, 'set', (key, value = false) => {
    const a = Object.assign({}, o);
    const _set = (k, v) => {
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
