"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.getDocumentOverlayInfo = getDocumentOverlayInfo;
exports.getOverlayImage = getOverlayImage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDocumentOverlayInfo(api, docId) {
  return api.get("api/documents/" + docId + "/overlayInfo").then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getOverlayImage(api, overlayId, overlayImageId) {
  return api.get("api/overlays/" + overlayId + "?overlayImageId=" + overlayImageId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}