'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.addNoteContainer = addNoteContainer;
exports.addNoteItem = addNoteItem;
exports.getNotes = getNotes;
exports.lockNote = lockNote;
exports.setNoteAsDefault = setNoteAsDefault;
exports.unlockNote = unlockNote;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addNoteContainer(api, objectId, category) {
  return api.post('api/objects/' + objectId + '/notes/' + category).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function addNoteItem(api, objectId, noteObj) {
  return api.post('api/objects/' + objectId + '/notes', noteObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getNotes(api, objectId, category, status, includeHidden, includeDeleted) {
  var qstrs = [];
  if (status) qstrs.push('status=' + status);
  if (includeHidden) qstrs.push('includeHidden=' + includeHidden);
  if (includeDeleted) qstrs.push('includeDeleted=' + includeDeleted);
  var qstr = qstrs.length ? '?' + qstrs.join('&') : '';
  return api.get('api/objects/' + objectId + '/notes/' + category + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function lockNote(api, objectId, category, version) {
  var qstr = '?version=' + version;
  return api.post('api/objects/' + objectId + '/notes/' + category + '/lock' + qstr).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function setNoteAsDefault(api, objectId, category, collectionId) {
  return api.post('api/objects/' + objectId + '/notes/' + category + '/' + collectionId + '/setasdefault').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function unlockNote(api, objectId, category) {
  return api.post('api/objects/' + objectId + '/notes/' + category + '/unlock').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}