'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _imageright = require('./imageright');

var _imageright2 = _interopRequireDefault(_imageright);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '0.0.3';

var Library = function () {
  function Library(baseUrl) {
    (0, _classCallCheck3.default)(this, Library);

    this.baseUrl = baseUrl;
    this.version = VERSION;
  }

  (0, _createClass3.default)(Library, [{
    key: 'createAPI',
    value: function createAPI(_ref) {
      var AccessToken = _ref.AccessToken,
          tokenType = _ref.tokenType;

      this.api = new _imageright2.default(this.baseUrl, AccessToken, tokenType);
      return _promise2.default.resolve(this.api);
    }
  }, {
    key: 'connect',
    value: function connect(username, password) {
      return (0, _imageright.authenticate)(this.baseUrl, username, password).then(this.createAPI.bind(this));
    }
  }, {
    key: 'beginVIMAuthorization',
    value: function beginVIMAuthorization() {
      var vimOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _imageright.createVIMAuthorization)(vimOptions);
    }
  }, {
    key: 'connectVIM',
    value: function connectVIM(username, password) {
      var vimOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return (0, _imageright.authenticateVIM)(username, password, vimOptions).then(this.createAPI.bind(this));
    }
  }, {
    key: 'connectVIMWithCode',
    value: function connectVIMWithCode(code) {
      var vimOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _imageright.exchangeVIMAuthorizationCode)(code, vimOptions).then(this.createAPI.bind(this));
    }
  }]);
  return Library;
}();

exports.default = Library;