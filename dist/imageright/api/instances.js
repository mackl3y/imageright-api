"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.createInstances = createInstances;
exports.getInstanceChildren = getInstanceChildren;
exports.getParentPath = getParentPath;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInstances(api, id, instObj) {
  return api.post("api/instances/" + id + "/children", instObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getInstanceChildren(api, id) {
  return api.get("api/instances/" + id + "/children").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getParentPath(api, id, isContainer) {
  var qstr = "?id=" + id + "&isContainer=" + isContainer;
  return api.get("api/instances/getparentpath" + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}