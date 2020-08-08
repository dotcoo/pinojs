function entries2props(vals) {
  if (vals.entries) {
    for (const [name, value] of vals.entries()) {
      vals[name] = value;
    }
  }
  return vals;
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

  route(method, path, handle) {
    let pathReg = path;
    if (path.constructor === String) {
      const paramsNames = [...path.matchAll(/:([a-z_][a-z0-9_]*)/ig)].map(v => v[1]);
      let pathRegStr = '^' + path.replace(/\//g, '\\/') + '$';
      for (const name of paramsNames) {
        pathRegStr = pathRegStr.replace(':' + name, `(?<${name}>[a-z0-9_]+)`);
      }
      pathReg = new RegExp(pathRegStr, 'ig');
    }
    this.use(async(req, next) => {
      if (req.method !== method || !new RegExp(pathReg.source, pathReg.flags).test(req.uri.pathname)) {
        await next(req);
        return;
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
    const init = req;
    init.method = init.method ? init.method.toUpperCase() : 'GET';
    const uri = new window.URL(init.url, window.location.href);
    init.headers = new window.Headers(req.headers ? req.headers : {});
    req = new window.Request(req.url, req);
    req.uri = uri;
    req.bodyContent = init.body || '';
    req.params = new window.URLSearchParams();
    req.query = entries2props(new window.URLSearchParams(req.uri.search));
    if ((req.method === 'POST' || req.method === 'PUT') && req.headers.get('Content-Type')) {
      if (req.headers.get('Content-Type').startsWith('application/x-www-form-urlencoded')) {
        req.form = entries2props(new window.URLSearchParams(await req.text()));
      } else {
        req.form = new window.URLSearchParams();
      }
      if (req.headers.get('Content-Type').startsWith('multipart/form-data')) {
        req.formData = await req.formData();
      } else {
        req.formData = new FormData();
      }
      if (req.headers.get('Content-Type').startsWith('application/json')) {
        req.json = await req.json();
      } else {
        req.json = {};
      }
    } else {
      req.form = new window.URLSearchParams();
      req.formData = new FormData();
      req.json = {};
    }
    req.response = {
      status: 200,
      statusText: 'OK',
      headers: new window.Headers(),
      body: '',
      send(body) {
        this.body = body;
      },
      sendJson(json) {
        this.headers.set('Content-Type', 'application/json; charset=utf-8');
        this.body = JSON.stringify(json);
      },
    };
    if (process.env.NODE_ENV === 'development') {
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
    await this.handler(req);
    const res = req.response;
    req.response = new window.Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });
    req.response.bodyContent = res.body;
    if (process.env.NODE_ENV === 'development') {
      let data = `%cHTTP/1.1 ${req.response.status} ${req.response.statusText}%c\n`;
      for (const [key, val] of req.response.headers) {
        data += `${key}: ${val}\n`;
      }
      data += '\n' + req.response.bodyContent;
      data = data.trim() + ' | %o\n================================================================================';
      console.log(data, 'background-color:lightblue;','color:initial;background-color:initial;', req.response.bodyContent);
    }
    return req.response;
  }
}

module.exports = Server;
