import IuguResource from '../IuguResource';

class Charge extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'charge';
    this.includeBasic = ['create'];
  }
}

export default new Charge();
