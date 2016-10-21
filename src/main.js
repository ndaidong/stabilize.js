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
      return astabilize(r);
    };

    let first = () => {
      let r = [...a][0];
      return astabilize(r);
    };

    let last = () => {
      let r = [...a][a.length - 1];
      return astabilize(r);
    };

    let pop = () => {
      let r = a.slice(0, -1);
      return astabilize(r);
    };

    let shift = () => {
      let r = a.slice(1);
      return astabilize(r);
    };

    let push = (item) => {
      let r = [...a, item];
      return astabilize(r);
    };

    let unshift = (item) => {
      let r = [item, ...a];
      return astabilize(r);
    };

    let splice = (start, deleteCount, ...items) => {
      let r = [...a.slice(0, start), ...items, ...a.slice(start + deleteCount)];
      return astabilize(r);
    };

    let reverse = () => {
      let r = [...a].reverse();
      return astabilize(r);
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
      ['first', first],
      ['last', last],
      ['pop', pop],
      ['shift', shift],
      ['push', push],
      ['unshift', unshift],
      ['splice', splice],
      ['reverse', reverse],
      ['unique', unique]
    ].map(addMethods);

    return a;
  };

  var stabilize = (data = {}) => {

    if (Array.isArray(data)) {
      return astabilize(data);
    }

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

  return stabilize;
});
