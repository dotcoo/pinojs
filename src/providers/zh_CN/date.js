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
  } else if (typeof expr === 'string' && expr === 'today') {
    return new Date();
  } else if (typeof expr === 'string') {
    return new Date(expr);
  } else {
    return expr;
  }
}

function date_format(date, format = 'y-m-d h:i:s') {
  const y = date.getFullYear().toString().padStart(2, 0);
  const m = (date.getMonth() + 1).toString().padStart(2, 0);
  const d = date.getDate().toString().padStart(2, 0);
  const h = date.getHours().toString().padStart(2, 0);
  const i = date.getMinutes().toString().padStart(2, 0);
  const s = date.getSeconds().toString().padStart(2, 0);
  return format.replace(/y/ig, y).replace(/m/ig, m).replace(/d/ig, d).replace(/h/ig, h).replace(/i/ig, i).replace(/s/ig, s);
}

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
