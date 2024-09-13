// Copyright 2021 The dotcoo <dotcoo@163.com>. All rights reserved.

/* eslint-disable */

'use strict';

const automotive_provinces = {
  北京: '京',
  天津: '津',
  河北: '冀',
  山西: '晋',
  内蒙: '蒙',
  辽宁: '辽',
  吉林: '吉',
  黑龙: '黑',
  上海: '沪',
  江苏: '苏',
  浙江: '浙',
  安徽: '皖',
  福建: '闽',
  江西: '赣',
  山东: '鲁',
  河南: '豫',
  湖北: '鄂',
  湖南: '湘',
  广东: '粤',
  广西: '桂',
  海南: '琼',
  重庆: '渝',
  四川: '川',
  贵州: '贵',
  云南: '云',
  西藏: '藏',
  陕西: '陕',
  甘肃: '甘',
  青海: '青',
  宁夏: '宁',
  新疆: '新',
};

const automotive_names = [
  '京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖',
  '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵',
  '云', '藏', '陕', '甘', '青', '宁', '新',
];

function license_plate_p2n(province) {
  return this.data.automotive_names[province.substring(0, 2)];
}

function license_plate_province() {
  return this.random(this.data.automotive_names);
}

function license_plate_city() {
  return this.string(1, 'ABCDEFGHJKLMNPQRSTUVWXYZ');
}

function license_plate() {
  return this.random(this.data.automotive_names) + this.string(1, 'ABCDEFGHJKLMNPQRSTUVWXYZ') + this.string(5, 'ABCDEFGHJKLMNPQRSTUVWXYZ01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
}

function install(pino) {
  const o = pino
  const { data: d, method: m } = pino;

  // data
  d.automotive_provinces = automotive_provinces;
  d.automotive_names = automotive_names;

  // methods
  o.license_plate_p2n = m(license_plate_p2n);
  o.license_plate_province = m(license_plate_province);
  o.license_plate_city = m(license_plate_city);
  o.license_plate = m(license_plate);
}

export {
  install as default,
};
