import IuguResource from '../IuguResource');

export default class Accounts extends IuguResource {

  path: 'accounts',
  includeBasic: ['retrieve'],
  
  request_verification: IuguResource.method({
    method: 'POST',
    path: '{accountId}/request_verification',
    urlParams: ['accountId']
  }),

  request_withdraw: IuguResource.method({
    method: 'POST',
    path: '{accountId}/request_withdraw',
    urlParams: ['accountId']
  })
}
