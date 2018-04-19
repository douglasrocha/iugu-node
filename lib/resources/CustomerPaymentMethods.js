import IuguResource from '../IuguResource';

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
class CustomerPaymentMethods extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'customers/{customerId}/payment_methods';
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'];
  }
}

export default new CustomerPaymentMethods();
