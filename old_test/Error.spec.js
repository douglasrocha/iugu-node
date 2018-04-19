'use strict';

require('./testUtils');

const Error = require('../lib/Error');
const expect = require('chai').expect;

describe('Error', () => {
  it('Populates with type and message params', () => {
    const e = new Error('FooError', 'Foo happened');
    expect(e).to.have.property('type', 'FooError');
    expect(e).to.have.property('message', 'Foo happened');
  });

  describe('IuguError', () => {
    it('Generates specific instance depending on error-type', () => {
      expect(Error.IuguError.generate({ type: 'card_error' })).to.be.instanceOf(Error.IuguCardError);
      expect(Error.IuguError.generate({ type: 'invalid_request_error' })).to.be.instanceOf(Error.IuguInvalidRequestError);
      expect(Error.IuguError.generate({ type: 'api_error' })).to.be.instanceOf(Error.IuguAPIError);
    });
  });
});
