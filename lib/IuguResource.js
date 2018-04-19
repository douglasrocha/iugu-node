import http from 'http';
import https from 'https';
import path from 'path';
import when from 'when';
import utils from './utils';
import Error from './Error';
import iuguMethod from './IuguMethod';
import iuguMethodBasic from './IuguMethod.basic';
const hasOwn = {}.hasOwnProperty;

export default class IuguResource {
  constructor (iugu, urlData) {
    this._iugu = iugu;
    this.method = iuguMethod;
    this.BASIC_METHODS = iuguMethodBasic;
    this._urlData = urlData || {};
    this.basePath = utils.makeURLInterpolator(iugu.getApiField('basePath'));
    this.path = utils.makeURLInterpolator(this.path);

    if (this.includeBasic) {
      this.includeBasic.forEach((methodName) => {
        this[methodName] = IuguResource.BASIC_METHODS[methodName];
      }, this);
    }

    this.initialize.apply(this, arguments);
  }

  initialize () {
  }

  createFullPath (commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ? commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  }

  createUrlData () {
    let urlData = {};
    for (let i in this._urlData) {
      if (!hasOwn.call(this._urlData, i)) continue;
      urlData[i] = this._urlData[i];
    }
    return urlData;
  }

  createDeferred (callback) {
    let deferred = when.defer();

    if (callback) {
      deferred.promise.then((res) => {
        setTimeout(() => { callback(null, res); }, 0);
      }, (err) => {
        setTimeout(() => { callback(err, null); }, 0);
      });
    }

    return deferred;
  }

  _timeoutHandler (timeout, req, callback) {
    var self = this;
    return function() {
      let timeoutErr = new Error('ETIMEDOUT');
      timeoutErr.code = 'ETIMEDOUT';
      req._isAborted = true;
      req.abort();
      callback.call(
        self,
        new Error.IuguConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }),
        null
      );
    };
  }

  _responseHandler (req, callback) {
    const self = this;
    return (res) => {
      let response = '';
      
      res.setEncoding('utf8');
      res.on('data', (chunk) => { response += chunk; });
      res.on('end', function() {
        try {
          response = JSON.parse(response);
          if (response.error) {
            let err;
            if (res.statusCode === 401) {
              err = new Error.IuguAuthenticationError(response.error);
            } else {
              err = Error.IuguError.generate(response.error);
            }
            return callback.call(self, err, null);
          }
        } catch (e) {
          return callback.call(
            self,
            new Error.IuguAPIError({
              message: 'Invalid JSON received from the Iugu API',
              response: response,
              exception: e
            }),
            null
          );
        }
        callback.call(self, null, response);
      });
    };
  }

  _errorHandler (req, callback) {
    const self = this;
    return function(error) {
      if (req._isAborted) return; // already handled
      callback.call(
        self,
        new Error.IuguConnectionError({
          message: 'An error occurred with our connection to Iugu',
          detail: error
        }),
        null
      );
    };
  }

  makeRequest (headers, requestData, callback) {
    const timeout = self._iugu.getApiField('timeout');
    const req = (
      self._iugu.getApiField('protocol') == 'http' ? http : https
    ).request({
      host: self._iugu.getApiField('host'),
      port: self._iugu.getApiField('port'),
      path: path,
      method: this.method,
      headers: headers
    });

    req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
    req.on('response', self._responseHandler(req, callback));
    req.on('error', self._errorHandler(req, callback));

    req.on('socket', (socket) => {
      socket.on('secureConnect', () => {
        req.write(requestData);
        req.end();
      });
    });
  }

  _request (method, path, data, auth, callback) {
    const requestData = utils.stringifyRequestData(data || {});
    const self = this;
    console.log(requestData);
    const apiVersion = this._iugu.getApiField('version');
    const headers = {
      // Use specified auth token or use default from this stripe instance:
      'Authorization': auth ?
        'Basic ' + new Buffer(auth + ':').toString('base64') :
        this._iugu.getApiField('auth'),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': requestData.length,
      'User-Agent': 'Iugu/v1 NodeBindings/' + this._iugu.getConstant('PACKAGE_VERSION')
    };

    if (apiVersion) {
      headers['Iugu-Version'] = apiVersion;
    }

    // Grab client-user-agent before making the request:
    this._iugu.getClientUserAgent((cua) => {
      headers['X-Iugu-Client-User-Agent'] = cua;
      this.makeRequest(headers, requestData, callback);
    });
  }
}
