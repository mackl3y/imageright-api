'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.findVapTasks = findVapTasks;
exports.findVapTasksByClientId = findVapTasksByClientId;
exports.getClientFiles = getClientFiles;
exports.getPolicyFolder = getPolicyFolder;
exports.getVersion = getVersion;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findVapTasks(api, filterObj, skip, top) {
  var qstrs = [];
  if (skip) qstrs.push('skip=' + skip);
  if (top) qstrs.push('top=' + top);
  var qstr = qstrs.length >= 0 ? '?' + qstrs.join('&') : '';
  return api.post('api/integration/vap/tasks/find' + qstr, filterObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function findVapTasksByClientId(api, clientId, filterObj, skip, top, includeDeletedFiles) {
  var qstrs = [];
  if (skip) qstrs.push('skip=' + skip);
  if (top) qstrs.push('top=' + top);
  if (includeDeletedFiles) qstrs.push('includeDeletedFiles=' + includeDeletedFiles);
  var qstr = qstrs.length >= 0 ? '?' + qstrs.join('&') : '';
  return api.post('api/integration/vap/client/' + clientId + '/tasks/find' + qstr, filterObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getClientFiles(api, clientId, includeDeletedFiles) {
  var qstr = includeDeletedFiles ? '?includeDeletedFiles=' + includeDeletedFiles : '';
  return api.get('api/integration/vap/files/client/' + clientId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getPolicyFolder(api, policyId, includeDeletedFiles) {
  var qstr = includeDeletedFiles ? '?includeDeletedFiles=' + includeDeletedFiles : '';
  return api.get('api/integration/vap/files/policy/' + policyId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getVersion(api) {
  return api.get('api/integration/version').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}