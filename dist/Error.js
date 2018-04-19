'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Error = function (_Error2) {
  _inherits(_Error, _Error2);

  function _Error() {
    _classCallCheck(this, _Error);

    var _this = _possibleConstructorReturn(this, (_Error.__proto__ || Object.getPrototypeOf(_Error)).call(this));

    _this.type = 'IuguError', _this.populate = function (raw) {
      _this.type = _this.type;
      _this.rawType = raw.type;
      _this.code = raw.code;
      _this.param = raw.param;
      _this.message = raw.message;
      _this.detail = raw.detail;
      _this.raw = raw;
    };
    return _this;
  }

  _createClass(_Error, [{
    key: 'generate',
    value: function generate(rawIuguError) {
      switch (rawIuguError.type) {
        case 'card_error':
          return new IuguCardError(rawIuguError);
        case 'invalid_request_error':
          return new IuguInvalidRequestError(rawIuguError);
        case 'api_error':
          return new IuguAPIError(rawIuguError);
      }
      return new _Error('Generic', 'Unknown Error');
    }
  }]);

  return _Error;
}(Error);

exports.default = _Error;

var IuguCardError = function (_Error3) {
  _inherits(IuguCardError, _Error3);

  function IuguCardError() {
    _classCallCheck(this, IuguCardError);

    var _this2 = _possibleConstructorReturn(this, (IuguCardError.__proto__ || Object.getPrototypeOf(IuguCardError)).call(this));

    _this2.type = 'IuguCardError';
    return _this2;
  }

  return IuguCardError;
}(_Error);

var IuguInvalidRequestError = function (_Error4) {
  _inherits(IuguInvalidRequestError, _Error4);

  function IuguInvalidRequestError() {
    _classCallCheck(this, IuguInvalidRequestError);

    var _this3 = _possibleConstructorReturn(this, (IuguInvalidRequestError.__proto__ || Object.getPrototypeOf(IuguInvalidRequestError)).call(this));

    _this3.type = 'IuguInvalidRequest';
    return _this3;
  }

  return IuguInvalidRequestError;
}(_Error);

var IuguAPIError = function (_Error5) {
  _inherits(IuguAPIError, _Error5);

  function IuguAPIError() {
    _classCallCheck(this, IuguAPIError);

    var _this4 = _possibleConstructorReturn(this, (IuguAPIError.__proto__ || Object.getPrototypeOf(IuguAPIError)).call(this));

    _this4.type = 'IuguAPIError';
    return _this4;
  }

  return IuguAPIError;
}(_Error);

var IuguAuthenticationError = function (_Error6) {
  _inherits(IuguAuthenticationError, _Error6);

  function IuguAuthenticationError() {
    _classCallCheck(this, IuguAuthenticationError);

    var _this5 = _possibleConstructorReturn(this, (IuguAuthenticationError.__proto__ || Object.getPrototypeOf(IuguAuthenticationError)).call(this));

    _this5.type = 'IuguAuthenticationError';
    return _this5;
  }

  return IuguAuthenticationError;
}(_Error);

var IuguConnectionError = function (_Error7) {
  _inherits(IuguConnectionError, _Error7);

  function IuguConnectionError() {
    _classCallCheck(this, IuguConnectionError);

    var _this6 = _possibleConstructorReturn(this, (IuguConnectionError.__proto__ || Object.getPrototypeOf(IuguConnectionError)).call(this));

    _this6.type = 'IuguConnectionError';
    return _this6;
  }

  return IuguConnectionError;
}(_Error);