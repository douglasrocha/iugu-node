'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _IuguResource = require('./IuguResource');

var _IuguResource2 = _interopRequireDefault(_IuguResource);

var _Accounts = require('./resources/Accounts');

var _Accounts2 = _interopRequireDefault(_Accounts);

var _Charge = require('./resources/Charge');

var _Charge2 = _interopRequireDefault(_Charge);

var _Customers = require('./resources/Customers');

var _Customers2 = _interopRequireDefault(_Customers);

var _Invoices = require('./resources/Invoices');

var _Invoices2 = _interopRequireDefault(_Invoices);

var _MarketPlace = require('./resources/MarketPlace');

var _MarketPlace2 = _interopRequireDefault(_MarketPlace);

var _Plans = require('./resources/Plans');

var _Plans2 = _interopRequireDefault(_Plans);

var _Subscriptions = require('./resources/Subscriptions');

var _Subscriptions2 = _interopRequireDefault(_Subscriptions);

var _PaymentToken = require('./resources/PaymentToken');

var _PaymentToken2 = _interopRequireDefault(_PaymentToken);

var _Transfers = require('./resources/Transfers');

var _Transfers2 = _interopRequireDefault(_Transfers);

var _CustomerPaymentMethods = require('./resources/CustomerPaymentMethods');

var _CustomerPaymentMethods2 = _interopRequireDefault(_CustomerPaymentMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Iugu = function () {
  function Iugu(key, version) {
    _classCallCheck(this, Iugu);

    this.initializeConstants();

    this._api = {
      auth: null,
      host: this.DEFAULT_HOST,
      port: this.DEFAULT_PORT,
      basePath: this.DEFAULT_BASE_PATH,
      version: this.DEFAULT_API_VERSION,
      timeout: this.DEFAULT_TIMEOUT,
      dev: false
    };

    this._prepResources();
    this.setApiKey(key);
    this.setApiVersion(version);
  }

  _createClass(Iugu, [{
    key: 'initializeConstants',
    value: function initializeConstants() {
      this.DEFAULT_HOST = 'api.iugu.com';
      this.DEFAULT_PORT = '443';
      this.DEFAULT_BASE_PATH = '/v1/';
      this.DEFAULT_API_VERSION = null;
      this.DEFAULT_TIMEOUT = _http2.default.createServer().timeout;
      this.PACKAGE_VERSION = _package2.default.version;
      this.USER_AGENT = Object.assign({}, _bowser2.default, {
        bindings_version: this.PACKAGE_VERSION,
        lang: 'node',
        lang_version: _process2.default.version,
        platform: _process2.default.platform,
        publisher: 'iugu',
        uname: null
      });
      this.USER_AGENT_SERIALIZED = null;
      this.IuguResource = _IuguResource2.default;
      this.resources = {
        Accounts: _Accounts2.default,
        Charge: _Charge2.default,
        Customers: _Customers2.default,
        Invoices: _Invoices2.default,
        MarketPlace: _MarketPlace2.default,
        Plans: _Plans2.default,
        Subscriptions: _Subscriptions2.default,
        PaymentToken: _PaymentToken2.default,
        Transfers: _Transfers2.default,
        CustomerPaymentMethods: _CustomerPaymentMethods2.default
      };
    }
  }, {
    key: 'setHost',
    value: function setHost(host, port, protocol) {
      if (host) this._api.host = host;
      if (port) this._api.port = port;
      if (protocol) this._api.protocol = protocol.toLowerCase();
    }
  }, {
    key: 'setApiVersion',
    value: function setApiVersion(version) {
      if (version) this._api.version = version;
    }
  }, {
    key: 'setApiKey',
    value: function setApiKey(key) {
      if (!key) return;
      this._api.auth = 'Basic ' + Buffer.from(key + ':').toString('base64');
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(timeout) {
      if (timeout) this._api.timeout = timeout;
    }
  }, {
    key: 'getApiField',
    value: function getApiField(key) {
      return this._api[key];
    }
  }, {
    key: 'getClientUserAgent',
    value: function getClientUserAgent(cb) {
      this.USER_AGENT = _bowser2.default;
      this.USER_AGENT_SERIALIZED = JSON.stringify(this.USER_AGENT);
    }
  }, {
    key: '_prepResources',
    value: function _prepResources() {
      for (var name in this.resources) {
        this[name[0].toLowerCase() + name.substring(1)] = new this.resources[name](this);
      }
    }
  }]);

  return Iugu;
}();

exports.default = Iugu;
;