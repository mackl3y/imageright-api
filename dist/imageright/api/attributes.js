"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.getAttributeById = getAttributeById;
exports.getAttributeByName = getAttributeByName;
exports.getAttributeByObject = getAttributeByObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAttributeById(api, objId, attId) {
  return api.get("api/containers/" + objId + "/attributes/" + attId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getAttributeByName(api, objId, attName) {
  return api.get("api/containers/" + objId + "/attributes/" + attName).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getAttributeByObject(api, objId) {
  return api.get("api/attributes/" + objId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}