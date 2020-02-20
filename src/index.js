import Server_ from './Server';
import XMLHttpRequest_ from './XMLHttpRequest';
import fetch_ from './fetch';

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

pino.server = new Server_();

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

pino.Server = Server_;
pino.Server.handle = pino.handle;

pino.XMLHttpRequest = XMLHttpRequest_;
pino.XMLHttpRequest.handle = pino.handle;

pino.fetch = fetch_;
pino.fetch.handle = pino.handle;

// ====== export ======

export default pino;
export var Server = Server_;
export var XMLHttpRequest = XMLHttpRequest_;
export var fetch = fetch_;
