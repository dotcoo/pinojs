function image_url(...args) {
  const def = {
    width: 600,
    height: 400,
    background: 0,
    foreground: 0,
    format: 'png',
    text: '',
  };
  const conf = Object.assign({}, def, ...args);
  conf.background = conf.background.replace('#', '');
  conf.foreground = conf.foreground.replace('#', '');
  return `https://dummyimage.com/${conf.width}x${conf.height}/${conf.background}/${conf.foreground}.${conf.format}?text=${encodeURIComponent(conf.text)}`;
}

if (typeof window !== 'undefined') {
  const canvas = window.document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  function image_data_url(...args) {
    const def = {
      width: 600,
      height: 400,
      background: this.colorful(),
      foreground: this.colorful(),
      text: '',
      font: '',
    };
    const conf = Object.assign({}, def, ...args);
    ctx.clearRect(0, 0, conf.width, conf.height);
    conf.text = conf.text ? conf.text : `${conf.width}x${conf.height}`;
    conf.textlen = conf.text.split('').map(c => encodeURIComponent(c).length <= 3 ? 1 : 1.2).reduce((a, c) => a + c, 0);
    conf.font = conf.font ? conf.font : `bold ${Math.floor(conf.width / (conf.textlen))}px "微软雅黑"`;
    canvas.width = conf.width;
    canvas.height = conf.height;
    ctx.fillStyle = conf.background;
    ctx.fillRect(0, 0, conf.width, conf.height);
    ctx.font = conf.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = conf.foreground;
    ctx.fillText(conf.text, Math.floor(conf.width / 2), Math.floor(conf.height / 2));
    return canvas.toDataURL();
  }

  function image_random_matrix(width, height, ratio = 0.4) {
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

  function image_avatar(...args) {
    const def = {
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
    const conf = Object.assign({}, def, ...args);
    ctx.clearRect(0, 0, conf.width, conf.height);
    conf.dot_cols = conf.dot_cols === null ? conf.dot : conf.dot_cols;
    conf.dot_rows = conf.dot_rows === null ? conf.dot : conf.dot_rows;
    conf.color = this.colorful(conf.diff);
    canvas.width = conf.width;
    canvas.height = conf.height;
    ctx.fillStyle = conf.color;
    const dot_width = (conf.width - conf.padding * 2) / conf.dot_cols;
    const dot_height = (conf.height - conf.padding * 2) / conf.dot_rows;
    for (const [i, v] of this.image_random_matrix(conf.dot_cols, conf.dot_rows, conf.ratio).entries()) {
      if (v) {
        const x = Math.floor(conf.padding + dot_width * (i % conf.dot_cols));
        const y = Math.floor(conf.padding + dot_height * (i / conf.dot_rows | 0));
        ctx.fillRect(x, y, Math.ceil(dot_width), Math.ceil(dot_height));
      }
    }
    return canvas.toDataURL();
  }
}

module.exports = function(pino) {
  pino.register('image_url', image_url);
  if (typeof window !== 'undefined') {
    pino.register('image_data_url', image_data_url);
    pino.register('image_random_matrix', image_random_matrix);
    pino.register('image_avatar', image_avatar);
  }
};
