"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.getConcurrentLoginData = getConcurrentLoginData;
exports.getMessages = getMessages;
exports.login = login;
exports.logout = logout;
exports.stillAlive = stillAlive;
exports.validateLicense = validateLicense;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConcurrentLoginData(api, featureName) {
  return api.get("api/licensing/" + featureName + "/currentlogindata").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getMessages(api, referenceKey) {
  return api.get("api/licensing/" + referenceKey).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function login(api, programId, featureName) {
  return api.post("api/licensing/" + programId + "/" + featureName + "/login").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function logout(api, loginId, featureName) {
  return api.post("api/licensing/" + loginId + "/" + featureName + "/logout").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function stillAlive(api, referenceKey, programId, featureName) {
  return api.post("api/licensing/" + referenceKey + "/" + programId + "/" + featureName + "/stillalive").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function validateLicense(api, feature) {
  return api.get("api/licensing/ValidateLicese/" + feature).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}