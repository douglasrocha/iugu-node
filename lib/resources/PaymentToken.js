import IuguResource from '../IuguResource';

export default class PaymentToken extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'payment_token';
    this.includeBasic = ['create'];
  }
}
