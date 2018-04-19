import IuguResource from '../IuguResource';

class Customer extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'customers';
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'];
    this.createPaymentMethod = IuguResource.method({
      method: 'POST',
      path: '/{customerId}/payment_methods',
      urlParams: ['customerId']
    });
    
    this.listPaymentMethod = IuguResource.method({
      method: 'GET',
      path: '/{customerId}/payment_methods',
      urlParams: ['customerId']
    });

    this.retrievePaymentMethod = IuguResource.method({
      method: 'GET',
      path: '/{customerId}/payment_methods/{paymentMethodId}',
      urlParams: ['customerId', 'paymentMethodId']
    });

    this.updatePaymentMethod = IuguResource.method({
      method: 'POST',
      path: '/{customerId}/payment_methods/{paymentMethodId}',
      urlParams: ['customerId', 'paymentMethodId']
    });

    this.deletePaymentMethod = IuguResource.method({
      method: 'DELETE',
      path: '/{customerId}/payment_methods/{paymentMethodId}',
      urlParams: ['customerId', 'paymentMethodId']
    });
  }
}

export default new Customer();
