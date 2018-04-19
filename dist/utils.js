'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwn = {}.hasOwnProperty;
var toString = {}.toString;

var ARRAY_ = void 0;

var isAuthKey = function isAuthKey(key) {
  return typeof key == 'string' && /^(?:[a-z]{2}_)?[A-z0-9]{32}$/.test(key);
};
var isObject = function isObject(o) {
  return toString.call(o) === '[object Object]';
};

/**
 * Stringifies an Object, accommodating a single-level of nested objects
 * (forming the conventional key "parent[child]=value")
 */
var stringifyRequestData = function stringifyRequestData(data) {
  var output = [];

  for (var i in data) {
    if (hasOwn.call(data, i)) {
      if (isObject(data[i])) {
        var hasProps = false;
        for (var _ii in data[i]) {
          if (hasOwn.call(data[i], _ii)) {
            hasProps = true;
            output.push(encode(i + '[' + _ii + ']') + '=' + encode(data[i][_ii]));
          }
        }
        if (!hasProps) {
          output.push(encode(i) + '=' + encode(''));
        }
      } else if (Array.isArray(data[i])) {

        for (var a = 0, l = data[i].length; a < l; ++a) {
          if (isObject(data[i][a])) {
            var _hasProps = false;
            for (var ii in data[i][a]) {
              if (hasOwn.call(data[i][a], ii)) {
                _hasProps = true;
                output.push(encode(i + '[]' + '[' + ii + ']') + '=' + encode(data[i][a][ii]));
              }
            }

            if (!_hasProps) {
              output.push(encode(i + '[]') + '=' + encode(''));
            }
          }
        }
      } else {
        output.push(encode(i) + '=' + encode(data[i]));
      }
    }
  }

  return output.join('&');
};

/**
   * https://gist.github.com/padolsey/6008842
   * Outputs a new function with interpolated object property values.
   * Use like so:
   *   var fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   */
var makeURLInterpolator = function makeURLInterpolator(str) {
  var rc = {
    '\n': '\\n', '\"': '\\\"',
    '\u2028': '\\u2028', '\u2029': '\\u2029'
  };

  var strReplace = str.replace(/["\n\r\u2028\u2029]/g, function ($0) {
    return rc[$0];
  }).replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "');

  var fString = 'return "' + strReplace + '";';
  return new Function('o', fString);
};

exports.default = {
  isAuthKey: isAuthKey,
  isObject: isObject,
  stringifyRequestData: stringifyRequestData,
  makeURLInterpolator: makeURLInterpolator
};