import IuguResource from '../IuguResource';

class PaymentToken extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'payment_token';
    this.includeBasic = ['create'];
  }
}

export default new PaymentToken();
