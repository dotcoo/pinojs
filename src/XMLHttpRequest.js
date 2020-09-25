const { Request } = require('./Server');

window.XMLHttpRequestReal = window.XMLHttpRequest;

class XMLHttpRequest extends window.XMLHttpRequestReal {
  constructor() {
    super();

    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    this.req = null;
  }

  getAllResponseHeaders() {
    if (this.req.response.status === 444) {
      return super.getAllResponseHeaders();
    }
    let headers = '';
    for (const [name, value] of this.req.response.headers.entries()) {
      headers += `${name}: ${value}\r\n`;
    }
    return headers;
  }

  getResponseHeader(name) {
    if (this.req.response.status === 444) {
      return super.getResponseHeader(name);
    }
    return this.req.response.headers.get(name);
  }

  open(method, url, async = true, ...args) {
    super.open(method, url, async, ...args);
    this.req = new Request(url, { method });
  }

  setRequestHeader(name, value) {
    super.setRequestHeader(name, value);
    this.req.headers.set(name, value);
  }

  async send(value = '') {
    const req = this.req;

    this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.headers.set('Host', req.uri.host);
    req.headers.set('User-Agent', window.navigator.userAgent);
    req.headers.set('Accept', '*/*');
    req.headers.set('Referer', window.location.href);
    req.headers.set('Accept-Language', window.navigator.language);
    req.headers.set('Cookie', window.document.cookie);
    if (req.method === 'POST' || req.method === 'PUT') {
      req.body = value;
    }

    await XMLHttpRequest.handle(req);

    const response = req.response;
    if (response.status === 444) {
      return super.send(value);
    }
    
    // remove readonly
    Object.defineProperties(this, {
      readyState: { value: 4, configurable: true, enumerable: true, writable: true },
      status: { value: 200, configurable: true, enumerable: true, writable: true },
      statusText: { value: 'OK', configurable: true, enumerable: true, writable: true },
      responseText: { value: '', configurable: true, enumerable: true, writable: true },
      response: { value: null, configurable: true, enumerable: true, writable: true },
      // responseURL: { value: window.location.href, configurable: true, enumerable: true, writable: true },
      // responseXML: { value: null, configurable: true, enumerable: true, writable: true },
      // upload: { value: null, configurable: true, enumerable: true, writable: true },
    });

    this.readyState = 4;
    this.status = response.status;
    this.statusText = response.statusText;
    this.response = this.responseText = await response.text();
    if (this.responseType === 'json' ) {
      this.response = JSON.parse(this.responseText);
    }

    setTimeout(() => {
      if (this.onload) {
        this.onload();
      } else if (this.onreadystatechange) {
        this.onreadystatechange();
      } else {
        this.dispatchEvent(new Event('load'));
      }
    }, XMLHttpRequest.delay);
  }
}

XMLHttpRequest.delay = 200;

XMLHttpRequest.handle = async function(req) {
  req.response.status = 444;
};

module.exports = XMLHttpRequest;
