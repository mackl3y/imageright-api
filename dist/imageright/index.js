'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exchangeVIMAuthorizationCode = exports.createVIMAuthorization = exports.authenticateVIM = exports.authenticate = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _authentication = require('./api/authentication');

Object.defineProperty(exports, 'authenticate', {
  enumerable: true,
  get: function get() {
    return _authentication.authenticate;
  }
});
Object.defineProperty(exports, 'authenticateVIM', {
  enumerable: true,
  get: function get() {
    return _authentication.authenticateVIM;
  }
});
Object.defineProperty(exports, 'createVIMAuthorization', {
  enumerable: true,
  get: function get() {
    return _authentication.createVIMAuthorization;
  }
});
Object.defineProperty(exports, 'exchangeVIMAuthorizationCode', {
  enumerable: true,
  get: function get() {
    return _authentication.exchangeVIMAuthorizationCode;
  }
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _accounts = require('./api/accounts');

var accounts = _interopRequireWildcard(_accounts);

var _attributes = require('./api/attributes');

var attributes = _interopRequireWildcard(_attributes);

var _batches = require('./api/batches');

var batches = _interopRequireWildcard(_batches);

var _containers = require('./api/containers');

var containers = _interopRequireWildcard(_containers);

var _documents = require('./api/documents');

var documents = _interopRequireWildcard(_documents);

var _drawers = require('./api/drawers');

var drawers = _interopRequireWildcard(_drawers);

var _files = require('./api/files');

var files = _interopRequireWildcard(_files);

var _folders = require('./api/folders');

var folders = _interopRequireWildcard(_folders);

var _images = require('./api/images');

var images = _interopRequireWildcard(_images);

var _objecttypes = require('./api/objecttypes');

var objecttypes = _interopRequireWildcard(_objecttypes);

var _pages = require('./api/pages');

var pages = _interopRequireWildcard(_pages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '6.2.23.1417';

var ImageRight = function () {
  function ImageRight(baseUrl, AccessToken) {
    var tokenType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'AccessToken';
    (0, _classCallCheck3.default)(this, ImageRight);

    this.version = VERSION;
    this.baseUrl = baseUrl;
    this.AccessToken = AccessToken;
    this.tokenType = tokenType;
  }

  (0, _createClass3.default)(ImageRight, [{
    key: 'api',
    value: function api() {
      return _axios2.default.create({
        baseURL: this.baseUrl,
        headers: { Authorization: this.tokenType + ' ' + this.AccessToken }
      });
    }

    // Accounts

  }, {
    key: 'getAccount',
    value: function getAccount(accountId, type) {
      return accounts.getAccount(this.api(), accountId, type);
    }
  }, {
    key: 'getAccountGroups',
    value: function getAccountGroups(accountId) {
      return accounts.getAccountGroups(this.api(), accountId);
    }
  }, {
    key: 'getAllAccounts',
    value: function getAllAccounts() {
      return accounts.getAllAccounts(this.api());
    }
  }, {
    key: 'getCurrentUserAccount',
    value: function getCurrentUserAccount() {
      return accounts.getCurrentUserAccount(this.api());
    }
  }, {
    key: 'getCurrentUserGroups',
    value: function getCurrentUserGroups() {
      return accounts.getCurrentUserGroups(this.api());
    }

    // Attributes

  }, {
    key: 'getAttributeById',
    value: function getAttributeById(objId, attId) {
      return attributes.getAttributeById(this.api(), objId, attId);
    }
  }, {
    key: 'getAttributeByName',
    value: function getAttributeByName(objId, attName) {
      return attributes.getAttributeByName(this.api(), objId, attName);
    }
  }, {
    key: 'getAttributeByObject',
    value: function getAttributeByObject(objId) {
      return attributes.getAttributeByObject(this.api(), objId);
    }

    // Batches

  }, {
    key: 'createBatch',
    value: function createBatch(batch) {
      return batches.createBatch(this.api(), batch);
    }

    // Containers

  }, {
    key: 'getContainers',
    value: function getContainers(containerId, recursive) {
      return containers.getContainers(this.api(), containerId, recursive);
    }

    // Documents

  }, {
    key: 'createDocument',
    value: function createDocument(doc) {
      return documents.createDocument(this.api(), doc);
    }
  }, {
    key: 'findDocuments',
    value: function findDocuments(search) {
      return documents.findDocuments(this.api(), search);
    }
  }, {
    key: 'getDocumentById',
    value: function getDocumentById(docId) {
      return documents.getDocumentById(this.api(), docId);
    }
  }, {
    key: 'moveDocument',
    value: function moveDocument(move) {
      var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      if (ver === 2) return documents.moveDocumentV2(this.api(), move);
      return documents.moveDocument(this.api(), move);
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(docId, props) {
      return documents.updateProperties(this.api(), docId, props);
    }
  }, {
    key: 'copyDocument',
    value: function copyDocument(copy) {
      return documents.copyDocument(this.api(), copy);
    }
  }, {
    key: 'deleteDocument',
    value: function deleteDocument(docId, force) {
      return documents.deleteDocument(this.api(), docId, force);
    }

    // Drawers

  }, {
    key: 'getDrawers',
    value: function getDrawers() {
      return drawers.getDrawers(this.api());
    }
  }, {
    key: 'getDrawerById',
    value: function getDrawerById(id) {
      return drawers.getDrawerById(this.api(), id);
    }
  }, {
    key: 'getDrawerByName',
    value: function getDrawerByName(name) {
      return drawers.getDrawerByName(this.api(), name);
    }
  }, {
    key: 'getDrawersInContainer',
    value: function getDrawersInContainer(containerId) {
      return drawers.getDrawersInContainer(this.api(), containerId);
    }
  }, {
    key: 'getDrawersInContainerByName',
    value: function getDrawersInContainerByName(containerId, name) {
      return drawers.getDrawersInContainerByName(this.api(), containerId, name);
    }

    // Files

  }, {
    key: 'createFile',
    value: function createFile(file) {
      return files.createFile(this.api(), file);
    }
  }, {
    key: 'findFiles',
    value: function findFiles(search) {
      return files.findFiles(this.api(), search);
    }
  }, {
    key: 'getFileById',
    value: function getFileById(fileId, includeHasNotes) {
      return files.getFileById(this.api(), fileId, includeHasNotes);
    }

    // Folders

  }, {
    key: 'createFolder',
    value: function createFolder(folder) {
      return folders.createFolder(this.api(), folder);
    }
  }, {
    key: 'findFolders',
    value: function findFolders(search) {
      return folders.findFolders(this.api(), search);
    }
  }, {
    key: 'getFolderById',
    value: function getFolderById(folderId, includeHasNotes) {
      return folders.getFolderById(this.api(), folderId, includeHasNotes);
    }

    // Images

  }, {
    key: 'getImageById',
    value: function getImageById(imageId, version) {
      return images.getImageById(this.api(), imageId, version);
    }

    // ObjectTypes

  }, {
    key: 'getAllowedTypes',
    value: function getAllowedTypes(typeId) {
      return objecttypes.getAllowedTypes(this.api(), typeId);
    }
  }, {
    key: 'getAllowedTypesForContainer',
    value: function getAllowedTypesForContainer(objectId) {
      return objecttypes.getAllowedTypesForContainer(this.api(), objectId);
    }
  }, {
    key: 'getAttributeDefinitionsForType',
    value: function getAttributeDefinitionsForType(objectTypeId) {
      return objecttypes.getAttributeDefinitionsForType(this.api(), objectTypeId);
    }
  }, {
    key: 'getFileTypeExtensions',
    value: function getFileTypeExtensions(fileTypeId) {
      return objecttypes.getFileTypeExtensions(this.api(), fileTypeId);
    }
  }, {
    key: 'getFileTypeTemplate',
    value: function getFileTypeTemplate(fileTypeId) {
      return objecttypes.getFileTypeTemplate(this.api(), fileTypeId);
    }
  }, {
    key: 'getObjectType',
    value: function getObjectType(objectTypeId) {
      return objecttypes.getObjectType(this.api(), objectTypeId);
    }
  }, {
    key: 'getSortOptionsForType',
    value: function getSortOptionsForType(objectTypeId) {
      return objecttypes.getSortOptionsForType(this.api(), objectTypeId);
    }
  }, {
    key: 'getTypesForClass',
    value: function getTypesForClass(standardObjectClass) {
      return objecttypes.getTypesForClass(this.api(), standardObjectClass);
    }

    // Pages

  }, {
    key: 'checkReadPermissions',
    value: function checkReadPermissions(pageId) {
      return pages.checkReadPermissions(this.api(), pageId);
    }
  }, {
    key: 'createPage',
    value: function createPage(page) {
      return pages.createPage(this.api(), page);
    }
  }, {
    key: 'getAllPagesFromDocument',
    value: function getAllPagesFromDocument(docId) {
      return pages.getAllPagesFromDocument(this.api(), docId);
    }
  }]);
  return ImageRight;
}();

exports.default = ImageRight;