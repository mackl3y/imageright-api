"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.getAllowedTypes = getAllowedTypes;
exports.getAllowedTypesForContainer = getAllowedTypesForContainer;
exports.getAttributeDefinitionsForType = getAttributeDefinitionsForType;
exports.getFileTypeExtensions = getFileTypeExtensions;
exports.getFileTypeTemplate = getFileTypeTemplate;
exports.getObjectType = getObjectType;
exports.getSortOptionsForType = getSortOptionsForType;
exports.getTypesForClass = getTypesForClass;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllowedTypes(api, typeId) {
  return api.get("api/objecttypes/allowedtypes?typeId=" + typeId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getAllowedTypesForContainer(api, objectId) {
  return api.get("api/containers/" + objectId + "/allowedtypes").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getAttributeDefinitionsForType(api, objectTypeId) {
  return api.get("api/objecttypes/" + objectTypeId + "/attributes").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getFileTypeExtensions(api, fileTypeId) {
  return api.get("api/objecttypes/" + fileTypeId + "/extensions").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getFileTypeTemplate(api, fileTypeId) {
  return api.get("api/objecttypes/" + fileTypeId + "/template").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getObjectType(api, objectTypeId) {
  return api.get("api/objecttypes/" + objectTypeId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getSortOptionsForType(api, objectTypeId) {
  return api.get("api/objecttypes/" + objectTypeId + "/sortoptions").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getTypesForClass(api, standardObjectClass) {
  return api.get("api/objecttypes/" + standardObjectClass).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}