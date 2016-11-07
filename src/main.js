/**
 * stabilize.js
 * @ndaidong
 **/

((name, factory) => {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    let root = window || global || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('stabilize', () => {

  const MAX_NUMBER = 9007199254740991;

  var stabilize;

  var isArray = (val) => {
    return Array.isArray(val);
  };

  var isObject = (val) => {
    return val !== null && typeof val === 'object' && isArray(val) === false;
  };

  var random = (min, max) => {
    if (!min || min < 0) {
      min = 0;
    }
    if (!max) {
      max = MAX_NUMBER;
    }
    if (min === max) {
      return max;
    }
    if (min > max) {
      min = Math.min(min, max);
      max = Math.max(min, max);
    }
    let offset = min;
    let range = max - min + 1;
    return Math.floor(Math.random() * range) + offset;
  };

  var astabilize = (data = []) => {

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

      let d = [];

      while (d.length < c) {
        let i = random(0, b.length - 1);
        d.push(b[i]);
        b = b.splice(i, 1);
      }
      return d;
    };

    let addMethods = (met) => {
      Object.defineProperty(a, met[0], {
        enumerable: false,
        configurable: false,
        writable: false,
        value: met[1]
      });
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
      ['ireverse', ireverse],
      ['shuffle', shuffle]
    ].map(addMethods);

    return a;
  };

  var ostabilize = (data = {}) => {

    let o = Object.create({});

    let config = {
      enumerable: true,
      configurable: false,
      writable: false,
      value: 'undefined'
    };

    let setProp = (key) => {
      let c = Object.assign({}, config);
      c.value = data[key];
      Object.defineProperty(o, key, c);
    };

    Object.keys(data).map(setProp);

    Object.defineProperty(o, 'get', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: (k) => {
        return o[k];
      }
    });

    Object.defineProperty(o, 'set', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: (key, value = false) => {
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
      }
    });

    return o;
  };

  stabilize = (data) => {
    if (isArray(data)) {
      return astabilize(data);
    }
    if (isObject(data)) {
      return ostabilize(data);
    }
    return data;
  };

  return stabilize;
});
