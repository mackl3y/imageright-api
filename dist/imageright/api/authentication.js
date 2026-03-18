'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.authenticate = authenticate;
exports.createVIMAuthorization = createVIMAuthorization;
exports.authenticateVIM = authenticateVIM;
exports.exchangeVIMAuthorizationCode = exchangeVIMAuthorizationCode;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function encodeBase64Url(buffer) {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function normalizeScope(scope) {
  return Array.isArray(scope) ? scope.join(' ') : scope;
}

function createRandomValue() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

  return encodeBase64Url(_crypto2.default.randomBytes(size));
}

function createCodeChallenge(codeVerifier) {
  return encodeBase64Url(_crypto2.default.createHash('sha256').update(codeVerifier).digest());
}

function authenticate(baseURL, UserName, Password) {
  var config = { baseURL: baseURL };
  return _axios2.default.post('api/authenticate', { UserName: UserName, Password: Password }, config).then(function (res) {
    return { AccessToken: res.data, tokenType: 'AccessToken' };
  });
}

function createVIMAuthorization() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$idpDomain = _ref.idpDomain,
      idpDomain = _ref$idpDomain === undefined ? 'login.apps.vertafore.com' : _ref$idpDomain,
      _ref$clientId = _ref.clientId,
      clientId = _ref$clientId === undefined ? 'imageright-desktop-ui' : _ref$clientId,
      redirectUri = _ref.redirectUri,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? 'openid profile' : _ref$scope,
      state = _ref.state,
      codeVerifier = _ref.codeVerifier,
      _ref$extraParams = _ref.extraParams,
      extraParams = _ref$extraParams === undefined ? {} : _ref$extraParams;

  if (!redirectUri) {
    throw new Error('redirectUri is required for VIM authorization.');
  }

  var resolvedState = state || createRandomValue(16);
  var resolvedCodeVerifier = codeVerifier || createRandomValue(48);
  var params = new URLSearchParams();

  params.append('response_type', 'code');
  params.append('client_id', clientId);
  params.append('redirect_uri', redirectUri);
  params.append('scope', normalizeScope(scope));
  params.append('state', resolvedState);
  params.append('code_challenge', createCodeChallenge(resolvedCodeVerifier));
  params.append('code_challenge_method', 'S256');

  (0, _keys2.default)(extraParams).forEach(function (key) {
    if (extraParams[key] !== undefined && extraParams[key] !== null) {
      params.append(key, extraParams[key]);
    }
  });

  return {
    authorizationUrl: 'https://' + idpDomain + '/as/authorization.oauth2?' + params.toString(),
    state: resolvedState,
    codeVerifier: resolvedCodeVerifier,
    redirectUri: redirectUri
  };
}

function authenticateVIM(username, password) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$idpDomain = _ref2.idpDomain,
      idpDomain = _ref2$idpDomain === undefined ? 'login.apps.vertafore.com' : _ref2$idpDomain,
      _ref2$clientId = _ref2.clientId,
      clientId = _ref2$clientId === undefined ? 'imageright-desktop-ui' : _ref2$clientId,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? 'openid profile' : _ref2$scope;

  var tokenUrl = 'https://' + idpDomain + '/as/token.oauth2';
  var params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);
  params.append('client_id', clientId);
  params.append('scope', scope);

  return _axios2.default.post(tokenUrl, params).then(function (res) {
    return { AccessToken: res.data.access_token, tokenType: 'Bearer' };
  });
}

function exchangeVIMAuthorizationCode(code) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$idpDomain = _ref3.idpDomain,
      idpDomain = _ref3$idpDomain === undefined ? 'login.apps.vertafore.com' : _ref3$idpDomain,
      _ref3$clientId = _ref3.clientId,
      clientId = _ref3$clientId === undefined ? 'imageright-desktop-ui' : _ref3$clientId,
      redirectUri = _ref3.redirectUri,
      codeVerifier = _ref3.codeVerifier,
      clientSecret = _ref3.clientSecret,
      _ref3$extraParams = _ref3.extraParams,
      extraParams = _ref3$extraParams === undefined ? {} : _ref3$extraParams;

  if (!code) {
    return _promise2.default.reject(new Error('authorization code is required.'));
  }

  if (!redirectUri) {
    return _promise2.default.reject(new Error('redirectUri is required to exchange a VIM authorization code.'));
  }

  var tokenUrl = 'https://' + idpDomain + '/as/token.oauth2';
  var params = new URLSearchParams();

  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('client_id', clientId);
  params.append('redirect_uri', redirectUri);

  if (codeVerifier) params.append('code_verifier', codeVerifier);
  if (clientSecret) params.append('client_secret', clientSecret);

  (0, _keys2.default)(extraParams).forEach(function (key) {
    if (extraParams[key] !== undefined && extraParams[key] !== null) {
      params.append(key, extraParams[key]);
    }
  });

  return _axios2.default.post(tokenUrl, params).then(function (res) {
    var tokenType = res.data.token_type || 'Bearer';

    return {
      AccessToken: res.data.access_token,
      tokenType: tokenType,
      refreshToken: res.data.refresh_token,
      expiresIn: res.data.expires_in
    };
  });
}