import IuguResource from '../IuguResource';

class Invoices extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'invoices',
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'],

    this.cancel = IuguResource.method({
      method: 'PUT',
      path: '{invoiceId}/cancel',
      urlParams: ['invoiceId']
    });

    this.refund = IuguResource.method({
      method: 'POST',
      path: '{invoiceId}/refund',
      urlParams: ['invoiceId']
    });
  }
}

export default new Invoices();
