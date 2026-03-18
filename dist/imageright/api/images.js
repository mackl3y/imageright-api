'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getImageById = getImageById;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */

function getImageById(api, imageId, version) {
  var qstr = version ? '?version=' + version : '?version=0';
  return api.get('api/images/' + imageId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}