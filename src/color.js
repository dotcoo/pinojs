// Copyright 2021 The dotcoo <dotcoo@163.com>. All rights reserved.

/* eslint-disable */

'use strict';

const color_names = [
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
  return this.random(this.data.color_names);
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

function install(pino) {
  const o = pino
  const { data: d, method: m } = pino;

  // data
  d.color_names = color_names;

  // methods
  o.color_name = m(color_name);
  o.color = m(color);
  o.hex_color = m(hex_color);
  o.rgb_color = m(rgb_color);
  o.rgba_color = m(rgba_color);
  o.is_colorful = m(is_colorful);
  o.random_colorful = m(random_colorful);
  o.colorful = m(colorful);
  o.hex_colorful = m(hex_colorful);
  o.rgb_colorful = m(rgb_colorful);
  o.rgba_colorful = m(rgba_colorful);
}

export {
  install as default,
};
