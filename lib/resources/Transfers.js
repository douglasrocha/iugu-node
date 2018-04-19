import IuguResource from '../IuguResource';

export default class Transfers extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'transfers';
    this.includeBasic = ['create', 'list'];
  }
}
