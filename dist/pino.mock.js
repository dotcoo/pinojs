(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pinomock"] = factory();
	else
		root["pinomock"] = factory();
})(this, function() {
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

// CONCATENATED MODULE: ./src/mock/Server.js
function requestLog(req) {
  if (true) {
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
  if (true) {
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

class Request {
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

class Response {
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

class Server {
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

/* harmony default export */ var mock_Server = ({
  Request,
  Response,
  Server,
});

// CONCATENATED MODULE: ./src/mock/XMLHttpRequest.js


window.XMLHttpRequestReal = window.XMLHttpRequest;

class XMLHttpRequest_XMLHttpRequest extends window.XMLHttpRequestReal {
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
    if (await XMLHttpRequest_XMLHttpRequest.handle(this.req)) {
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
    } else if(!XMLHttpRequest_XMLHttpRequest.route(this.req)) {
      if (this.onerror2) {
        this.onerror2();
      } else if (this.ontimeout2) {
        this.ontimeout2();
      }
    }

    this.req.useIntercept = false;
    await XMLHttpRequest_XMLHttpRequest.handle(this.req);
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

XMLHttpRequest_XMLHttpRequest.route = function(req) {
  return false;
};

XMLHttpRequest_XMLHttpRequest.handle = async function(req) {
  req.response.status = 444;
};

/* harmony default export */ var mock_XMLHttpRequest = (XMLHttpRequest_XMLHttpRequest);

// CONCATENATED MODULE: ./src/mock/fetch.js


window.fetchReal = window.fetch;

async function fetch(url, init = {}, ...args) {
  const req = new Request({ ...init, url });

  req.useIntercept = true;
  if (await fetch.handle(req)) {
    return new window.Response(req.response.body, {
      status: req.response.status,
      statusText: req.response.statusText,
      headers: new window.Headers(req.response.headers),
    });
  }
  req.useIntercept = false;

  try {
    return await window.fetchReal(url, init, ...args);
  } catch (err) {
    console.log('fetch error:', err);
    if (!fetch.handle(req)) {
      throw err;
    }
  }

  await fetch.handle(req);
  return new window.Response(req.response.body, {
    status: req.response.status,
    statusText: req.response.statusText,
    headers: new window.Headers(req.response.headers),
  });
}

fetch.route = function(req) {
  return false;
};

fetch.handle = async function(req) {
  req.response.status = 444;
};

/* harmony default export */ var mock_fetch = (fetch);

// CONCATENATED MODULE: ./src/mock/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mock; });




function mock(pino) {
  // ====== register ======

  pino.Request = Request;
  pino.Response = Response;
  pino.Server = Server;
  pino.XMLHttpRequest = mock_XMLHttpRequest;
  pino.fetch = mock_fetch;

  // ====== Server ======

  pino.server = new pino.Server(window.location.host);
  pino.addRequestMiddleware = pino.server.addRequestMiddleware.bind(pino.server);
  pino.addResponseMiddleware = pino.server.addResponseMiddleware.bind(pino.server);
  pino.request = pino.server.request.bind(pino.server);
  pino.get = pino.server.get.bind(pino.server);
  pino.post = pino.server.post.bind(pino.server);
  pino.put = pino.server.put.bind(pino.server);
  pino.delete = pino.server.delete.bind(pino.server);

  pino.servers = [pino.server];

  pino.addServer = function(server) {
    this.servers.push(server);
  };

  pino.route = function(req) {
    for (const server of this.servers) {
      if (server.isHost(req.uri.host) && server.route(req)) {
        return true;
      }
    }
    return false;
  }

  pino.handle = async function(req) {
    for (const server of this.servers) {
      if (server.isHost(req.uri.host) && await server.handle(req)) {
        return true;
      }
    }
    return false;
  };

  // ====== XMLHttpRequest ======

  pino.XMLHttpRequest.route = pino.route.bind(pino);
  pino.XMLHttpRequest.handle = pino.handle.bind(pino);

  // ====== fetch ======

  pino.fetch.route = pino.route.bind(pino);
  pino.fetch.handle = pino.handle.bind(pino);

  // ====== intercept ======

  pino.intercept = function() {
    window.XMLHttpRequest = pino.XMLHttpRequest;
    window.fetch = pino.fetch;
  };

  pino.unintercept = function() {
    window.XMLHttpRequest = window.XMLHttpRequestReal;
    window.fetch = window.fetchReal;
  };

  // ====== now ======
  pino.intercept();
};


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=pino.mock.js.map