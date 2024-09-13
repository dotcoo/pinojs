// Copyright 2021 The dotcoo <dotcoo@163.com>. All rights reserved.

/* eslint-disable */

'use strict';

import { boolean, int, string, range, random, shuffle, unique, probability, currying, method, use, inject } from './core';

import address from './address';
import automotive from './automotive';
import color from './color';
import company from './company';
import date from './date';
import image from './image';
import internet from './internet';
import lorem from './lorem';
import person from './person';

// ====== class ======

class Pino {
  data = {};

  constructor() {
    // inject
    inject(this);

    // plugin
    const u = this.use;
    u(address);
    u(automotive);
    u(color);
    u(company);
    u(date);
    u(image);
    u(internet);
    u(lorem);
    u(person);
  }
}

// ====== export ======

const pino = new Pino();

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
  Pino,
  pino as default,
};
