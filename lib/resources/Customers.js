import IuguResource from '../IuguResource';

export default class Customer extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'customers';
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'];
    this.createPaymentMethod = this.method({
      method: 'POST',
      path: '/{customerId}/payment_methods',
      urlParams: ['customerId']
    });
    
    this.listPaymentMethod = this.method({
      method: 'GET',
      path: '/{customerId}/payment_methods',
      urlParams: ['customerId']
    });

    this.retrievePaymentMethod = this.method({
      method: 'GET',
      path: '/{customerId}/payment_methods/{paymentMethodId}',
      urlParams: ['customerId', 'paymentMethodId']
    });

    this.updatePaymentMethod = this.method({
      method: 'POST',
      path: '/{customerId}/payment_methods/{paymentMethodId}',
      urlParams: ['customerId', 'paymentMethodId']
    });

    this.deletePaymentMethod = this.method({
      method: 'DELETE',
      path: '/{customerId}/payment_methods/{paymentMethodId}',
      urlParams: ['customerId', 'paymentMethodId']
    });
  }
}
