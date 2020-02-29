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

// ====== pino ======

const pino = {};

pino.a2f = function(args) {
  return args.length > 0 && typeof args[args.length - 1] === 'function' && args[args.length - 1].constructor === Function ? args.pop() : false;
};

pino.unique = function() {
  const values = new Set();
  return (...args) => {
    for (let max = values.size * 2 + 100, i = 0; i < max; i++) {
      const value = this(...args);
      if (values.has(value)) {
        continue;
      }
      values.add(value);
      return value;
    }
    throw new Error('Maximum number of cycles exceeded!');
  };
};
// Function.prototype.unique = pino.unique;

pino.currying = function(...args) {
  const func = this.bind(pino, ...args);
  func.currying = pino.currying;
  func.unique = pino.unique;
  return func;
};
// Function.prototype.currying = pino.currying;

// ====== types ======

pino.bool = function() {
  return Math.floor(Math.random() * MAX_INT) % 2 === 1;
};
pino.boolean = pino.bool;

pino.string = function(len = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.random() * chars.length | 0);
  }
  return str;
};
pino.string.currying = pino.currying;
pino.string.unique = pino.unique;

pino.number = function(min = MIN_INT, max = MAX_INT, decimal = -1) {
  let n = min + Math.random() * (max - min);
  if (decimal > -1) {
    n = n.toFixed(decimal) - 0;
  }
  return n;
};
pino.number.currying = pino.currying;
pino.number.unique = pino.unique;

pino.pick = function(...args) {
  args = args.flat();
  return args[Math.random() * MAX_UINT % args.length | 0];
};
pino.pick.currying = pino.currying;
pino.pick.unique = pino.unique;

// ====== range ======

pino.range = function(...args) {
  let start = 0;
  let end = 0;
  let step = 1;
  const f = pino.a2f(args) || ((i, arr) => i);
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
    arr.push(f.length > 0 ? f(i, arr) : f());
  }
  return arr;
};

pino.page = function(total, page, pagesize, f) {
  return pino.range((page - 1) * pagesize, Math.min(page * pagesize, total), f);
};

// ====== probability ======

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
  const shuffle = pino.a2f(args) || pino.shuffle;
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
      tab = pino.probability_table(...args);
      cur = 0;
    }
    const value = tab[cur++];
    return value && value.constructor === Function ? value(i, arr) : value;
  };
};

// ====== quick ======

pino.float = pino.number.currying(MIN_INT, MAX_INT, -1);

pino.float8 = pino.number.currying(MIN_BYTE, MAX_BYTE, -1);

pino.float16 = pino.number.currying(MIN_SHORT, MAX_SHORT, -1);

pino.float32 = pino.number.currying(MIN_INT, MAX_INT, -1);

pino.float64 = pino.number.currying(MIN_BIGINT, MAX_BIGINT, -1);

pino.ufloat = pino.number.currying(0, MAX_UINT, -1);

pino.ufloat8 = pino.number.currying(0, MAX_UBYTE, -1);

pino.ufloat16 = pino.number.currying(0, MAX_USHORT, -1);

pino.ufloat32 = pino.number.currying(0, MAX_UINT, -1);

pino.ufloat64 = pino.number.currying(0, MAX_UBIGINT, -1);

pino.int = pino.number.currying(MIN_INT, MAX_INT, 0);

pino.int8 = pino.number.currying(MIN_BYTE, MAX_BYTE, 0);

pino.int16 = pino.number.currying(MIN_SHORT, MAX_SHORT, 0);

pino.int32 = pino.number.currying(MIN_INT, MAX_INT, 0);

pino.int64 = pino.number.currying(MIN_BIGINT, MAX_BIGINT, 0);

pino.uint = pino.number.currying(0, MAX_UINT, 0);

pino.uint8 = pino.number.currying(0, MAX_UBYTE, 0);

pino.uint16 = pino.number.currying(0, MAX_USHORT, 0);

pino.uint32 = pino.number.currying(0, MAX_UINT, 0);

pino.uint64 = pino.number.currying(0, MAX_UBIGINT, 0);

// ====== providers ======

pino.register = function(name, method) {
  pino[name] = method.bind(pino);
  pino[name].currying = pino.currying;
  pino[name].unique = pino.unique;
};

pino.locale = function(locale) {
  locale(pino);
};

pino.locale(require('./providers/zh_CN'));

// ====== Server fetch XMLHttpRequest ======

if (typeof window !== 'undefined') {
  // ====== Server ======

  const Server = require('./Server');

  pino.server = new Server();

  pino.use = pino.server.use.bind(pino.server);
  pino.get = pino.server.get.bind(pino.server);
  pino.post = pino.server.post.bind(pino.server);
  pino.put = pino.server.put.bind(pino.server);
  pino.delete = pino.server.delete.bind(pino.server);
  pino.route = pino.server.route.bind(pino.server);

  pino.servers = [pino.server];

  pino.addServer = function(server) {
    pino.servers.push(server);
  };

  pino.handle = async function(req) {
    for (const server of pino.servers) {
      if (server.isHost(req.uri.host)) {
        return await server.handle(req);
      }
    }
    return false;
  };

  pino.Server = Server;
  pino.Server.handle = pino.handle;

  // ====== fetch ======

  const fetch = require('./fetch');

  pino.fetch = fetch;
  pino.fetch.handle = pino.handle;

  // ====== XMLHttpRequest ======

  const XMLHttpRequest = require('./XMLHttpRequest');

  pino.XMLHttpRequest = XMLHttpRequest;
  pino.XMLHttpRequest.handle = pino.handle;

  pino.setup = function() {
    window.XMLHttpRequest = XMLHttpRequest;
    window.fetch = fetch;
  };
}

// ====== export ======

module.exports = pino;
