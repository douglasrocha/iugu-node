'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _arguments = arguments;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with 
 *  the instance's path (e.g. "charges" or "customers")
 * @param [spec.required=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceeding the also-optional callback argument
 */
exports.default = function (spec) {
  var commandPath = _utils2.default.makeURLInterpolator(spec.path || '');
  var requestMethod = (spec.method || 'GET').toUpperCase();
  var urlParams = spec.urlParams || [];

  return function () {
    var self = undefined;
    var args = [].slice.call(_arguments);
    var callback = typeof args[args.length - 1] == 'function' && args.pop();
    var auth = args.length > urlParams.length && _utils2.default.isAuthKey(args[args.length - 1]) ? args.pop() : null;
    var data = _utils2.default.isObject(args[args.length - 1]) ? args.pop() : {};
    var urlData = undefined.createUrlData();
    var deferred = undefined.createDeferred(callback);

    for (var i = 0, l = urlParams.length; i < l; ++i) {
      var arg = args[0];
      if (urlParams[i] && !arg) {
        throw new Error('Iugu: I require argument "' + urlParams[i] + '", but I got: ' + arg);
      }
      urlData[urlParams[i]] = args.shift();
    }

    if (args.length) {
      throw new Error('Iugu: Unknown arguments (' + args + '). Did you mean to pass an options object?');
    }

    var requestPath = undefined.createFullPath(commandPath, urlData);

    self._request(requestMethod, requestPath, data, auth, function (err, response) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(spec.transformResponseData ? spec.transformResponseData(response) : response);
      }
    });

    return deferred.promise;
  };
};