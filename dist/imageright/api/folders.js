'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.createFolder = createFolder;
exports.findFolders = findFolders;
exports.getFolderById = getFolderById;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFolder(api, folderObj) {
  return api.post('api/folders', folderObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function findFolders(api, searchObj) {
  return api.post('api/folders/find', searchObj).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getFolderById(api, folderId, includeHasNotes) {
  var qstr = includeHasNotes ? '?includeHasNotes=true' : '';
  return api.get('api/folders/' + folderId + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}