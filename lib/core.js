// Copyright 2021 The dotcoo <dotcoo@163.com>. All rights reserved.

/* eslint-disable */

'use strict';

// ====== base ======

function boolean() {
  return Math.random() >= 0.5;
}

function int(floor = INT_MIN, ceil = INT_MAX, min = floor, max = ceil) {
  min = min < floor ? floor : min, max = max > ceil ? ceil : max;
  return Math.floor(min + Math.random() * (max - min));
}

function string(len = 0, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.random() * chars.length | 0);
  }
  return str;
}

function range(...args) {
  let a = [], start = 0, end = 0, step = 1, func = typeof args[args.length - 1] === 'function' ? args.pop() : (i, a) => i;
  switch (args.length) {
    case 1: [end] = args; break;
    case 2: [start, end] = args; break;
    case 3: [start, end, step] = args; break;
    default: throw new Error('the number of parameters is incorrect!'); break;
  }
  if (step == 0) { throw new Error('step cannot be 0!'); }
  for (let n = Math.abs(end - start), s = Math.abs(step), d = (start <= end ? 1 : -1), i = 0; i < n; i += s) {
    a.push(func.length ? func(start + i * d, a) : func());
  }
  return a;
}

// ====== utils ======

function random(a) {
  return a[Math.random() * INT_MAX % a.length | 0];
}

// Fisher–Yates https://bost.ocks.org/mike/shuffle/compare.html
function shuffle(a) {
  let l = a.length;
  while (l) {
    let i = Math.floor(Math.random() * l--);
    let t = a[l];
    a[l] = a[i];
    a[i] = t;
  }
  return a;
}

// ====== wrapper ======

function unique(func) {
  const values = new Set();
  return (...args) => {
    let value = null, i = 0;
    do {
      value = func(...args);
      i++;
      if (i % 4096 == 0) { console.warn(new Error('pinojs.unique() has a risk of dead loop!').stack); }
    } while(values.has(value));
    values.add(value);
    return value;
  };
}

function probability(...args) {
  const funcs = [];
  for (const [func, proba] of args) {
    for (let i = 0; i < proba; i++) {
      funcs.push(func);
    }
  }
  let i = funcs.length;
  return (...args) => {
    if (i >= funcs.length) {
      shuffle(funcs);
      i = 0;
    }
    const func = funcs[i++];
    return typeof func !== 'function' ? func : func(...args);
  };
}

// ====== extend ======

function currying(...args) {
  return this.bind(null, ...args);
}

function method(func, ...args) {
  const method = func.bind(this, ...args);
  method.currying = currying.bind(method);
  method.unique = unique.bind(method, method);
  return method;
}

function use(plugin) {
  typeof plugin === 'function' ? plugin(this) : plugin.install(this);
  return this;
}

// ====== constant ======

const   BYTE_MIN = -128;
const   BYTE_MAX = 127;
const  SHORT_MIN = -32768;
const  SHORT_MAX = 32767;
const    INT_MIN = -2147483648;
const    INT_MAX = 2147483647;
const  FLOAT_MIN = Number.MIN_SAFE_INTEGER;
const  FLOAT_MAX = Number.MAX_SAFE_INTEGER;

const  UBYTE_MIN = 0;
const  UBYTE_MAX = 255;
const USHORT_MIN = 0;
const USHORT_MAX = 65535;
const   UINT_MIN = 0;
const   UINT_MAX = 4294967295;
const UFLOAT_MIN = 0;
const UFLOAT_MAX = Number.MAX_SAFE_INTEGER;

// ====== inject ======

function inject(pino) {
  const o = pino;
  const m = o.method = method.bind(o);
  const u = o.use = use.bind(o);

  // boolean
  o.boolean = m(boolean);
  o.bool    = m(boolean);

  // int
  o.int    = m(int,    INT_MIN,    INT_MAX);
  o.int8   = m(int,   BYTE_MIN,   BYTE_MAX);
  o.int16  = m(int,  SHORT_MIN,  SHORT_MAX);
  o.int32  = m(int,    INT_MIN,    INT_MAX);
  o.int64  = m(int,  FLOAT_MIN,  FLOAT_MAX);
  o.uint   = m(int,   UINT_MIN,   UINT_MAX);
  o.uint8  = m(int,  UBYTE_MIN,  UBYTE_MAX);
  o.uint16 = m(int, USHORT_MIN, USHORT_MAX);
  o.uint32 = m(int,   UINT_MIN,   UINT_MAX);
  o.uint64 = m(int, UFLOAT_MIN, UFLOAT_MAX);

  // string
  o.string = m(string);

  // range
  o.range = m(range);

  // utils
  o.random = m(random);
  o.shuffle = m(shuffle);

  // wrapper
  o.unique = m(unique);
  o.probability = m(probability);

  return o;
}

export {
  boolean,
  int,
  string,
  range,
  random,
  shuffle,
  unique,
  probability,
  currying,
  method,
  use,
  inject,
};
