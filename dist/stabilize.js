/**
 * stabilize.js
 * v1.2.16
 * built: Fri, 24 Feb 2017 11:33:05 GMT
 * git: https://github.com/ndaidong/stabilize.js
 * author: @ndaidong
 * License: MIT
**/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;(function (name, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    var root = window || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('stabilize', function () {

  var UNDEF = undefined;

  var isArray = function isArray(val) {
    return Array.isArray(val);
  };

  var isObject = function isObject(val) {
    return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && isArray(val) === false;
  };

  var isString = function isString(val) {
    return {}.toString.call(val) === '[object String]';
  };

  var hasProperty = function hasProperty(ob, k) {
    return Object.prototype.hasOwnProperty.call(ob, k);
  };

  var defProp = function defProp(o, key) {
    var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : UNDEF;
    var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _opt$enumerable = opt.enumerable,
        enumerable = _opt$enumerable === undefined ? false : _opt$enumerable,
        _opt$configurable = opt.configurable,
        configurable = _opt$configurable === undefined ? false : _opt$configurable,
        _opt$writable = opt.writable,
        writable = _opt$writable === undefined ? false : _opt$writable,
        _opt$value = opt.value,
        value = _opt$value === undefined ? val : _opt$value;

    Object.defineProperty(o, key, {
      enumerable: enumerable,
      configurable: configurable,
      writable: writable,
      value: value
    });
    return o;
  };

  var random = function random(min, max) {
    var offset = min;
    var range = max - min + 1;
    return Math.floor(Math.random() * range) + offset;
  };

  var stabilize = function () {

    var astabilize = function astabilize(data) {

      var a = [].concat(_toConsumableArray(data));

      var unique = function unique() {
        var arr = [].concat(_toConsumableArray(a));
        var r = [];
        for (var i = 0; i < arr.length; i++) {
          if (r.indexOf(arr[i]) === -1) {
            r.push(arr[i]);
          }
        }
        return stabilize(r);
      };

      var min = function min() {
        return Math.min.apply({}, a);
      };

      var max = function max() {
        return Math.max.apply({}, a);
      };

      var first = function first() {
        var r = [].concat(_toConsumableArray(a))[0];
        return stabilize(r);
      };

      var last = function last() {
        var r = [].concat(_toConsumableArray(a))[a.length - 1];
        return stabilize(r);
      };

      var insert = function insert() {
        var _ref;

        for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          items[_key - 1] = arguments[_key];
        }

        var at = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var r = [].concat(_toConsumableArray(a));
        var p0 = r.slice(0, at);
        var p1 = r.slice(at, r.length);
        return stabilize((_ref = []).concat.apply(_ref, [p0].concat(items, [p1])));
      };

      var append = function append() {
        for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }

        return insert(a.length, items);
      };

      var remove = function remove() {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var r = [].concat(_toConsumableArray(a.slice(0, start)), _toConsumableArray(a.slice(start + count)));
        return stabilize(r);
      };

      var isort = function isort(fn) {
        var r = [].concat(_toConsumableArray(a)).sort(fn);
        return stabilize(r);
      };

      var msort = function msort() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var r = [].concat(_toConsumableArray(a));
        var one = r[0];
        if (o === 1 || o === -1) {
          r.sort(function (m, n) {
            return m > n ? o : m < n ? -1 * o : 0;
          });
        }
        if (isString(o) && hasProperty(one, o)) {
          r.sort(function (m, n) {
            return m[o] > n[o] ? 1 : m[o] < n[o] ? -1 : 0;
          });
        }
        if (isObject(o)) {
          var _loop = function _loop(key) {
            if (hasProperty(one, key)) {
              var order = o[key] === -1 ? -1 : 1;

              r.sort(function (m, n) {
                return m[key] > n[key] ? order : m[key] < n[key] ? -1 * order : 0;
              });
            }
          };

          for (var key in o) {
            _loop(key);
          }
        }
        return stabilize(r);
      };

      var ireverse = function ireverse() {
        var r = [].concat(_toConsumableArray(a)).reverse();
        return stabilize(r);
      };

      var shuffle = function shuffle() {
        return isort(function () {
          return Math.random() - 0.5;
        });
      };

      var pick = function pick() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var b = a.shuffle();
        var c = Math.max(Math.min(count, b.length), 1);
        if (c >= b.length) {
          return b;
        }

        if (c === 1) {
          var ri = random(0, b.length - 1);
          return b[ri];
        }

        return stabilize(b.splice(0, c));
      };

      var addMethods = function addMethods(met) {
        defProp(a, met[0], met[1]);
      };

      [['min', min], ['max', max], ['unique', unique], ['first', first], ['last', last], ['pick', pick], ['insert', insert], ['append', append], ['remove', remove], ['isort', isort], ['msort', msort], ['ireverse', ireverse], ['shuffle', shuffle]].map(addMethods);

      return a;
    };

    var ostabilize = function ostabilize(data) {

      var o = Object.create({});

      var setProp = function setProp(key) {
        defProp(o, key, data[key], {
          enumerable: true
        });
      };

      Object.keys(data).map(setProp);

      defProp(o, 'get', function (k) {
        return o[k];
      });

      defProp(o, 'set', function (key) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var a = Object.assign({}, o);
        var _set = function _set(k, v) {
          a[k] = v;
        };
        if (isObject(key)) {
          Object.keys(key).forEach(function (k) {
            _set(k, key[k]);
          });
        } else {
          _set(key, value);
        }
        return stabilize(a);
      });

      return o;
    };

    return function (data) {
      if (isArray(data)) {
        return astabilize(data);
      }
      if (isObject(data)) {
        return ostabilize(data);
      }
      return data;
    };
  }();

  return stabilize;
});