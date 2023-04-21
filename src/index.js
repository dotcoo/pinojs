import zhCN from './providers/zh_CN';

export const MIN_BYTE = -128;
export const MAX_BYTE = 127;
export const MIN_UBYTE = 0;
export const MAX_UBYTE = 255;
export const MIN_SHORT = -32768;
export const MAX_SHORT = 32767;
export const MIN_USHORT = 0;
export const MAX_USHORT = 65535;
export const MIN_INT = -2147483648;
export const MAX_INT = 2147483647;
export const MIN_UINT = 0;
export const MAX_UINT = 4294967295;
export const MIN_BIGINT = Number.MIN_SAFE_INTEGER;
export const MAX_BIGINT = Number.MAX_SAFE_INTEGER;
export const MIN_UBIGINT = 0;
export const MAX_UBIGINT = Number.MAX_SAFE_INTEGER;

// ====== tools ======

export function currying(...args) {
  return (...args2) => this(...args, ...args2);
}

export function unique(...args) {
  const values = new Set();
  return (...args2) => {
    let value = null;
    do {
      value = this(...args, ...args2);
    } while (values.has(value));
    values.add(value);
    return value;
  };
}

export function x(f) {
  f.currying = currying;
  f.unique = unique;
  return f;
}

export class Pino {
  constructor() {
    // data
    this.data = {};

    // boolean
    this.bool = x(this.boolean.bind(this));
    this.boolean = x(this.boolean.bind(this));

    // number
    this.int = x(this.number.bind(this, MIN_INT, MAX_INT, 0));
    this.int8 = x(this.number.bind(this, MIN_BYTE, MAX_BYTE, 0));
    this.int16 = x(this.number.bind(this, MIN_SHORT, MAX_SHORT, 0));
    this.int32 = x(this.number.bind(this, MIN_INT, MAX_INT, 0));
    this.int64 = x(this.number.bind(this, MIN_BIGINT, MAX_BIGINT, 0));
    this.uint = x(this.number.bind(this, MIN_UINT, MAX_UINT, 0));
    this.uint8 = x(this.number.bind(this, MIN_UBYTE, MAX_UBYTE, 0));
    this.uint16 = x(this.number.bind(this, MIN_USHORT, MAX_USHORT, 0));
    this.uint32 = x(this.number.bind(this, MIN_UINT, MAX_UINT, 0));
    this.uint64 = x(this.number.bind(this, MIN_UBIGINT, MAX_UBIGINT, 0));
    this.float = x(this.number.bind(this, MIN_INT, MAX_INT, 1));
    this.float8 = x(this.number.bind(this, MIN_BYTE, MAX_BYTE, 1));
    this.float16 = x(this.number.bind(this, MIN_SHORT, MAX_SHORT, 1));
    this.float32 = x(this.number.bind(this, MIN_INT, MAX_INT, 1));
    this.float64 = x(this.number.bind(this, MIN_BIGINT, MAX_BIGINT, 1));
    this.ufloat = x(this.number.bind(this, MIN_UINT, MAX_UINT, 1));
    this.ufloat8 = x(this.number.bind(this, MIN_UBYTE, MAX_UBYTE, 1));
    this.ufloat16 = x(this.number.bind(this, MIN_USHORT, MAX_USHORT, 1));
    this.ufloat32 = x(this.number.bind(this, MIN_UINT, MAX_UINT, 1));
    this.ufloat64 = x(this.number.bind(this, MIN_UBIGINT, MAX_UBIGINT, 1));
    this.number = x(this.number.bind(this, MIN_INT, MAX_INT, 0));

    // string
    this.string = x(this.string.bind(this));

    // range
    this.range = this.range.bind(this);

    // probability
    this.probability = this.probability.bind(this);

    // tools
    this.shuffle = this.shuffle.bind(this);
    this.random = this.random.bind(this);

    // extension
    this.register = this.register.bind(this);
    this.registers = this.registers.bind(this);
    this.use = this.use.bind(this);
  }

  // ====== types ======

  boolean() {
    return Math.floor(Math.random() * MAX_INT) % 2 === 1;
  }

  string(len = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let str = '';
    for (let i = 0; i < len; i++) {
      str += chars.charAt(Math.random() * chars.length | 0);
    }
    return str;
  }

  number(defmin = MIN_INT, defmax = MAX_INT, defdecimal = -1, min = defmin, max = defmax, decimal = defdecimal) {
    let n = min + Math.random() * (max - min);
    if (decimal > -1) {
      n = n.toFixed(decimal) - 0;
    }
    return n;
  }

  // ====== range ======

  range(...args) {
    let start = 0;
    let end = 0;
    let step = 1;
    let func = (i, a) => i;
    if (typeof args[args.length - 1] === 'function') {
      func = args.pop();
    }
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
    const a = [];
    if (start > end && step >= 0) {
      throw new Error('Start is greater than end and step size is greater than or equal to 0!');
    }
    for (let i = start; start < end ? i <= end : i >= end; i += step) {
      a.push(func.length > 0 ? func(i, a) : func());
    }
    return a;
  }

  // ====== probability ======

  probability(...args) {
    const generate = (...args) => {
      const values = [];
      for (const [value, count] of args) {
        for (let i = 0; i < count; i++) {
          values.push(value);
        }
      }
      return this.shuffle(values);
    };
    let values = [];
    let index = 0;
    return (i, a) => {
      if (index >= values.length) {
        values = generate(...args);
        index = 0;
      }
      const value = values[index++];
      return typeof value === 'function' ? value(i, a) : value;
    };
  }

  // ====== tools ======

  // Fisher–Yates https://bost.ocks.org/mike/shuffle/compare.html
  shuffle(a) {
    let m = a.length; let t; let i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = a[m];
      a[m] = a[i];
      a[i] = t;
    }
    return a;
  }

  random(a) {
    return a[Math.random() * MAX_INT % a.length | 0];
  }

  // ====== extension ======

  register(name, method) {
    if (typeof method === 'function') {
      this[name] = x(method.bind(this));
    } else {
      this.data[name] = method;
    }
  }

  registers(obj) {
    for (const name in obj) {
      const method = obj[name];
      this.register(name, method);
    }
  }

  use(ext) {
    typeof ext === 'function' ? ext(this) : ext.install(this);
    return this;
  }
}

// ====== export ======

const pino = new Pino();
pino.use(zhCN);

export default pino;
