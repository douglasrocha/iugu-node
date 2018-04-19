'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var packageJson = require('../package.json');
var exec = require('child_process').exec;
var http = require('http');
var process = require('process');
var IuguResource = require('./IuguResource');
var Accounts = require('./resources/Accounts');
var Charge = require('./resources/Charge');
var Customers = require('./resources/Customers');
var Invoices = require('./resources/Invoices');
var MarketPlace = require('./resources/MarketPlace');
var Plans = require('./resources/Plans');
var Subscriptions = require('./resources/Subscriptions');
var PaymentToken = require('./resources/PaymentToken');
var Transfers = require('./resources/Transfers');
var CustomerPaymentMethods = require('./resources/CustomerPaymentMethods');

var Iugu = function () {
  function Iugu(key, version) {
    _classCallCheck(this, Iugu);

    this.initializeConstants();
    if (!(this instanceof Iugu)) {
      return new Iugu(key, version);
    }

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
      this.DEFAULT_TIMEOUT = http.createServer().timeout;
      this.PACKAGE_VERSION = packageJson.version;
      this.USER_AGENT = {
        bindings_version: this.PACKAGE_VERSION,
        lang: 'node',
        lang_version: process.version,
        platform: process.platform,
        publisher: 'iugu',
        uname: null
      };
      this.USER_AGENT_SERIALIZED = null;
      this.IuguResource = IuguResource;
      this.resources = {
        Accounts: Accounts,
        Charge: Charge,
        Customers: Customers,
        Invoices: Invoices,
        MarketPlace: MarketPlace,
        Plans: Plans,
        Subscriptions: Subscriptions,
        PaymentToken: PaymentToken,
        Transfers: Transfers,
        CustomerPaymentMethods: CustomerPaymentMethods
      };
    }
  }, {
    key: 'setHost',
    value: function setHost(host, port, protocol) {
      this._setApiField('host', host);
      if (port) this.setPort(port);
      if (protocol) this.setProtocol(protocol);
    }
  }, {
    key: 'setProtocol',
    value: function setProtocol(protocol) {
      this._setApiField('protocol', protocol.toLowerCase());
    }
  }, {
    key: 'setPort',
    value: function setPort(port) {
      this._setApiField('port', port);
    }
  }, {
    key: 'setApiVersion',
    value: function setApiVersion(version) {
      if (version) {
        this._setApiField('version', version);
      }
    }
  }, {
    key: 'setApiKey',
    value: function setApiKey(key) {
      if (key) {
        this._setApiField('auth', 'Basic ' + Buffer.from(key + ':').toString('base64'));
      }
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(timeout) {
      this._setApiField('timeout', timeout == null ? this.DEFAULT_TIMEOUT : timeout);
    }
  }, {
    key: '_setApiField',
    value: function _setApiField(key, value) {
      this._api[key] = value;
    }
  }, {
    key: 'getApiField',
    value: function getApiField(key) {
      return this._api[key];
    }
  }, {
    key: 'getConstant',
    value: function getConstant(c) {
      return Iugu[c];
    }
  }, {
    key: 'getClientUserAgent',
    value: function getClientUserAgent(cb) {
      var _this = this;

      if (this.USER_AGENT_SERIALIZED) {
        return cb(this.USER_AGENT_SERIALIZED);
      }

      exec('uname -a', function (err, uname) {
        _this.USER_AGENT.uname = uname || 'UNKNOWN';
        _this.USER_AGENT_SERIALIZED = JSON.stringify(_this.USER_AGENT);
        cb(_this.USER_AGENT_SERIALIZED);
      });
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