import IuguResource from  '../IuguResource';

export default class Plans extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'plans';
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'];
    this.retrieveByIdentifier = this.method({
      method: 'GET',
      path: 'identifier/{identifier}/',
      urlParams: ['identifier']
    });
  }
}
