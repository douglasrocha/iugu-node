import packageJson from '../package.json';
import bowser from 'bowser';
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
    this._api = {
      auth: null,
      host: this.DEFAULT_HOST,
      port: this.DEFAULT_PORT,
      basePath: this.DEFAULT_BASE_PATH,
      version: this.DEFAULT_API_VERSION,
      timeout: this.DEFAULT_TIMEOUT,
      dev: false
    };

    this.initializeConstants();

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
    this.USER_AGENT = Object.assign({}, bowser, {
      bindings_version: this.PACKAGE_VERSION,
      lang: 'node',
      lang_version: process.version,
      platform: process.platform,
      publisher: 'iugu',
      uname: null
    });
    this.USER_AGENT_SERIALIZED = null;
    this.IuguResource = new IuguResource(this);
    this.resources = {
      Accounts: new Accounts(this),
      Charge: new Charge(this),
      Customers: new Customers(this),
      Invoices: new Invoices(this),
      MarketPlace: new MarketPlace(this),
      Plans: new Plans(this),
      Subscriptions: new Subscriptions(this),
      PaymentToken: new PaymentToken(this),
      Transfers: new Transfers(this),
      CustomerPaymentMethods: new CustomerPaymentMethods(this)
    };
  }

  setHost (host, port, protocol) {
    if (host) this._api.host = host;
    if (port) this._api.port = port;
    if (protocol) this._api.protocol = protocol.toLowerCase();
  }

  setApiVersion (version) {
    if (version) this._api.version = version;
  }

  setApiKey (key) {
    this._api.auth = `Basic ${Buffer.from(key + ':').toString('base64')}`;
  }

  setTimeout (timeout) {
    if (timeout) this._api.timeout = timeout;
  }

  getApiField (key) {
    return this._api[key];
  }

  getClientUserAgent (cb) {
    this.USER_AGENT = bowser;
    this.USER_AGENT_SERIALIZED = JSON.stringify(this.USER_AGENT);
  }

  _prepResources () {
    for (var name in this.resources) {
      const lowerCamelCaseName = name[0].toLowerCase() + name.substring(1);
      this[lowerCamelCaseName] = this.resources[name];
    }
  }
};
