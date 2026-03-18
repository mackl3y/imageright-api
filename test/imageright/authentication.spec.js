import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import nock from 'nock'; // eslint-disable-line import/no-extraneous-dependencies
import Library from '../../src';
import {
  createVIMAuthorization,
  exchangeVIMAuthorizationCode,
} from '../../src/imageright';

describe('ImageRight API - Authentication', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('the method createVIMAuthorization', () => {
    it('should create a PingFederate authorization url with PKCE fields', () => {
      const auth = createVIMAuthorization({
        redirectUri: 'http://localhost:3000/callback',
        state: 'known-state',
        codeVerifier: 'known-verifier',
      });

      expect(auth.authorizationUrl)
        .to.contain('https://login.apps.vertafore.com/as/authorization.oauth2?');
      expect(auth.authorizationUrl).to.contain('response_type=code');
      expect(auth.authorizationUrl).to.contain('client_id=imageright-desktop-ui');
      expect(auth.authorizationUrl)
        .to.contain('redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback');
      expect(auth.authorizationUrl).to.contain('state=known-state');
      expect(auth.authorizationUrl).to.contain('code_challenge=');
      expect(auth.authorizationUrl).to.contain('code_challenge_method=S256');
      expect(auth.state).to.equal('known-state');
      expect(auth.codeVerifier).to.equal('known-verifier');
    });
  });

  describe('the method exchangeVIMAuthorizationCode', () => {
    it('should exchange the authorization code for a bearer token', () => {
      nock('https://login.apps.vertafore.com')
        .post('/as/token.oauth2')
        .reply(200, {
          access_token: 'token-123',
          token_type: 'Bearer',
          refresh_token: 'refresh-123',
          expires_in: 3600,
        });

      return exchangeVIMAuthorizationCode('sample-code', {
        redirectUri: 'http://localhost:3000/callback',
        codeVerifier: 'pkce-verifier',
      }).then((token) => {
        expect(token.AccessToken).to.equal('token-123');
        expect(token.tokenType).to.equal('Bearer');
        expect(token.refreshToken).to.equal('refresh-123');
        expect(token.expiresIn).to.equal(3600);
      });
    });
  });

  describe('the method connectVIMWithCode', () => {
    it('should create an authenticated api instance from the authorization code', () => {
      nock('https://login.apps.vertafore.com')
        .post('/as/token.oauth2')
        .reply(200, {
          access_token: 'api-token-123',
          token_type: 'Bearer',
        });

      const lib = new Library('https://example.imagerightonline.com/tenant/api');

      return lib.connectVIMWithCode('sample-code', {
        redirectUri: 'http://localhost:3000/callback',
        codeVerifier: 'pkce-verifier',
      }).then((api) => {
        expect(api.AccessToken).to.equal('api-token-123');
        expect(api.tokenType).to.equal('Bearer');
        expect(api.baseUrl).to.equal('https://example.imagerightonline.com/tenant/api');
      });
    });
  });
});