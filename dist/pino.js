(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pino"] = factory();
	else
		root["pino"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/Server.js
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
      if (false) {}
      await handle(req, res, next);
      if (false) {}
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

/* harmony default export */ var src_Server = (Server);

// CONCATENATED MODULE: ./src/XMLHttpRequest.js
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
    this.req.method = method;
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

    if (this.res === false || this.res && this.res.status === 404) {
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

window.XMLHttpRequest = XMLHttpRequest;

/* harmony default export */ var src_XMLHttpRequest = (XMLHttpRequest);

// CONCATENATED MODULE: ./src/fetch.js
window.fetchReal = window.fetch;

async function fetch(url, init, ...args) {
  const req = new window.Request('', {});
  Object.defineProperties(req, {
    method: { configurable: true, enumerable: false, value: 'GET', writable: true },
    url: { configurable: true, enumerable: false, value: '', writable: true },
    body: { configurable: true, enumerable: false, value: '', writable: true },
  });
  req.method = init && init.method ? init.method : 'GET';
  req.uri = new URL(url, window.location.href);
  req.url = req.uri.href;

  const res = await fetch.handle(req);

  if (res === false || (res && res.status === 404)) {
    return window.fetchReal(url, init, ...args);
  }

  return res;
}

fetch.handle = async function(req) {
  return false;
};

window.fetch = fetch;

/* harmony default export */ var src_fetch = (fetch);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Server", function() { return src_Server_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XMLHttpRequest", function() { return src_XMLHttpRequest_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return src_fetch_0; });




// ====== constant ======

const MIN_BYTE = -128;
const MAX_BYTE = 127;
const MAX_UBYTE = 255;
const MIN_SHORT = -32768;
const MAX_SHORT = 32767;
const MAX_USHORT = 65535;
const MIN_INT = -2147483648;
const MAX_INT = 2147483647;
const MAX_UINT = 4294967295;
const MIN_BIGINT = Number.MIN_SAFE_INTEGER / 2;
const MAX_BIGINT = Number.MAX_SAFE_INTEGER / 2;
const MAX_UBIGINT = Number.MAX_SAFE_INTEGER / 2;

// ====== function ======

function a2f(args) {
  return args.length > 0 && args[args.length - 1].constructor === Function ? args.pop() : false;
}

function currying(...cargs) {
  return (...args) => this(...cargs, ...args);
}

// ====== pino ======

const pino = {};

// ====== types ======

pino.bool = function() {
  return Math.floor(Math.random() * MAX_INT) % 2 === 1;
};
pino.bool.currying = currying;
pino.boolean = pino.bool;

pino.number = function(...args) {
  const def = {
    min: MIN_INT,
    max: MAX_INT,
    decimal: -1,
  };
  const conf = Object.assign({}, def, ...args);
  let n = conf.min + Math.random() * (conf.max - conf.min);
  if (conf.decimal > -1) {
    n = n.toFixed(conf.decimal) - 0;
  }
  return n;
};
pino.number.currying = currying;

pino.string = function(...args) {
  if (args.length > 0 && typeof args[0] === 'number') {
    args[0] = { len: args[0] };
  }
  const def = {
    len: 8,
    chars: '0123456789abcdefghijklmnopqrstuvwxyz',
  };
  const conf = Object.assign({}, def, ...args);
  let str = '';
  for (let i = 0; i < conf.len; i++) {
    str += conf.chars.charAt(Math.random() * conf.chars.length | 0);
  }
  return str;
};
pino.string.currying = currying;

// ====== range ======

pino.empty = function(size = 0) {
  return new Array(size);
};

pino.zeros = function(size = 0) {
  return new Array(size).fill(0);
};

pino.ones = function(size = 0) {
  return new Array(size).fill(1);
};

pino.fill = function(size = 0, value = 0) {
  return new Array(size).fill(value);
};

pino.range = function(...args) {
  let start = 0;
  let end = 0;
  let step = 1;
  const f = a2f(args) || ((i, arr) => i);
  if (args.length === 1) {
    end = args[0];
  } else if (args.length === 2) {
    start = args[0];
    end = args[1];
  } else if (args.length === 3) {
    start = args[0];
    end = args[1];
    step = args[2];
  }
  const arr = [];
  if (start > end && step >= 0) {
    throw new Error('Start is greater than end and step size is greater than or equal to 0!');
  }
  for (let i = start; start < end ? i < end : i > end; i += step) {
    arr.push(f.currying ? f() : f(i, arr));
  }
  return arr;
};

pino.page = function(total, page, pagesize, f) {
  return this.range((page - 1) * pagesize, Math.min(page * pagesize, total), f);
}.bind(pino);

// ====== math ======

pino.linspace = function(start, end, num, endpoint = true) {
  const step = (end - start) / (num - endpoint);
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(start + step * i);
  }
  return arr;
};

pino.min = function(...args) {
  return Math.min(...args);
};

pino.max = function(...args) {
  return Math.max(...args);
};

pino.sum = function(...args) {
  return args.reduce((a, c) => a + c, 0);
};

pino.mean = function(...args) {
  return this.sum(...args) / args.length;
}.bind(pino);

pino.median = function(...args) {
  const f = a2f(args) || ((a, b) => a - b);
  args.sort(f);
  if (args.length % 2 === 0) {
    return (args[args.length / 2 - 1] + args[args.length / 2]) / 2;
  } else {
    return args[Math.floor(args.length / 2)];
  }
};

pino.var = function(...args) {
  const mean = this.mean(...args);
  const sum = this.sum(...args.map(v => (v - mean) ** 2));
  return sum / args.length;
}.bind(pino);

pino.std = function(...args) {
  return Math.sqrt(this.var(...args));
}.bind(pino);

// ====== probability ======

pino.normal = function (size, u = 0, a = 1) {
  throw new Error('like numpy.normal, but not implemented!');
};

// Fisher–Yates https://bost.ocks.org/mike/shuffle/compare.html
pino.shuffle = function(arr) {
  let m = arr.length; let t; let i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
};

pino.probability_table = function(...args) {
  const shuffle = a2f(args) || this.shuffle;
  const tab = [];
  for (const [value, count] of args) {
    for (let i = 0; i < count; i++) {
      tab.push(value);
    }
  }
  return shuffle(tab);
};

pino.probability = function(...args) {
  let tab = [];
  let cur = 0;
  return (i, arr) => {
    if (cur >= tab.length) {
      tab = this.probability_table(...args);
      cur = 0;
    }
    const value = tab[cur++];
    return value && value.constructor === Function ? value(i, arr) : value;
  };
}.bind(pino);

// ====== quick ======

pino.float = pino.number.currying({ min: MIN_INT, max: MAX_INT }).bind(pino);
pino.float.currying = currying;

pino.float8 = pino.number.currying({ min: MIN_BYTE, max: MAX_BYTE }).bind(pino);
pino.float8.currying = currying;

pino.float16 = pino.number.currying({ min: MIN_SHORT, max: MAX_SHORT }).bind(pino);
pino.float16.currying = currying;

pino.float32 = pino.number.currying({ min: MIN_INT, max: MAX_INT }).bind(pino);
pino.float32.currying = currying;

pino.float64 = pino.number.currying({ min: MIN_BIGINT, max: MAX_BIGINT }).bind(pino);
pino.float64.currying = currying;

pino.ufloat = pino.number.currying({ min: 0, max: MAX_UINT }).bind(pino);
pino.ufloat.currying = currying;

pino.ufloat8 = pino.number.currying({ min: 0, max: MAX_UBYTE }).bind(pino);
pino.ufloat8.currying = currying;

pino.ufloat16 = pino.number.currying({ min: 0, max: MAX_USHORT }).bind(pino);
pino.ufloat16.currying = currying;

pino.ufloat32 = pino.number.currying({ min: 0, max: MAX_UINT }).bind(pino);
pino.ufloat32.currying = currying;

pino.ufloat64 = pino.number.currying({ min: 0, max: MAX_UBIGINT }).bind(pino);
pino.ufloat64.currying = currying;

pino.int = pino.number.currying({ min: MIN_INT, max: MAX_INT, decimal: 0 }).bind(pino);
pino.int.currying = currying;

pino.int8 = pino.number.currying({ min: MIN_BYTE, max: MAX_BYTE, decimal: 0 }).bind(pino);
pino.int8.currying = currying;

pino.int16 = pino.number.currying({ min: MIN_SHORT, max: MAX_SHORT, decimal: 0 }).bind(pino);
pino.int16.currying = currying;

pino.int32 = pino.number.currying({ min: MIN_INT, max: MAX_INT, decimal: 0 }).bind(pino);
pino.int32.currying = currying;

pino.int64 = pino.number.currying({ min: MIN_BIGINT, max: MAX_BIGINT, decimal: 0 }).bind(pino);
pino.int64.currying = currying;

pino.uint = pino.number.currying({ min: 0, max: MAX_UINT, decimal: 0 }).bind(pino);
pino.uint.currying = currying;

pino.uint8 = pino.number.currying({ min: 0, max: MAX_UBYTE, decimal: 0 }).bind(pino);
pino.uint8.currying = currying;

pino.uint16 = pino.number.currying({ min: 0, max: MAX_USHORT, decimal: 0 }).bind(pino);
pino.uint16.currying = currying;

pino.uint32 = pino.number.currying({ min: 0, max: MAX_UINT, decimal: 0 }).bind(pino);
pino.uint32.currying = currying;

pino.uint64 = pino.number.currying({ min: 0, max: MAX_UBIGINT, decimal: 0 }).bind(pino);
pino.uint64.currying = currying;

// ====== Server ======

pino.server = new src_Server();

pino.use = pino.server.use.bind(pino.server);
pino.get = pino.server.get.bind(pino.server);
pino.post = pino.server.post.bind(pino.server);
pino.put = pino.server.put.bind(pino.server);
pino.delete = pino.server.delete.bind(pino.server);
pino.route = pino.server.route.bind(pino.server);

pino.servers = [pino.server];

pino.addServer = function(server) {
  this.servers.push(server);
}.bind(pino);

pino.handle = async function(req) {
  for (const server of this.servers) {
    if (server.isHost(req.uri.host)) {
      return await server.handle(req);
    }
  }
  return false;
}.bind(pino);

// ====== mount ======

pino.Server = src_Server;
pino.Server.handle = pino.handle;

pino.XMLHttpRequest = src_XMLHttpRequest;
pino.XMLHttpRequest.handle = pino.handle;

pino.fetch = src_fetch;
pino.fetch.handle = pino.handle;

// ====== export ======

/* harmony default export */ var src = __webpack_exports__["default"] = (pino);
var src_Server_0 = src_Server;
var src_XMLHttpRequest_0 = src_XMLHttpRequest;
var src_fetch_0 = src_fetch;


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=pino.js.map