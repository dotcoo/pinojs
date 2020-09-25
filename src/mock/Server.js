function requestLog(req) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  let data = '================================================================================\n'
  data += `%c${req.method} ${req.uri.pathname}${req.uri.search} HTTP/1.1%c\n`;
  for (const key in req.headers) {
    data += `${key}: ${req.headers[key]}\n`;
  }
  if (req.body && (req.method === 'POST' || req.method === 'PUT')) {
    data += '\n' + req.body;
  }
  console.log(data.trim() + '', 'background-color:lightgreen;','color:initial;background-color:initial;');
}

function responseLog(res) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  let data = `%cHTTP/1.1 ${res.status} ${res.statusText}%c\n`;
  for (const key in res.headers) {
    data += `${key}: ${res.headers[key]}\n`;
  }
  data += '\n' + res.body;
  data = data.trim() + '\n================================================================================';
  console.log(data, 'background-color:lightblue;','color:initial;background-color:initial;');
}

export class Request {
  constructor(init) {
    this.init = init;
    this.method = init.method ? init.method.toUpperCase() : 'GET';
    this.url = init.url;
    this.headers = init.headers || {};
    this.body = init.body || '';
    this.uri = new URL(init.url, window.location.href);
    this.response = new Response();
  }
}

export class Response {
  constructor() {
    this.status = 200;
    this.statusText = 'OK';
    this.headers = {};
    this.body = '';
  }

  send(body) {
    this.body = body;
  }

  json(json) {
    this.headers['Content-Type'] = 'application/json; charset=utf-8';
    this.body = JSON.stringify(json);
  }
}

export class Server {
  constructor(host) {
    this.host = host;
    this.requestMiddlewares = [];
    this.responseMiddlewares = [];
    this.handlers = [];
  }

  addRequestMiddleware(middleware) {
    this.requestMiddlewares.push(middleware);
  }

  addResponseMiddleware(middleware) {
    this.responseMiddlewares.push(middleware);
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

  request(method, path, handle, useIntercept = true) {
    this.handlers.push({
      method,
      path,
      handle,
      useIntercept,
      pathReg: this.path2regexp(path),
    });
  }

  get(path, handle, useIntercept = true) {
    this.request('GET', path, handle, useIntercept);
  }

  post(path, handle, useIntercept = true) {
    this.request('POST', path, handle, useIntercept);
  }

  put(path, handle, useIntercept = true) {
    this.request('PUT', path, handle, useIntercept);
  }

  delete(path, handle, useIntercept = true) {
    this.request('DELETE', path, handle, useIntercept);
  }

  isHost(host) {
    return this.host.constructor === RegExp ? this.host.test(host) : this.host === host;
  }

  route(req) {
    for (const handler of this.handlers) {
      if (handler.useIntercept === req.useIntercept && handler.method === req.method && new RegExp(handler.pathReg.source, handler.pathReg.flags).test(req.uri.pathname)) {
        return handler;
      }
    }
    return false;
  }

  async parse(req) {
    req.params = {};
    req.query = Object.fromEntries(new window.URLSearchParams(req.uri.search));
    req.form = {};
    req.formData = new FormData();
    req.json = {};
    const contentType = req.headers['Content-Type'];
    if ((req.method === 'POST' || req.method === 'PUT') && contentType) {
      if (contentType.startsWith('application/x-www-form-urlencoded')) {
        if (req.body instanceof window.URLSearchParams) {
          req.form = Object.fromEntries(req.body);
        } else {
          req.form = Object.fromEntries(new window.URLSearchParams(req.body));
        }
      }
      if (contentType.startsWith('multipart/form-data')) {
        req.formData = req.body;
      }
      if (contentType.startsWith('application/json')) {
        req.json = JSON.parse(req.body);
      }
    }
    req.response = new Response();
  }

  async handle(req) {
    const handler = this.route(req);
    if (!handler) {
      return false;
    }
    this.parse(req);
    req.params = Object.fromEntries(new window.URLSearchParams([...req.uri.pathname.matchAll(new RegExp(handler.pathReg.source, handler.pathReg.flags))].pop().groups));
    requestLog(req);
    for (const m of this.requestMiddlewares) {
      await m(req);
      if (req.ended) {
        responseLog(req.response);
        return true;
      }
    }
    await handler.handle(req);
    for (const m of this.responseMiddlewares) {
      await m(req);
      if (req.ended) {
        responseLog(req.response);
        return true;
      }
    }
    responseLog(req.response);
    return true;
  }
}

export default {
  Request,
  Response,
  Server,
};
