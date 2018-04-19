'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IuguResource2 = require('../IuguResource');

var _IuguResource3 = _interopRequireDefault(_IuguResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plans = function (_IuguResource) {
  _inherits(Plans, _IuguResource);

  function Plans(iugu, urlData) {
    _classCallCheck(this, Plans);

    var _this = _possibleConstructorReturn(this, (Plans.__proto__ || Object.getPrototypeOf(Plans)).call(this, iugu, urlData));

    _this.path = 'plans';
    _this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'];
    _this.retrieveByIdentifier = _IuguResource3.default.method({
      method: 'GET',
      path: 'identifier/{identifier}/',
      urlParams: ['identifier']
    });
    return _this;
  }

  return Plans;
}(_IuguResource3.default);

exports.default = new Plans();