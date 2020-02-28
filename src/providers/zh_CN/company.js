// const pinyin = require('node-pinyin');

const company_names = [
  '超艺', '和泰', '九方', '鑫博', '腾飞', '戴硕', '亿次元',
  '海创', '创联世纪', '凌云', '泰麒麟', '彩虹', '兰金',
  '晖来', '天益', '恒聪百汇', '菊风', '惠派', '宇通',
  '创汇', '思优', '时空盒数字', '易动力', '飞海', '华泰通安',
  '盟新', '商软冠联', '图龙信息', '易动力', '华远软件', '创亿',
  '时刻', '世创', '明腾', '良诺', '天开', '毕博诚', '快讯',
  '凌颖信息', '黄石金承', '恩悌', '雨林木风', '双敏',
  '维旺明', '网新恒天', '铭泰', '飞利信', '立信', '联通时科',
  '建业', '新格林耐特', '宇龙', '浙大万朋', '讯飞', '太能',
  '昂歌', '万迅', '方正', '联软', '七喜', '南康', '银嘉',
  '巨奥', '佳禾', '国讯', '信诚致远', '浦华众城', '迪摩', '太极',
  '群英', '合联', '同兴万点', '博凯', '精芯', '艾提科信',
  '昊嘉', '鸿睿思博', '四通', '富罳', '商软冠联', '诺依曼',
  '东方峻景', '华成育卓', '趋势', '维涛', '通际名联', '五菱',
];

// console.log(JSON.stringify(company_names.map(v => pinyin(v, { style: 'normal' }).flat().join(''))));
const company_names_pinyin = [
  'chaoyi', 'hetai', 'jiufang', 'xinbo', 'tengfei', 'daishuo', 'yiciyuan',
  'haichuang', 'chuanglianshiji', 'lingyun', 'taiqilin', 'caihong',
  'lanjin', 'huilai', 'tianyi', 'hengcongbaihui', 'jufeng', 'huipai',
  'yutong', 'chuanghui', 'siyou', 'shikongheshuzi', 'yidongli', 'feihai',
  'huataitongan', 'mengxin', 'shangruanguanlian', 'tulongxinxi', 'yidongli',
  'huayuanruanjian', 'chuangyi', 'shike', 'shichuang', 'mingteng',
  'liangnuo', 'tiankai', 'bibocheng', 'kuaixun', 'lingyingxinxi',
  'huangshijincheng', 'enti', 'yulinmufeng', 'shuangmin', 'weiwangming',
  'wangxinhengtian', 'mingtai', 'feilixin', 'lixin', 'liantongshike',
  'jianye', 'xingelinnaite', 'yulong', 'zhedawanpeng', 'xunfei', 'taineng',
  'angge', 'wanxun', 'fangzheng', 'lianruan', 'qixi', 'nankang', 'yinjia',
  'juao', 'jiahe', 'guoxun', 'xinchengzhiyuan', 'puhuazhongcheng', 'dimo',
  'taiji', 'qunying', 'helian', 'tongxingwandian', 'bokai', 'jingxin',
  'aitikexin', 'haojia', 'hongruisibo', 'sitong', 'fusi', 'shangruanguanlian',
  'nuoyiman', 'dongfangjunjing', 'huachengyuzhuo', 'qushi', 'weitao',
  'tongjiminglian', 'wuling',
];

const company_types = [
  '文化', '科技', '管理', '咨询', '服务', '传播', '传媒', '信息', '国际',
  '影业', '电子商务', '品牌', '商贸', '商务', '科贸', '贸易', '广告',
  '教育', '体育', '设计', '生物', '图文', '建筑', '规划', '餐饮', '医疗',
  '安全', '动画', '健康', '保险', '环境',
];

const company_suffixes = [
  '有限公司', '股份有限公司', '集团公司',
];

function company_name() {
  return this.pick(company_names);
}

function company_name_pinyin(name = null) {
  return name ? company_names_pinyin[company_names.indexOf(name)] : this.pick(company_names_pinyin);
}

function company_type() {
  return this.pick(company_types);
}

function company_suffix() {
  return this.pick(company_suffixes);
}

function company() {
  return `${this.city_name()}${this.pick(company_names)}${this.pick(company_types)}${this.pick(company_suffixes)}`;
}

function company_short() {
  return `${this.pick(company_names)}${this.pick(company_types)}`;
}

module.exports = function(pino) {
  pino.register('company_name', company_name);
  pino.register('company_name_pinyin', company_name_pinyin);
  pino.register('company_type', company_type);
  pino.register('company_suffix', company_suffix);
  pino.register('company', company);
  pino.register('company_short', company_short);
};
