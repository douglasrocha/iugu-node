import IuguResource from '../IuguResource';

export default class Subscriptions extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'subscriptions',
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'],

    this.suspend = this.method({
      method: 'POST',
      path: '{subscriptionId}/suspend',
      urlParams: ['subscriptionId']
    });
    
    this.activate = this.method({
      method: 'POST',
      path: '{subscriptionId}/activate',
      urlParams: ['subscriptionId']
    });
    
    this.change_plan = this.method({
      method: 'POST',
      path: '{subscriptionId}/change_plan/{plan_identifier}',
      urlParams: ['subscriptionId', 'plan_identifier']
    });
    
    this.add_credits = this.method({
      method: 'PUT',
      path: '{subscriptionId}/add_credits',
      urlParams: ['subscriptionId']
    });
    
    this.remove_credits = this.method({
      method: 'PUT',
      path: '{subscriptionId}/remove_credits',
      urlParams: ['subscriptionId']
    });
  }
}
