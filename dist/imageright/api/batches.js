'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.createBatch = createBatch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */

function createBatch(api, batch) {
  return api.post('api/batches', batch).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}