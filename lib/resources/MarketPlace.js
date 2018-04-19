import IuguResource from '../IuguResource';

export default class MarketPlace extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'marketplace';
    this.create_account = this.method({
      method: 'POST',
      path: 'create_account'
    });
  }
}
