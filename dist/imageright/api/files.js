'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.createFile = createFile;
exports.findFiles = findFiles;
exports.getFileById = getFileById;
exports.getRelatedFiles = getRelatedFiles;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFile(api, fileObj) {
  return api.post('api/files', fileObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function findFiles(api, searchObj) {
  return api.post('api/files/find', searchObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getFileById(api, fileId, includeHasNotes) {
  var qstr = includeHasNotes ? '?includeHasNotes=true' : '';
  return api.get('api/files/' + fileId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getRelatedFiles(api, fileId) {
  return api.get('api/files/' + fileId + '/related').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}