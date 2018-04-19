import IuguResource from '../IuguResource';

class Subscriptions extends IuguResource {
  constructor (iugu, urlData) {
    super(iugu, urlData);
    this.path = 'subscriptions',
    this.includeBasic = ['create', 'list', 'retrieve', 'update', 'del'],

    this.suspend = IuguResource.method({
      method: 'POST',
      path: '{subscriptionId}/suspend',
      urlParams: ['subscriptionId']
    });
    
    this.activate = IuguResource.method({
      method: 'POST',
      path: '{subscriptionId}/activate',
      urlParams: ['subscriptionId']
    });
    
    this.change_plan = IuguResource.method({
      method: 'POST',
      path: '{subscriptionId}/change_plan/{plan_identifier}',
      urlParams: ['subscriptionId', 'plan_identifier']
    });
    
    this.add_credits = IuguResource.method({
      method: 'PUT',
      path: '{subscriptionId}/add_credits',
      urlParams: ['subscriptionId']
    });
    
    this.remove_credits = IuguResource.method({
      method: 'PUT',
      path: '{subscriptionId}/remove_credits',
      urlParams: ['subscriptionId']
    });
  }
}

export default new Subscriptions();
