import axios from 'axios';
import crypto from 'crypto';

function encodeBase64Url(buffer) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function normalizeScope(scope) {
  return Array.isArray(scope) ? scope.join(' ') : scope;
}

function createRandomValue(size = 32) {
  return encodeBase64Url(crypto.randomBytes(size));
}

function createCodeChallenge(codeVerifier) {
  return encodeBase64Url(crypto.createHash('sha256').update(codeVerifier).digest());
}

export function authenticate(baseURL, UserName, Password) {
  const config = { baseURL };
  return axios.post('api/authenticate', { UserName, Password }, config)
    .then(res => ({ AccessToken: res.data, tokenType: 'AccessToken' }));
}

export function createVIMAuthorization({
  idpDomain = 'login.apps.vertafore.com',
  clientId = 'imageright-desktop-ui',
  redirectUri,
  scope = 'openid profile',
  state,
  codeVerifier,
  extraParams = {},
} = {}) {
  if (!redirectUri) {
    throw new Error('redirectUri is required for VIM authorization.');
  }

  const resolvedState = state || createRandomValue(16);
  const resolvedCodeVerifier = codeVerifier || createRandomValue(48);
  const params = new URLSearchParams();

  params.append('response_type', 'code');
  params.append('client_id', clientId);
  params.append('redirect_uri', redirectUri);
  params.append('scope', normalizeScope(scope));
  params.append('state', resolvedState);
  params.append('code_challenge', createCodeChallenge(resolvedCodeVerifier));
  params.append('code_challenge_method', 'S256');

  Object.keys(extraParams).forEach((key) => {
    if (extraParams[key] !== undefined && extraParams[key] !== null) {
      params.append(key, extraParams[key]);
    }
  });

  return {
    authorizationUrl: `https://${idpDomain}/as/authorization.oauth2?${params.toString()}`,
    state: resolvedState,
    codeVerifier: resolvedCodeVerifier,
    redirectUri,
  };
}

export function authenticateVIM(username, password, {
  idpDomain = 'login.apps.vertafore.com',
  clientId = 'imageright-desktop-ui',
  scope = 'openid profile',
} = {}) {
  const tokenUrl = `https://${idpDomain}/as/token.oauth2`;
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);
  params.append('client_id', clientId);
  params.append('scope', scope);

  return axios.post(tokenUrl, params)
    .then(res => ({ AccessToken: res.data.access_token, tokenType: 'Bearer' }));
}

export function exchangeVIMAuthorizationCode(code, {
  idpDomain = 'login.apps.vertafore.com',
  clientId = 'imageright-desktop-ui',
  redirectUri,
  codeVerifier,
  clientSecret,
  extraParams = {},
} = {}) {
  if (!code) {
    return Promise.reject(new Error('authorization code is required.'));
  }

  if (!redirectUri) {
    return Promise.reject(new Error('redirectUri is required to exchange a VIM authorization code.'));
  }

  const tokenUrl = `https://${idpDomain}/as/token.oauth2`;
  const params = new URLSearchParams();

  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('client_id', clientId);
  params.append('redirect_uri', redirectUri);

  if (codeVerifier) params.append('code_verifier', codeVerifier);
  if (clientSecret) params.append('client_secret', clientSecret);

  Object.keys(extraParams).forEach((key) => {
    if (extraParams[key] !== undefined && extraParams[key] !== null) {
      params.append(key, extraParams[key]);
    }
  });

  return axios.post(tokenUrl, params)
    .then((res) => {
      const tokenType = res.data.token_type || 'Bearer';

      return {
        AccessToken: res.data.access_token,
        tokenType,
        refreshToken: res.data.refresh_token,
        expiresIn: res.data.expires_in,
      };
    });
}
