'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getContainers = getContainers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */

function getContainers(api, containerId, recursive) {
  var qstr = recursive ? '?recursive=true' : '?recursive=false';
  return api.get('api/containers/' + containerId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}