import IuguResource from '../IuguResource';

export default class Accounts extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'accounts';
    this.includeBasic = ['retrieve'];
    
    this.request_verification = this.method({
      method: 'POST',
      path: '{accountId}/request_verification',
      urlParams: ['accountId']
    });
    
    this.request_withdraw = this.method({
      method: 'POST',
      path: '{accountId}/request_withdraw',
      urlParams: ['accountId']
    });
  }
}
