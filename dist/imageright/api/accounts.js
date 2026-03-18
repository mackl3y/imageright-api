'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getAccount = getAccount;
exports.getAccountGroups = getAccountGroups;
exports.getAllAccounts = getAllAccounts;
exports.getCurrentUserAccount = getCurrentUserAccount;
exports.getCurrentUserGroups = getCurrentUserGroups;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAccount(api, accountId, type) {
  var qstr = type ? '?type=' + type : '';
  return api.get('api/accounts/' + accountId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getAccountGroups(api, accountId) {
  return api.get('api/accounts/' + accountId + '/groups').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getAllAccounts(api) {
  return api.get('api/accounts').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getCurrentUserAccount(api) {
  return api.get('api/accounts/current').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getCurrentUserGroups(api) {
  return api.get('api/accounts/current/groups').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}