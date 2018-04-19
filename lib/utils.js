import querystring from 'querystring';
const hasOwn = {}.hasOwnProperty;
const toString = {}.toString;

let ARRAY_;

const isAuthKey = (key) =>  typeof key == 'string' && /^(?:[a-z]{2}_)?[A-z0-9]{32}$/.test(key);
const isObject = (o) => toString.call(o) === '[object Object]';

/**
 * Stringifies an Object, accommodating a single-level of nested objects
 * (forming the conventional key "parent[child]=value")
 */
const stringifyRequestData = (data) => {
  let output = [];

  for (let i in data) {
    if (hasOwn.call(data, i)) {
      if (isObject(data[i])) {
        let hasProps = false;
        for (let ii in data[i]) {
          if (hasOwn.call(data[i], ii)) {
            hasProps = true;
            output.push(encode(i + '[' + ii + ']') + '=' + encode(data[i][ii]));
          }
        }
        if (!hasProps) {
          output.push(encode(i) + '=' + encode(''));
        }
      } else if (Array.isArray(data[i])) {
        
        for (let a = 0, l = data[i].length; a < l; ++a) {
          if (isObject(data[i][a])) {
            let hasProps = false;
            for (var ii in data[i][a]) {
              if (hasOwn.call(data[i][a], ii)) {
                hasProps = true;
                output.push(encode(i + '[]' + '[' + ii + ']') + '=' + encode(data[i][a][ii]));
              }
            }
            
            if (!hasProps) {
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
const makeURLInterpolator = str => {
  const rc = {
    '\n': '\\n', '\"': '\\\"',
    '\u2028': '\\u2028', '\u2029': '\\u2029'
  };

  const strReplace = str
    .replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0])
    .replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "');

  const fString = `return "${strReplace}";`;
  return new Function('o', fString);
};

export default {
  isAuthKey,
  isObject,  
  stringifyRequestData,  
  makeURLInterpolator
};
