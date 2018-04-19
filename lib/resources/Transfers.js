import IuguResource from '../IuguResource';

class Transfers extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'transfers';
    this.includeBasic = ['create', 'list'];
  }
}

export default new Transfers();

