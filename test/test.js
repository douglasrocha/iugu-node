import assert from 'assert';
import Iugu from '../lib/iugu';
import { ApiKey } from './TestKey';

describe('Main iugu object creation', () => {
  describe('When instantiated', () => {
    it('should be defined and not null', () => {
      const iugu = new Iugu(ApiKey, 'latest');
      assert.notEqual(iugu, undefined);
      assert.notEqual(iugu, null);
    });
  });
});
