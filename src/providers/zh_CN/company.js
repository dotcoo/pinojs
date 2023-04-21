const company_names_data = {
  超艺: 'chaoyi', 和泰: 'hetai', 九方: 'jiufang', 鑫博: 'xinbo', 腾飞: 'tengfei', 戴硕: 'daishuo', 亿次元: 'yiciyuan', 海创: 'haichuang', 创联世纪: 'chuanglianshiji', 凌云: 'lingyun', 泰麒麟: 'taiqilin', 彩虹: 'caihong', 兰金: 'lanjin', 晖来: 'huilai', 天益: 'tianyi', 恒聪百汇: 'hengcongbaihui', 菊风: 'jufeng', 惠派: 'huipai', 宇通: 'yutong', 创汇: 'chuanghui', 思优: 'siyou', 时空盒数字: 'shikongheshuzi', 易动力: 'yidongli', 飞海: 'feihai', 华泰通安: 'huataitongan', 盟新: 'mengxin', 商软冠联: 'shangruanguanlian', 图龙信息: 'tulongxinxi', 强盛: 'qiangsheng', 华远软件: 'huayuanruanjian', 创亿: 'chuangyi', 时刻: 'shike', 世创: 'shichuang', 明腾: 'mingteng', 良诺: 'liangnuo', 天开: 'tiankai', 毕博诚: 'bibocheng', 快讯: 'kuaixun', 凌颖信息: 'lingyingxinxi', 黄石金承: 'huangshijincheng', 恩悌: 'enti', 雨林木风: 'yulinmufeng', 双敏: 'shuangmin', 维旺明: 'weiwangming', 网新恒天: 'wangxinhengtian', 铭泰: 'mingtai', 飞利信: 'feilixin', 立信: 'lixin', 联通时科: 'liantongshike', 建业: 'jianye', 新格林耐特: 'xingelinnaite', 宇龙: 'yulong', 浙大万朋: 'zhedawanpeng', 讯飞: 'xunfei', 太能: 'taineng', 昂歌: 'angge', 万迅: 'wanxun', 方正: 'fangzheng', 联软: 'lianruan', 七喜: 'qixi', 南康: 'nankang', 银嘉: 'yinjia', 巨奥: 'juao', 佳禾: 'jiahe', 国讯: 'guoxun', 信诚致远: 'xinchengzhiyuan', 浦华众城: 'puhuazhongcheng', 迪摩: 'dimo', 太极: 'taiji', 群英: 'qunying', 合联: 'helian', 同兴万点: 'tongxingwandian', 博凯: 'bokai', 精芯: 'jingxin', 艾提科信: 'aitikexin', 昊嘉: 'haojia', 鸿睿思博: 'hongruisibo', 四通: 'sitong', 富罳: 'fusi', 北兰: 'beilan', 诺依曼: 'nuoyiman', 东方峻景: 'dongfangjunjing', 华成育卓: 'huachengyuzhuo', 趋势: 'qushi', 维涛: 'weitao', 通际名联: 'tongjiminglian', 五菱: 'wuling',
};

const company_names = Object.keys(company_names_data);

const company_types = [
  '文化', '科技', '管理', '咨询', '服务', '传播', '传媒', '信息', '国际', '影业', '电子商务', '品牌', '商贸', '商务', '科贸', '贸易', '广告', '教育', '体育', '设计', '生物', '图文', '建筑', '规划', '餐饮', '医疗', '安全', '动画', '健康', '保险', '环境',
];

const company_suffixes = [
  '有限公司', '股份有限公司', '集团有限公司',
];

function company_name() {
  return this.random(this.data.company_names);
}

function company_name_pinyin(name = this.company_name()) {
  return this.data.company_names_data[name] || '';
}

function company_type() {
  return this.random(this.data.company_types);
}

function company_suffix() {
  return this.random(this.data.company_suffixes);
}

function company() {
  return `${this.city_name()}${this.random(this.data.company_names)}${this.random(this.data.company_types)}${this.random(this.data.company_suffixes)}`;
}

function company_short() {
  return `${this.random(this.data.company_names)}${this.random(this.data.company_types)}`;
}

export default function(pino) {
  pino.registers({
    // data
    company_names_data,
    company_names,
    company_types,
    company_suffixes,
    // method
    company_name,
    company_name_pinyin,
    company_type,
    company_suffix,
    company,
    company_short,
  });
};
