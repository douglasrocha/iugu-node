import packageJson from '../package.json';
import child_process from 'child_process';
import http from 'http';
import process from 'process';
import IuguResource from './IuguResource';
import Accounts from './resources/Accounts';
import Charge from './resources/Charge';
import Customers from './resources/Customers';
import Invoices from './resources/Invoices';
import MarketPlace from './resources/MarketPlace';
import Plans from './resources/Plans';
import Subscriptions from './resources/Subscriptions';
import PaymentToken from './resources/PaymentToken';
import Transfers from './resources/Transfers';
import CustomerPaymentMethods from './resources/CustomerPaymentMethods';

export default class Iugu {
  constructor (key, version) {
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

  initializeConstants () {
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

  setHost (host, port, protocol) {
    this._setApiField('host', host);
    if (port) this.setPort(port);
    if (protocol) this.setProtocol(protocol);
  }

  setProtocol (protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  }

  setPort (port) {
    this._setApiField('port', port);
  }

  setApiVersion (version) {
    if (version) {
      this._setApiField('version', version);
    }
  }

  setApiKey (key) {
    if (key) {
      this._setApiField(
        'auth',
        'Basic ' + Buffer.from(key + ':').toString('base64')
      );
    }
  }

  setTimeout (timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? this.DEFAULT_TIMEOUT : timeout
    );
  }

  _setApiField (key, value) {
    this._api[key] = value;
  }

  getApiField (key) {
    return this._api[key];
  }

  getConstant (c) {
    return Iugu[c];
  }

  getClientUserAgent (cb) {
    if (this.USER_AGENT_SERIALIZED) {
      return cb(this.USER_AGENT_SERIALIZED);
    }
    
    child_process.exec('uname -a', (err, uname) => {
      this.USER_AGENT.uname = uname || 'UNKNOWN';
      this.USER_AGENT_SERIALIZED = JSON.stringify(this.USER_AGENT);
      cb(this.USER_AGENT_SERIALIZED);
    });
  }

  _prepResources () {
    for (var name in this.resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new this.resources[name](this);
    }
  }
};
