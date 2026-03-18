import ImageRight, {
  authenticate,
  authenticateVIM,
  createVIMAuthorization,
  exchangeVIMAuthorizationCode,
} from './imageright';

const VERSION = '0.0.3';

class Library {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.version = VERSION;
  }

  createAPI({ AccessToken, tokenType }) {
    this.api = new ImageRight(this.baseUrl, AccessToken, tokenType);
    return Promise.resolve(this.api);
  }

  connect(username, password) {
    return authenticate(this.baseUrl, username, password)
      .then(this.createAPI.bind(this));
  }

  beginVIMAuthorization(vimOptions = {}) {
    return createVIMAuthorization(vimOptions);
  }

  connectVIM(username, password, vimOptions = {}) {
    return authenticateVIM(username, password, vimOptions)
      .then(this.createAPI.bind(this));
  }

  connectVIMWithCode(code, vimOptions = {}) {
    return exchangeVIMAuthorizationCode(code, vimOptions)
      .then(this.createAPI.bind(this));
  }

}

export default Library;
