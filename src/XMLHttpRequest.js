window.XMLHttpRequestReal = window.XMLHttpRequest;

class XMLHttpRequest extends window.XMLHttpRequestReal {
  constructor() {
    super();

    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    this.req = {
      uri: null,
      url: '',
      method: 'GET',
      headers: new window.Headers(),
    };
  }

  getAllResponseHeaders() {
    if (this.req.response === false) {
      return super.getAllResponseHeaders();
    }
    let headers = '';
    for (const [name, value] of this.res.headers.entries()) {
      headers += `${name}: ${value}\r\n`;
    }
    return headers;
  }

  getResponseHeader(name) {
    if (this.req.response === false) {
      return super.getResponseHeader(name);
    }
    return this.req.headers.get(name);
  }

  open(method, url, async = true, ...args) {
    super.open(method, url, async, ...args);
    this.req.uri = new window.URL(url, window.location.href);
    this.req.url = this.req.uri.href;
    this.req.method = method.toUpperCase();
  }

  setRequestHeader(name, value) {
    super.setRequestHeader(name, value);
    this.req.headers.set(name, value);
  }

  async send(value = '') {
    this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.req.headers.set('Host', this.req.uri.host);
    this.req.headers.set('User-Agent', window.navigator.userAgent);
    this.req.headers.set('Accept', '*/*');
    this.req.headers.set('Referer', window.location.href);
    this.req.headers.set('Accept-Language', window.navigator.language);
    this.req.headers.set('Cookie', window.document.cookie);
    if (this.req.method === 'POST' || this.req.method === 'PUT') {
      this.req.body = value;
    }

    this.res = await XMLHttpRequest.handle(this.req);

    if (this.res.status === 444) {
      return super.send(value);
    }
    
    // remove readonly
    Object.defineProperties(this, {
      readyState: { value: 4, configurable: true, enumerable: true, writable: true },
      status: { value: 200, configurable: true, enumerable: true, writable: true },
      statusText: { value: 'OK', configurable: true, enumerable: true, writable: true },
      responseText: { value: '', configurable: true, enumerable: true, writable: true },
      // response: { value: null, configurable: true, enumerable: true, writable: true },
      // responseURL: { value: window.location.href, configurable: true, enumerable: true, writable: true },
      // responseXML: { value: null, configurable: true, enumerable: true, writable: true },
      // upload: { value: null, configurable: true, enumerable: true, writable: true },
    });

    this.readyState = 4;
    this.status = this.res.status;
    this.statusText = this.res.statusText;
    this.responseText = await this.res.text();

    setTimeout(() => {
      if (this.onload) {
        this.onload();
      } else if (this.onreadystatechange) {
        this.onreadystatechange();
      } else {
        this.dispatchEvent(new Event('load'))
      }
    }, XMLHttpRequest.delay);
  }
}

XMLHttpRequest.delay = 200;

XMLHttpRequest.handle = async function(req) {
  req.response.status = 444;
};

module.exports = XMLHttpRequest;
