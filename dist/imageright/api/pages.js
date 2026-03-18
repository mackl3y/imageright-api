'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.checkReadPermissions = checkReadPermissions;
exports.createPage = createPage;
exports.getAllPagesFromDocument = getAllPagesFromDocument;
exports.getPageById = getPageById;
exports.getPageImageMetadata = getPageImageMetadata;
exports.lockPage = lockPage;
exports.movePage = movePage;
exports.rotatePage = rotatePage;
exports.unlockPage = unlockPage;
exports.updatePageContent = updatePageContent;
exports.updatePageProperties = updatePageProperties;
exports.copyPage = copyPage;
exports.createPageV2 = createPageV2;
exports.mergeToDocument = mergeToDocument;
exports.movePageV2 = movePageV2;
exports.updatePageContentV2 = updatePageContentV2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkReadPermissions(api, pageId) {
  return api.get('api/pages/' + pageId + '/readpermissions').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function createPage(api, page) {
  return api.post('api/pages', page.data, { headers: page.headers }).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getAllPagesFromDocument(api, docId) {
  return api.get('api/documents/' + docId + '/pages').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getPageById(api, pageId) {
  return api.get('api/pages/' + pageId).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function getPageImageMetadata(api, pageId) {
  return api.get('api/pages/' + pageId + '/imagemetadata').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function lockPage(api, pageId) {
  return api.get('api/pages/' + pageId + '/lock').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function movePage(api, moveObj) {
  return api.post('api/pages/move', moveObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function rotatePage(api, pageId, rotationAngle) {
  return api.post('api/pages/' + pageId + '/rotate?rotationAngle=' + rotationAngle).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function unlockPage(api, pageId) {
  return api.get('api/pages/' + pageId + '/unlock').then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function updatePageContent(api, pageId, content) {
  return api.post('api/pages/' + pageId + '/content', content).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function updatePageProperties(api, pageId, properties) {
  return api.post('api/pages/' + pageId + '/properties', properties).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

// V2

function copyPage(api, copyObj) {
  return api.post('api/v2/pages/copy', copyObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function createPageV2(api, page, targetPageId, before) {
  var qstrs = [];
  if (targetPageId) qstrs.push('targetPageId=' + targetPageId);
  if (before) qstrs.push('before=' + before);
  var qstr = qstrs.length ? '?' + qstrs.join('&') : '';
  return api.post('api/v2/pages' + qstr, page).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function mergeToDocument(api, mergeObj) {
  return api.post('api/v2/pages/merge', mergeObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function movePageV2(api, moveObj) {
  return api.post('api/v2/pages/move', moveObj.toJSON()).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}

function updatePageContentV2(api, pageId, content) {
  return api.post('api/v2/pages/' + pageId + '/content', content).then(function (res) {
    return _promise2.default.resolve(res.data);
  });
}