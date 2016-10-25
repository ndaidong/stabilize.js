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

  var stabilize;

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

    let addMethods = (met) => {
      Object.defineProperty(a, met[0], {
        enumerable: false,
        configurable: false,
        writable: false,
        value: met[1]
      });
    };

    [
      ['unique', unique],
      ['first', first],
      ['last', last],
      ['insert', insert],
      ['append', append],
      ['remove', remove],
      ['isort', isort],
      ['ireverse', ireverse]
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
        if (key instanceof Object) {
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
    if (Array.isArray(data)) {
      return astabilize(data);
    }
    if (data instanceof Object) {
      return ostabilize(data);
    }
    return data;
  };

  return stabilize;
});
