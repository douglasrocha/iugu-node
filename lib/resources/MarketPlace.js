import IuguResource from '../IuguResource';

class MarketPlace extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'marketplace';
    this.create_account = IuguResource.method({
      method: 'POST',
      path: 'create_account'
    });
  }
}

export default new MarketPlace();
