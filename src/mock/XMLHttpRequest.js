import { Request } from './Server';

window.XMLHttpRequestReal = window.XMLHttpRequest;

class XMLHttpRequest extends window.XMLHttpRequestReal {
  getAllResponseHeaders() {
    if (!this.req || !this.req.response) {
      return super.getAllResponseHeaders();
    }
    let headers = '';
    for (const name in this.req.response.headers) {
      headers += `${name}: ${this.req.response.headers[name]}\r\n`;
    }
    return headers;
  }

  getResponseHeader(name) {
    if (!this.req || !this.req.response) {
      return super.getResponseHeader(name);
    }
    return this.req.response.headers[name];
  }

  open(method, url, async = true, ...args) {
    super.open(method, url, async, ...args);
    this.req = new Request({ method, url });
  }

  setRequestHeader(name, value) {
    super.setRequestHeader(name, value);
    this.req.headers[name] = value;
  }

  async send(...args) {
    this.sendInit(...args);
    if (await this.sendRequest(...args)) {
      this.sendResponse();
    }
  }

  sendInit(...args) {
    this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.req.headers['Host'] = this.req.uri.host;
    this.req.headers['User-Agent'] = window.navigator.userAgent;
    this.req.headers['Accept'] = '*/*';
    this.req.headers['Referer'] = window.location.href;
    this.req.headers['Accept-Language'] = window.navigator.language;
    this.req.headers['Cookie'] = window.document.cookie;
    this.req.body = args.length ? args[0] : '';
  }

  async sendRequest(...args) {
    this.req.useIntercept = true;
    if (await XMLHttpRequest.handle(this.req)) {
      return true;
    }
    this.req.useIntercept = false;

    const result = await new Promise(resolve => {
      this.onerror2 = this.onerror;
      this.onerror = (err) => {
        console.log('XMLHttpRequest error:', err);
        resolve(false);
      };
      this.ontimeout2 = this.ontimeout;
      this.ontimeout = (err) => {
        console.log('XMLHttpRequest meout:', err);
        resolve(false);
      };
      this.onload2 = this.onload;
      this.onload = () => {
        this.req.response.status = this.status;
        this.req.response.statusText = this.statusText;
        if (this.readyState === 4 && (this.status >= 500 || this.status === 404)) {
          resolve(false);
        }
        if (this.readyState === 4 && this.status < 500 && this.status !== 404) {
          resolve(true);
          if (this.onload2) {
            this.onload2();
          }
        }
      };
      this.onreadystatechange2 = this.onreadystatechange;
      this.onreadystatechange = () => {
        this.req.response.status = this.status;
        this.req.response.statusText = this.statusText;
        if (this.readyState === 4 && (this.status >= 500 || this.status === 404)) {
          resolve(false);
        }
        if (this.readyState === 4 && this.status < 500 && this.status !== 404) {
          resolve(true);
          if (this.onreadystatechange2) {
            this.onreadystatechange2();
          }
        }
      };
      super.send(...args);
    });
    if (result) {
      return false;
    } else if(!XMLHttpRequest.route(this.req)) {
      if (this.onerror2) {
        this.onerror2();
      } else if (this.ontimeout2) {
        this.ontimeout2();
      }
    }

    this.req.useIntercept = false;
    await XMLHttpRequest.handle(this.req);
    return true;
  }

  sendResponse() {
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
    this.status = this.req.response.status;
    this.statusText = this.req.response.statusText;
    this.response = this.responseText = this.req.response.body;
    if (this.responseType === 'json' ) {
      this.response = this.responseText === '' ? {} : JSON.parse(this.responseText);
    }

    if (this.onload) {
      this.onload();
    } else if (this.onreadystatechange) {
      this.onreadystatechange();
    }
  }
}

XMLHttpRequest.route = function(req) {
  return false;
};

XMLHttpRequest.handle = async function(req) {
  req.response.status = 444;
};

export default XMLHttpRequest;
