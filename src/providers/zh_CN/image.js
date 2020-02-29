function image_url(options) {
  const opts = {
    width: 600,
    height: 400,
    background: 0,
    foreground: 0,
    format: 'png',
    text: '',
  };
  Object.assign(opts, options);
  opts.background = opts.background.replace('#', '');
  opts.foreground = opts.foreground.replace('#', '');
  return `https://dummyimage.com/${opts.width}x${opts.height}/${opts.background}/${opts.foreground}.${opts.format}?text=${encodeURIComponent(opts.text)}`;
}

let canvas = null;
let ctx = null;

function image_data_url(options) {
  if (typeof window === 'undefined') {
    return '';
  }
  if (canvas === null || ctx === null) {
    canvas = window.document.createElement('canvas');
    ctx = canvas.getContext('2d');
  }
  const opts = {
    width: 600,
    height: 400,
    background: this.colorful(),
    foreground: this.colorful(),
    text: '',
    font: '',
  };
  Object.assign(opts, options);
  ctx.clearRect(0, 0, opts.width, opts.height);
  opts.text = opts.text ? opts.text : `${opts.width}x${opts.height}`;
  opts.textlen = opts.text.split('').map(c => encodeURIComponent(c).length <= 3 ? 1 : 1.2).reduce((a, c) => a + c, 0);
  opts.font = opts.font ? opts.font : `bold ${Math.floor(opts.width / (opts.textlen))}px '微软雅黑'`;
  canvas.width = opts.width;
  canvas.height = opts.height;
  ctx.fillStyle = opts.background;
  ctx.fillRect(0, 0, opts.width, opts.height);
  ctx.font = opts.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = opts.foreground;
  ctx.fillText(opts.text, Math.floor(opts.width / 2), Math.floor(opts.height / 2));
  return canvas.toDataURL();
}

function image_random_matrix(width, height, ratio = 0.4) {
  if (typeof window === 'undefined') {
    return '';
  }
  if (canvas === null || ctx === null) {
    canvas = window.document.createElement('canvas');
    ctx = canvas.getContext('2d');
  }
  ratio /= 2;
  const wh = width / 2;
  const matrix = new Array(width * height).fill(false);
  let count = 0;
  while (count / matrix.length < ratio) {
    const i = Math.random() * 65535 % matrix.length | 0;
    const w = i % width;
    if (w >= wh || matrix[i]) {
      continue;
    }
    const h = i / height | 0;
    matrix[i] = true;
    matrix[width * h + width - 1 - w] = true;
    count++;
  }
  if (process.env.NODE_ENV === 'development') {
    let show = '';
    for (let i = 0; i < matrix.length; i++) {
      show += matrix[i] ? '黑' : '  ';
      if ((i + 1) % width === 0) {
        show += '\n';
      }
    }
    console.log(show);
  }
  return matrix;
}

function image_avatar(options) {
  if (typeof window === 'undefined') {
    return '';
  }
  if (canvas === null || ctx === null) {
    canvas = window.document.createElement('canvas');
    ctx = canvas.getContext('2d');
  }
  const opts = {
    width: 360, // 图片宽度
    height: 360, // 图片高度
    padding: 20, // 边距
    dot: 8, // 点行列数
    dot_cols: null, // 点列数
    dot_rows: null, // 点行数
    diff: 160, // 鲜艳度
    color: null, // 颜色
    ratio: 0.4, // 填充比例
  };
  Object.assign(opts, options);
  ctx.clearRect(0, 0, opts.width, opts.height);
  opts.dot_cols = opts.dot_cols === null ? opts.dot : opts.dot_cols;
  opts.dot_rows = opts.dot_rows === null ? opts.dot : opts.dot_rows;
  opts.color = this.colorful(opts.diff);
  canvas.width = opts.width;
  canvas.height = opts.height;
  ctx.fillStyle = opts.color;
  const dot_width = (opts.width - opts.padding * 2) / opts.dot_cols;
  const dot_height = (opts.height - opts.padding * 2) / opts.dot_rows;
  for (const [i, v] of this.image_random_matrix(opts.dot_cols, opts.dot_rows, opts.ratio).entries()) {
    if (v) {
      const x = Math.floor(opts.padding + dot_width * (i % opts.dot_cols));
      const y = Math.floor(opts.padding + dot_height * (i / opts.dot_rows | 0));
      ctx.fillRect(x, y, Math.ceil(dot_width), Math.ceil(dot_height));
    }
  }
  return canvas.toDataURL();
}

module.exports = function(pino) {
  pino.register('image_url', image_url);
  pino.register('image_data_url', image_data_url);
  pino.register('image_random_matrix', image_random_matrix);
  pino.register('image_avatar', image_avatar);
};
