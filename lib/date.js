// Copyright 2021 The dotcoo <dotcoo@163.com>. All rights reserved.

/* eslint-disable */

'use strict';

function date_expr(expr, date = new Date()) {
  if (typeof expr === 'number') {
    return new Date(expr);
  } else if (typeof expr === 'string' && (expr.startsWith('+') || expr.startsWith('-'))) {
    const args = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    // for (const [_, number, unit] of expr.toLowerCase().matchAll(/([+-]\d+)([ymdhis])/g)) {
    const reg = /([+-]\d+)([ymdhis])/g;
    while (true) {
      const result = reg.exec(expr.toLowerCase());
      if (!result) {
        break;
      }
      const [_, number, unit] = result; // eslint-disable-line
      if ('ymdhis'.indexOf(unit) === -1) {
        throw new Error('error unit!');
      }
      args['ymdhis'.indexOf(unit)] += number - 0;
    }
    return new Date(...args);
  } else if (typeof expr === 'string' && (expr === 'today' || expr === 'now')) {
    return new Date();
  } else if (typeof expr === 'string') {
    return new Date(expr);
  } else if (typeof expr === 'object' && expr !== null) {
    const { y = 0, m = 0, d = 0, h = 0, i = 0, s = 0 } = expr;
    const mDate = new Date(date.getFullYear() + y, date.getMonth() + m + 1, 0);
    return new Date(date.getFullYear() + y, date.getMonth() + m, Math.min(mDate.getDate(), date.getDate()) + d, date.getHours() + h, date.getMinutes() + i, date.getSeconds() + s);
  } else {
    return expr;
  }
}

function date_format(date, format = 'y-m-d h:i:s') {
  const dates = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
  };
  return format.replace(/([ymdhis])/ig, (match, key) => dates[key.toLowerCase()].toString().padStart(2, '0'));
};

function date(start = 0, end = 4294967295000, format = 'y-m-d h:i:s') {
  start = this.date_expr(start);
  end = this.date_expr(end);
  return this.date_format(new Date(this.int64(start.getTime(), end.getTime())), format);
}

function install(pino) {
  const o = pino
  const { data: d, method: m } = pino;

  // data

  // methods
  o.date_expr = m(date_expr);
  o.date_format = m(date_format);
  o.date = m(date);
}

export {
  install as default,
};
