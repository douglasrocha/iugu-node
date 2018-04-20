import chai from 'chai';
import chaiString from 'chai-string';
import Iugu from '../lib/iugu';
import { ApiKey } from './TestKey';

// Chai Configurations
chai.use(chaiString);
const should = chai.should();

describe('Main iugu object creation', () => {
  describe('When instantiated', () => {
    const iugu = new Iugu(ApiKey, 'latest');
    
    it('should be defined and not null', () => {
      should.exist(iugu);
    });

    it('needs to have some default values as attributes', () => {
      iugu.DEFAULT_HOST.should.be.equal('api.iugu.com');
      iugu.DEFAULT_PORT.should.be.equal('443');
      should.exist(iugu.resources);
      iugu.resources.should.be.an('object');
      iugu._api.should.be.an('object');
    });

    it('needs to have a base64 encoding starting with Basic', () => {
      const auth = iugu.getApiField('auth');
      should.exist(auth);
      auth.should.startWith('Basic ');
    });

    it('should contain an instance of IuguResource', () => {
      should.exist(iugu.IuguResource);
      iugu.IuguResource.should.be.an('object');
      iugu.IuguResource._iugu.should.be.equal(iugu);
    });
  });
});
