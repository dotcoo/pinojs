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
      const [_, number, unit] = result;
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
  return this.date_format(new Date(this.number(start.getTime(), end.getTime(), 0)), format);
}

module.exports = function(pino) {
  pino.register('date_expr', date_expr);
  pino.register('date_format', date_format);
  pino.register('date', date);
};
