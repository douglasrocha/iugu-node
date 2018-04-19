import IuguResource from '../IuguResource';

class Accounts extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'accounts';
    this.includeBasic = ['retrieve'];
    
    this.request_verification = IuguResource.method({
      method: 'POST',
      path: '{accountId}/request_verification',
      urlParams: ['accountId']
    });
    
    this.request_withdraw = IuguResource.method({
      method: 'POST',
      path: '{accountId}/request_withdraw',
      urlParams: ['accountId']
    });
  }
}

export default new Accounts();
