const _color_names = [
  'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque',
  'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue',
  'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson',
  'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen',
  'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'Darkorange', 'DarkOrchid',
  'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray',
  'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue',
  'Feldspar', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro',
  'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew',
  'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush',
  'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan',
  'LightGoldenRodYellow', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon',
  'LightSeaGreen', 'LightSkyBlue', 'LightSlateBlue', 'LightSlateGray',
  'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta',
  'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple',
  'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise',
  'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin',
  'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed',
  'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed',
  'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red',
  'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen',
  'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow',
  'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise',
  'Violet', 'VioletRed', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen',
];

function color_name() {
  return this.pick(this._color_names);
}

function color() {
  return `#${this.uint8().toString(16).padStart(2, 0)}${this.uint8().toString(16).padStart(2, 0)}${this.uint8().toString(16).padStart(2, 0)}`;
}

function hex_color() {
  return `#${this.uint8().toString(16).padStart(2, 0)}${this.uint8().toString(16).padStart(2, 0)}${this.uint8().toString(16).padStart(2, 0)}`;
}

function rgb_color() {
  return `rgb(${this.uint8()},${this.uint8()},${this.uint8()})`;
}

function rgba_color() {
  return `rgba(${this.uint8()},${this.uint8()},${this.uint8()},${Math.random().toFixed(2)})`;
}

function is_colorful(r, g, b, diff = 160) {
  return Math.max(Math.abs(r - b), Math.abs(g - r), Math.abs(b - g)) >= diff;
}

function random_colorful(diff = 160) {
  let r = 0;
  let g = 0;
  let b = 0;
  const a = Math.random().toFixed(2);
  while (true) {
    r = this.uint8();
    g = this.uint8();
    b = this.uint8();
    if (this.is_colorful(r, g, b, diff)) {
      return [r, g, b, a];
    }
  }
}

function colorful() {
  const [r, g, b] = this.random_colorful();
  return `#${r.toString(16).padStart(2, 0)}${g.toString(16).padStart(2, 0)}${b.toString(16).padStart(2, 0)}`;
}

function hex_colorful() {
  const [r, g, b] = this.random_colorful();
  return `#${r.toString(16).padStart(2, 0)}${g.toString(16).padStart(2, 0)}${b.toString(16).padStart(2, 0)}`;
}

function rgb_colorful() {
  const [r, g, b] = this.random_colorful();
  return `rgb(${r},${g},${b})`;
}

function rgba_colorful() {
  const [r, g, b, a] = this.random_colorful();
  return `rgba(${r},${g},${b},${a})`;
}

module.exports = function(pino) {
  pino._color_names = _color_names;

  pino.register('color_name', color_name);
  pino.register('color', color);
  pino.register('hex_color', hex_color);
  pino.register('rgb_color', rgb_color);
  pino.register('rgba_color', rgba_color);
  pino.register('is_colorful', is_colorful);
  pino.register('random_colorful', random_colorful);
  pino.register('colorful', colorful);
  pino.register('hex_colorful', hex_colorful);
  pino.register('rgb_colorful', rgb_colorful);
  pino.register('rgba_colorful', rgba_colorful);
};
