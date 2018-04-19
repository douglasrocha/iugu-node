import utils from './utils';

export default class _Error extends Error {
  constructor () {
    this.type = 'IuguError',
    this.populate = (raw) => {
      this.type = this.type;
      this.rawType = raw.type;
      this.code = raw.code;
      this.param = raw.param;
      this.message = raw.message;
      this.detail = raw.detail;
      this.raw = raw;
    };
  }

  generate (rawIuguError) {
    switch (rawIuguError.type) {
    case 'card_error':
      return new IuguCardError(rawIuguError);
    case 'invalid_request_error':
      return new IuguInvalidRequestError(rawIuguError);
    case 'api_error':
      return new IuguAPIError(rawIuguError);
    }
    return new _Error('Generic', 'Unknown Error');
  }
}

class IuguCardError extends _Error {
  constructor () {
    super();
    this.type = 'IuguCardError';
  }
}

class IuguInvalidRequestError extends _Error {
  constructor () {
    super();
    this.type = 'IuguInvalidRequest';
  }
}

class IuguAPIError extends _Error {
  constructor () {
    super();
    this.type = 'IuguAPIError';
  }
}

class IuguAuthenticationError extends _Error {
  constructor () {
    super();
    this.type = 'IuguAuthenticationError';
  }
}

class IuguConnectionError extends _Error {
  constructor () {
    super();
    this.type = 'IuguConnectionError';
  }
}
