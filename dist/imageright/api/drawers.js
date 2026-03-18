'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getDrawers = getDrawers;
exports.getDrawerById = getDrawerById;
exports.getDrawerByName = getDrawerByName;
exports.getDrawersInContainer = getDrawersInContainer;
exports.getDrawersInContainerByName = getDrawersInContainerByName;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDrawers(api) {
  return api.get('api/drawers').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getDrawerById(api, id) {
  return api.get('api/drawers/' + id).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getDrawerByName(api, name) {
  return api.get('api/drawers/' + name).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getDrawersInContainer(api, containerId) {
  return api.get('api/containers/' + containerId + '/drawers').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getDrawersInContainerByName(api, containerId, name) {
  return api.get('api/containers/' + containerId + '/drawers/' + name).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}