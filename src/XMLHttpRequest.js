window.XMLHttpRequestReal = window.XMLHttpRequest;

class XMLHttpRequest extends window.XMLHttpRequestReal {
  constructor() {
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    super();

    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    this.req = new window.Request('', {});
    Object.defineProperties(this.req, {
      method: { configurable: true, enumerable: false, value: 'GET', writable: true },
      url: { configurable: true, enumerable: false, value: '', writable: true },
      body: { configurable: true, enumerable: false, value: '', writable: true },
    });

    // https://developer.mozilla.org/en-US/docs/Web/API/Response
    this.res = null;

    Object.defineProperties(this, {
      readyState: { configurable: true, enumerable: false, value: 4, writable: true },
      status: { configurable: true, enumerable: false, value: 200, writable: true },
      statusText: { configurable: true, enumerable: false, value: 'OK', writable: true },
      responseText: { configurable: true, enumerable: false, value: '', writable: true },
    });
  }

  open(method, url, async = true, ...args) {
    super.open(method, url, async, ...args);
    this.req.method = method.toUpperCase();
    this.req.uri = new URL(url, window.location.href);
    this.req.url = this.req.uri.href;
  }

  setRequestHeader(name, value) {
    super.setRequestHeader(name, value);
    this.req.headers.set(name, value);
  }

  getAllResponseHeaders() {
    let headers = '';
    for (const [name, value] of this.res.headers.entries()) {
      headers += `${name}: ${value}\r\n`;
    }
    return headers;
  }

  getResponseHeader(name) {
    return this.req.headers.get(name);
  }

  async send(value = '') {
    this.req.headers.set('Host', this.req.uri.host);
    this.req.headers.set('User-Agent', window.navigator.userAgent);
    this.req.headers.set('Accept', '*/*');
    this.req.headers.set('Referer', window.location.href);
    this.req.headers.set('Accept-Language', window.navigator.language);
    this.req.headers.set('Cookie', window.document.cookie);
    this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    this.req.body = value;

    this.res = await XMLHttpRequest.handle(this.req);

    if (this.res === false || (this.res && this.res.status === 404)) {
      return super.send(value);
    }

    this.readyState = 4;
    this.status = this.res.status;
    this.statusText = this.res.statusText;
    this.responseText = this.res.body;

    setTimeout(() => {
      if (this.onload) {
        this.onload();
      } else if (this.onreadystatechange) {
        this.onreadystatechange();
      } else {
        throw new Error('not found onload and onreadystatechange!');
      }
    }, XMLHttpRequest.delay);
  }
}

XMLHttpRequest.delay = 200;

XMLHttpRequest.handle = async function(req) {
  return false;
};

module.exports = XMLHttpRequest;
