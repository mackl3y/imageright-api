'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getFileMarkDefinitions = getFileMarkDefinitions;
exports.getFileMarkDefinitionsByFileTypeId = getFileMarkDefinitionsByFileTypeId;
exports.getFileMarkDefinitionsByFileTypeIdV2 = getFileMarkDefinitionsByFileTypeIdV2;
exports.getFileMarkDefinitionsV2 = getFileMarkDefinitionsV2;
exports.getImageDataForFileMark = getImageDataForFileMark;
exports.getImageDataForPageMark = getImageDataForPageMark;
exports.getMarksForFile = getMarksForFile;
exports.getMarksForPage = getMarksForPage;
exports.getPageMarkDefinitions = getPageMarkDefinitions;
exports.getPageMarkDefinitionsByFileTypeId = getPageMarkDefinitionsByFileTypeId;
exports.getPageMarksForFile = getPageMarksForFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFileMarkDefinitions(api) {
  return api.get('api/marks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getFileMarkDefinitionsByFileTypeId(api, fileTypeId) {
  return api.get('api/marks?fileTypeId=' + fileTypeId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

// V2

function getFileMarkDefinitionsByFileTypeIdV2(api, fileTypeId) {
  return api.get('api/v2/objectypes/' + fileTypeId + '/filemarks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getFileMarkDefinitionsV2(api) {
  return api.get('api/v2/filemarks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getImageDataForFileMark(api, markId) {
  return api.get('api/v2/filemarks/' + markId + '/image').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getImageDataForPageMark(api, markId) {
  return api.get('api/v2/pagemarks/' + markId + '/image').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getMarksForFile(api, fileId) {
  return api.get('api/v2/files/' + fileId + '/marks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getMarksForPage(api, pageId) {
  return api.get('api/v2/pages/' + pageId + '/marks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getPageMarkDefinitions(api) {
  return api.get('api/v2/pagemarks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getPageMarkDefinitionsByFileTypeId(api, fileTypeId) {
  return api.get('api/v2/objectypes/' + fileTypeId + '/pagemarks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getPageMarksForFile(api, fileId) {
  return api.get('api/v2/files/' + fileId + '/pagemarks').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}