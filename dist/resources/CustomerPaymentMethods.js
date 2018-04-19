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

/**
 * CustomerPaymentMethods is a unique resource in that, upon instantiation,
 * requires a customerId, and therefore each of its methods only
 * require the paymentMethodId argument.
 *
 * This streamlines the API specifically for the case of accessing Payment Methods
 * on a returned customer object.
 *
 * E.g. customerObject.paymentMethods.retrieve(paymentMethodId)
 * (As opposed to the also-supported iugu.Customer.retrieveCard(custId, paymentMethodId))
 */
var CustomerPaymentMethods = function (_IuguResource) {
  _inherits(CustomerPaymentMethods, _IuguResource);

  function CustomerPaymentMethods(iugu, urlData) {
    _classCallCheck(this, CustomerPaymentMethods);

    var _this = _possibleConstructorReturn(this, (CustomerPaymentMethods.__proto__ || Object.getPrototypeOf(CustomerPaymentMethods)).call(this, iugu, urlData));

    _this.path = 'customers/{customerId}/payment_methods';
    _this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'];
    return _this;
  }

  return CustomerPaymentMethods;
}(_IuguResource3.default);

exports.default = new CustomerPaymentMethods();