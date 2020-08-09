function entries2props(vals) {
  if (vals.entries) {
    for (const [name, value] of vals.entries()) {
      vals[name] = value;
    }
  }
  return vals;
}

class Request {
  constructor(url, init = {}) {
    this.method = init.method ? init.method.toUpperCase() : 'GET';
    this.uri = new window.URL(url, window.location.href);
    this.url = this.uri.href;
    this.headers = new window.Headers(init.headers || {});
    this.body = init.body || '';
    this.init = init;
    this.response = null;
  }

  get bodyContent() {
    return this.body;
  }

  async toRequest() {
    const init = {
      ...this.init,
      method: this.method,
      headers: this.headers,
    };
    if (this.method === 'POST' || this.method === 'PUT') {
      init.body = this.body;
    }
    const request = new window.Request(this.url, init);
    request.uri = this.uri;
    request.bodyContent = this.body;
    request.params = new window.URLSearchParams();
    request.query = entries2props(new window.URLSearchParams(request.uri.search));
    if ((request.method === 'POST' || request.method === 'PUT') && request.headers.get('Content-Type')) {
      if (request.headers.get('Content-Type').startsWith('application/x-www-form-urlencoded')) {
        request.form = entries2props(new window.URLSearchParams(await request.text()));
      } else {
        request.form = new window.URLSearchParams();
      }
      if (request.headers.get('Content-Type').startsWith('multipart/form-data')) {
        request.formData = await request.formData();
      } else {
        request.formData = new FormData();
      }
      if (request.headers.get('Content-Type').startsWith('application/json')) {
        request.json = await request.json();
      } else {
        request.json = {};
      }
    } else {
      request.form = new window.URLSearchParams();
      request.formData = new FormData();
      request.json = {};
    }
    request.response = new Response();
    return request;
  }

  log(req = null) {
    req = req === null ? this : req;
    let data = '================================================================================\n'
    data += `%c${req.method} ${req.uri.pathname + req.uri.search} HTTP/1.1%c\n`;
    for (const [key, val] of req.headers) {
      data += `${key}: ${val}\n`;
    }
    if ((req.method === 'POST' || req.method === 'PUT') && req.bodyContent) {
      data += '\n' + req.bodyContent;
    }
    console.log(data.trim() + ' | %o', 'background-color:lightgreen;','color:initial;background-color:initial;', req.bodyContent);
  }
}

class Response {
  constructor() {
    this.status = 200;
    this.statusText = 'OK';
    this.headers = new window.Headers();
    this.body = '';
  }

  get bodyContent() {
    return this.body;
  }

  send(body) {
    this.body = body;
  }

  json(json) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.body = JSON.stringify(json);
  }

  async toResponse() {
    const response = new window.Response(this.body, {
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
    });
    response.bodyContent = this.body;
    return response;
  }

  log(res = null) {
    res = res === null ? this : res;
    let data = `%cHTTP/1.1 ${res.status} ${res.statusText}%c\n`;
    for (const [key, val] of res.headers) {
      data += `${key}: ${val}\n`;
    }
    data += '\n' + res.bodyContent;
    data = data.trim() + ' | %o\n================================================================================';
    console.log(data, 'background-color:lightblue;','color:initial;background-color:initial;', res.bodyContent);
  }
}

class Server {
  constructor(host = null) {
    this.host = host ? host : window.location.host;
    this.middlewares = [];
    this.handler = null;
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  isHost(host) {
    return this.host.constructor === RegExp ? this.host.test(host) : this.host === host;
  }

  get(path, handle) {
    this.route('GET', path, handle);
  }

  post(path, handle) {
    this.route('POST', path, handle);
  }

  put(path, handle) {
    this.route('PUT', path, handle);
  }

  delete(path, handle) {
    this.route('DELETE', path, handle);
  }

  path2regexp(path) {
    if (path.constructor === RegExp) {
      return path;
    }
    const paramsNames = [...path.matchAll(/:([a-z_][a-z0-9_]*)/ig)].map(v => v[1]);
    let pathRegStr = '^' + path.replace(/\//g, '\\/') + '$';
    for (const name of paramsNames) {
      pathRegStr = pathRegStr.replace(':' + name, `(?<${name}>[a-z0-9_]+)`);
    }
    return new RegExp(pathRegStr, 'ig');
  }

  route(method, path, handle) {
    const pathReg = this.path2regexp(path);
    this.use(async(req, next) => {
      if (req.method !== method || !new RegExp(pathReg.source, pathReg.flags).test(req.uri.pathname)) {
        return await next(req);
      }
      req.params = entries2props(new window.URLSearchParams([...req.uri.pathname.matchAll(new RegExp(pathReg.source, pathReg.flags))].pop().groups));
      await handle(req, next);
    });
  }

  getHandler() {
    let nextMiddleware = async(req) => {
      req.response.status = 444;
    };
    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const middleware = this.middlewares[i];
      const next = nextMiddleware;
      nextMiddleware = async (req) => await middleware(req, next);
    }
    return nextMiddleware;
  }

  async handle(req) {
    if (this.handler === null) {
      this.handler = this.getHandler();
    }
    const request = await req.toRequest();
    const res = request.response;
    if (process.env.NODE_ENV === 'development') {
      req.log(request);
    }
    await this.handler(request);
    req.response = await request.response.toResponse();
    if (process.env.NODE_ENV === 'development') {
      res.log(req.response);
    }
  }
}

module.exports = {
  Request,
  Response,
  Server,
};
