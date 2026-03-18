'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.createDocument = createDocument;
exports.findDocuments = findDocuments;
exports.getDocumentById = getDocumentById;
exports.moveDocument = moveDocument;
exports.updateProperties = updateProperties;
exports.copyDocument = copyDocument;
exports.deleteDocument = deleteDocument;
exports.moveDocumentV2 = moveDocumentV2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDocument(api, docObj) {
  return api.post('api/documents', docObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function findDocuments(api, searchObj) {
  return api.post('api/documents/find', searchObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getDocumentById(api, docId) {
  return api.get('api/documents/' + docId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function moveDocument(api, moveObj) {
  return api.post('api/documents/move', moveObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function updateProperties(api, docId, propObj) {
  return api.post('api/documents/' + docId + '/properties', propObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

// V2

function copyDocument(api, copyObj) {
  return api.post('api/v2/documents/copy', copyObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function deleteDocument(api, docId, force) {
  var qstr = force ? '?force=true' : '';
  return api.delete('api/v2/documents/' + docId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function moveDocumentV2(api, moveObj) {
  return api.post('api/v2/documents/move', moveObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}