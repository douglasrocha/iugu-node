'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

var _IuguMethod = require('./IuguMethod');

var _IuguMethod2 = _interopRequireDefault(_IuguMethod);

var _IuguMethod3 = require('./IuguMethod.basic');

var _IuguMethod4 = _interopRequireDefault(_IuguMethod3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hasOwn = {}.hasOwnProperty;

var IuguResource = function () {
  function IuguResource(iugu, urlData) {
    var _this = this;

    _classCallCheck(this, IuguResource);

    this._iugu = iugu;
    this.method = _IuguMethod2.default;
    this.BASIC_METHODS = _IuguMethod4.default;
    this._urlData = urlData || {};
    this.basePath = _utils2.default.makeURLInterpolator(iugu.getApiField('basePath'));
    this.path = _utils2.default.makeURLInterpolator(this.path);

    if (this.includeBasic) {
      this.includeBasic.forEach(function (methodName) {
        _this[methodName] = IuguResource.BASIC_METHODS[methodName];
      }, this);
    }

    this.initialize.apply(this, arguments);
  }

  _createClass(IuguResource, [{
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'createFullPath',
    value: function createFullPath(commandPath, urlData) {
      return _path2.default.join(this.basePath(urlData), this.path(urlData), typeof commandPath == 'function' ? commandPath(urlData) : commandPath).replace(/\\/g, '/'); // ugly workaround for Windows
    }
  }, {
    key: 'createUrlData',
    value: function createUrlData() {
      var urlData = {};
      for (var i in this._urlData) {
        if (!hasOwn.call(this._urlData, i)) continue;
        urlData[i] = this._urlData[i];
      }
      return urlData;
    }
  }, {
    key: 'createDeferred',
    value: function createDeferred(callback) {
      var deferred = _when2.default.defer();

      if (callback) {
        deferred.promise.then(function (res) {
          setTimeout(function () {
            callback(null, res);
          }, 0);
        }, function (err) {
          setTimeout(function () {
            callback(err, null);
          }, 0);
        });
      }

      return deferred;
    }
  }, {
    key: '_timeoutHandler',
    value: function _timeoutHandler(timeout, req, callback) {
      var self = this;
      return function () {
        var timeoutErr = new _Error2.default('ETIMEDOUT');
        timeoutErr.code = 'ETIMEDOUT';
        req._isAborted = true;
        req.abort();
        callback.call(self, new _Error2.default.IuguConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }), null);
      };
    }
  }, {
    key: '_responseHandler',
    value: function _responseHandler(req, callback) {
      var self = this;
      return function (res) {
        var response = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          response += chunk;
        });
        res.on('end', function () {
          try {
            response = JSON.parse(response);
            if (response.error) {
              var err;
              if (res.statusCode === 401) {
                err = new _Error2.default.IuguAuthenticationError(response.error);
              } else {
                err = _Error2.default.IuguError.generate(response.error);
              }
              return callback.call(self, err, null);
            }
          } catch (e) {
            return callback.call(self, new _Error2.default.IuguAPIError({
              message: 'Invalid JSON received from the Iugu API',
              response: response,
              exception: e
            }), null);
          }
          callback.call(self, null, response);
        });
      };
    }
  }, {
    key: '_errorHandler',
    value: function _errorHandler(req, callback) {
      var self = this;
      return function (error) {
        if (req._isAborted) return; // already handled
        callback.call(self, new _Error2.default.IuguConnectionError({
          message: 'An error occurred with our connection to Iugu',
          detail: error
        }), null);
      };
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest() {
      var timeout = self._iugu.getApiField('timeout');
      var req = (self._iugu.getApiField('protocol') == 'http' ? _http2.default : _https2.default).request({
        host: self._iugu.getApiField('host'),
        port: self._iugu.getApiField('port'),
        path: _path2.default,
        method: method,
        headers: headers
      });

      req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback));
      req.on('error', self._errorHandler(req, callback));

      req.on('socket', function (socket) {
        socket.on('secureConnect', function () {
          req.write(requestData);
          req.end();
        });
      });
    }
  }, {
    key: '_request',
    value: function _request(method, path, data, auth, callback) {
      var _this2 = this;

      var requestData = _utils2.default.stringifyRequestData(data || {});
      var self = this;
      console.log(requestData);
      var apiVersion = this._iugu.getApiField('version');
      var headers = {
        // Use specified auth token or use default from this stripe instance:
        'Authorization': auth ? 'Basic ' + new Buffer(auth + ':').toString('base64') : this._iugu.getApiField('auth'),
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': requestData.length,
        'User-Agent': 'Iugu/v1 NodeBindings/' + this._iugu.getConstant('PACKAGE_VERSION')
      };

      if (apiVersion) {
        headers['Iugu-Version'] = apiVersion;
      }

      // Grab client-user-agent before making the request:
      this._iugu.getClientUserAgent(function (cua) {
        headers['X-Iugu-Client-User-Agent'] = cua;
        _this2.makeRequest();
      });
    }
  }]);

  return IuguResource;
}();

exports.default = IuguResource;