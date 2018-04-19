import IuguResource from '../IuguResource';

export default class Charge extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'charge';
    this.includeBasic = ['create'];
  }
}
