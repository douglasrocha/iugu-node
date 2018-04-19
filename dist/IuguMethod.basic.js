'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IuguMethod = require('./IuguMethod');

var _IuguMethod2 = _interopRequireDefault(_IuguMethod);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  create: (0, _IuguMethod2.default)({
    method: 'POST'
  }),

  list: (0, _IuguMethod2.default)({
    method: 'GET'
  }),

  retrieve: (0, _IuguMethod2.default)({
    method: 'GET',
    path: '/{id}',
    urlParams: ['id']
  }),

  update: (0, _IuguMethod2.default)({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  del: (0, _IuguMethod2.default)({
    method: 'DELETE',
    path: '{id}',
    urlParams: ['id']
  })
};