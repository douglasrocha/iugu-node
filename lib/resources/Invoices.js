import IuguResource from '../IuguResource';

export default class Invoices extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'invoices',
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'],

    this.cancel = this.method({
      method: 'PUT',
      path: '{invoiceId}/cancel',
      urlParams: ['invoiceId']
    });

    this.refund = this.method({
      method: 'POST',
      path: '{invoiceId}/refund',
      urlParams: ['invoiceId']
    });
  }
}
