import IuguResource from  '../IuguResource';

class Plans extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'plans';
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'];
    this.retrieveByIdentifier = IuguResource.method({
      method: 'GET',
      path: 'identifier/{identifier}/',
      urlParams: ['identifier']
    });
  }
}

export default new Plans();

