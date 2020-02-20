const AsyncFunction = (async() => {}).constructor;

function entries2props(vals) {
  if (vals.entries) {
    for (const [name, value] of vals.entries()) {
      vals[name] = value;
    }
  }
  return vals;
}

class Server {
  constructor(host = window.location.host) {
    this.host = host;
    this.middlewares = [];
    this.handler = null;
  }

  use(middleware) {
    if (middleware.constructor !== AsyncFunction) {
      throw new Error('middleware can only be asynchronous functions!');
    }
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
    if (handle.constructor !== AsyncFunction) {
      throw new Error('handle can only be asynchronous functions!');
    }
    let pathReg = path;
    if (path.constructor === String) {
      const paramsNames = [...path.matchAll(/:([a-z_][a-z0-9_]*)/ig)].map(v => v[1]);
      let pathRegStr = '^' + path.replace(/\//g, '\\/') + '$';
      for (const name of paramsNames) {
        pathRegStr = pathRegStr.replace(':' + name, `(?<${name}>[a-z0-9_]+)`);
      }
      pathReg = new RegExp(pathRegStr, 'ig');
    }
    this.use(async(req, res, next) => {
      if (req.uri.host !== this.host || req.method !== method || !new RegExp(pathReg.source, pathReg.flags).test(req.uri.pathname)) {
        await next(req, res);
        return;
      }
      req.params = entries2props(new window.URLSearchParams([...req.uri.pathname.matchAll(new RegExp(pathReg.source, pathReg.flags))].pop().groups));
      res.request = req;
      if (process.env.NODE_ENV === 'development') {
        console.log(req);
      }
      await handle(req, res, next);
      if (process.env.NODE_ENV === 'development') {
        console.log(res);
      }
    });
  }

  async notfound(req, res, next) {
    res.status = 404;
    res.statusText = 'not found';
    res.body = '';
  }

  getHandler() {
    let nextMiddleware = this.notfound;
    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const middleware = this.middlewares[i];
      const next = nextMiddleware;
      nextMiddleware = async (req, res) => await middleware(req, res, next);
    }
    return nextMiddleware;
  }

  async handle(req) {
    if (this.handler === null) {
      this.handler = this.getHandler();
    }
    req.uri = new window.URL(req.url, window.location.href);
    entries2props(req.headers);
    req.query = entries2props(new window.URLSearchParams(req.uri.search));
    req.form = new window.URLSearchParams();
    if (req.method === 'POST' && req.headers.get('Content-Type')) {
      if (req.headers.get('Content-Type').startsWith('application/x-www-form-urlencoded')) {
        req.form = entries2props(new window.URLSearchParams(req.body));
      } else if (req.headers.get('Content-Type').startsWith('application/json')) {
        req.form = JSON.parse(req.body);
      }
    }
    req.body = req.body ? req.body : '';
    const res = new window.Response();
    Object.defineProperties(res, {
      url: { configurable: true, enumerable: false, value: '', writable: true },
      status: { configurable: true, enumerable: false, value: 200, writable: true },
      statusText: { configurable: true, enumerable: false, value: 'OK', writable: true },
      body: { configurable: true, enumerable: false, value: '', writable: true },
    });
    res.url = req.url;
    res.send = function(data) {
      this.body = data;
    };
    res.json = function(data) {
      this.body = JSON.stringify(data);
    };
    await this.handler(req, res);
    entries2props(res.headers);
    res.text = async function() {
      return this.body;
    };
    res.json = async function() {
      return JSON.parse(this.body);
    };
    return res;
  }
}

export default Server;
