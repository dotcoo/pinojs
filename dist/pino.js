(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pino"] = factory();
	else
		root["pino"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ====== constant ======

const MIN_BYTE = -128;
const MAX_BYTE = 127;
const MAX_UBYTE = 255;
const MIN_SHORT = -32768;
const MAX_SHORT = 32767;
const MAX_USHORT = 65535;
const MIN_INT = -2147483648;
const MAX_INT = 2147483647;
const MAX_UINT = 4294967295;
const MIN_BIGINT = Number.MIN_SAFE_INTEGER / 2;
const MAX_BIGINT = Number.MAX_SAFE_INTEGER / 2;
const MAX_UBIGINT = Number.MAX_SAFE_INTEGER / 2;

// ====== pino ======

const pino = {};

pino.a2f = function(args) {
  return args.length > 0 && typeof args[args.length - 1] === 'function' && args[args.length - 1].constructor === Function ? args.pop() : false;
};

pino.unique = function() {
  const values = new Set();
  return (...args) => {
    for (let max = values.size * 2 + 100, i = 0; i < max; i++) {
      const value = this(...args);
      if (values.has(value)) {
        continue;
      }
      values.add(value);
      return value;
    }
    throw new Error('Maximum number of cycles exceeded!');
  };
};
// Function.prototype.unique = pino.unique;

pino.currying = function(...args) {
  const func = this.bind(pino, ...args);
  func.currying = pino.currying;
  func.unique = pino.unique;
  return func;
};
// Function.prototype.currying = pino.currying;

// ====== types ======

pino.bool = function() {
  return Math.floor(Math.random() * MAX_INT) % 2 === 1;
};
pino.boolean = pino.bool;

pino.string = function(len = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.random() * chars.length | 0);
  }
  return str;
};
pino.string.currying = pino.currying;
pino.string.unique = pino.unique;

function number2default(defmin = MIN_INT, defmax = MAX_INT, defdecimal = -1) {
  const func = function(min = defmin, max = defmax, decimal = defdecimal) {
    let n = min + Math.random() * (max - min);
    if (decimal > -1) {
      n = n.toFixed(decimal) - 0;
    }
    return n;
  };
  func.currying = pino.currying;
  func.unique = pino.unique;
  return func;
}

pino.number = number2default(MIN_INT, MAX_INT, 0);
pino.int = number2default(MIN_INT, MAX_INT, 0);
pino.int8 = number2default(MIN_BYTE, MAX_BYTE, 0);
pino.int16 = number2default(MIN_SHORT, MAX_SHORT, 0);
pino.int32 = number2default(MIN_INT, MAX_INT, 0);
pino.int64 = number2default(MIN_BIGINT, MAX_BIGINT, 0);
pino.uint = number2default(0, MAX_UINT, 0);
pino.uint8 = number2default(0, MAX_UBYTE, 0);
pino.uint16 = number2default(0, MAX_USHORT, 0);
pino.uint32 = number2default(0, MAX_UINT, 0);
pino.uint64 = number2default(0, MAX_UBIGINT, 0);
pino.float = number2default(MIN_INT, MAX_INT, 1);
pino.float8 = number2default(MIN_BYTE, MAX_BYTE, 1);
pino.float16 = number2default(MIN_SHORT, MAX_SHORT, 1);
pino.float32 = number2default(MIN_INT, MAX_INT, 1);
pino.float64 = number2default(MIN_BIGINT, MAX_BIGINT, 1);
pino.ufloat = number2default(0, MAX_UINT, 1);
pino.ufloat8 = number2default(0, MAX_UBYTE, 1);
pino.ufloat16 = number2default(0, MAX_USHORT, 1);
pino.ufloat32 = number2default(0, MAX_UINT, 1);
pino.ufloat64 = number2default(0, MAX_UBIGINT, 1);

pino.pick = function(...args) {
  args = args.flat();
  return args[Math.random() * MAX_UINT % args.length | 0];
};
pino.pick.currying = pino.currying;
pino.pick.unique = pino.unique;

// ====== range ======

pino.range = function(...args) {
  let start = 0;
  let end = 0;
  let step = 1;
  const f = pino.a2f(args) || ((i, arr) => i);
  if (args.length === 1) {
    end = args[0];
  } else if (args.length === 2) {
    start = args[0];
    end = args[1];
  } else if (args.length === 3) {
    start = args[0];
    end = args[1];
    step = args[2];
  }
  const arr = [];
  if (start > end && step >= 0) {
    throw new Error('Start is greater than end and step size is greater than or equal to 0!');
  }
  for (let i = start; start < end ? i < end : i > end; i += step) {
    arr.push(f.length > 0 ? f(i, arr) : f());
  }
  return arr;
};

pino.page = function(total, page, pagesize, f) {
  return pino.range((page - 1) * pagesize, Math.min(page * pagesize, total), f);
};

// ====== probability ======

// Fisher–Yates https://bost.ocks.org/mike/shuffle/compare.html
pino.shuffle = function(arr) {
  let m = arr.length; let t; let i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
};

pino.probability_table = function(...args) {
  const shuffle = pino.a2f(args) || pino.shuffle;
  const tab = [];
  for (const [value, count] of args) {
    for (let i = 0; i < count; i++) {
      tab.push(value);
    }
  }
  return shuffle(tab);
};

pino.probability = function(...args) {
  let tab = [];
  let cur = 0;
  return (i, arr) => {
    if (cur >= tab.length) {
      tab = pino.probability_table(...args);
      cur = 0;
    }
    const value = tab[cur++];
    return value && value.constructor === Function ? value(i, arr) : value;
  };
};

// ====== providers ======

pino.register = function(name, method) {
  pino[name] = method.bind(pino);
  pino[name].currying = pino.currying;
  pino[name].unique = pino.unique;
};

pino.locale = function(locale) {
  locale(pino);
};

pino.locale(__webpack_require__(1));

// ====== extension ======

pino.use = function(func) {
  func(pino);
};

// ====== export ======

/* harmony default export */ __webpack_exports__["default"] = (pino);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const address = __webpack_require__(2);
const automotive = __webpack_require__(3);
const color = __webpack_require__(4);
const company = __webpack_require__(5);
const date = __webpack_require__(6);
const image = __webpack_require__(7);
const internet = __webpack_require__(8);
const lorem = __webpack_require__(9);
const person = __webpack_require__(10);

module.exports = function(pino) {
  address(pino);
  automotive(pino);
  color(pino);
  company(pino);
  date(pino);
  image(pino);
  internet(pino);
  lorem(pino);
  person(pino);
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const _address_countries = [
  '阿富汗', '阿拉斯加', '阿尔巴尼亚', '阿尔及利亚', '安道尔', '安哥拉', '安圭拉岛英', '安提瓜和巴布达',
  '阿根廷', '亚美尼亚', '阿鲁巴岛', '阿森松', '澳大利亚', '奥地利', '阿塞拜疆', '巴林', '孟加拉国',
  '巴巴多斯', '白俄罗斯', '比利时', '伯利兹', '贝宁', '百慕大群岛', '不丹', '玻利维亚', '波斯尼亚和黑塞哥维那',
  '博茨瓦纳', '巴西', '保加利亚', '布基纳法索', '布隆迪', '喀麦隆', '加拿大', '加那利群岛', '佛得角',
  '开曼群岛', '中非', '乍得', '智利', '圣诞岛', '科科斯岛', '哥伦比亚', '巴哈马国', '多米尼克国', '科摩罗',
  '刚果', '科克群岛', '哥斯达黎加', '克罗地亚', '古巴', '塞浦路斯', '捷克', '丹麦', '迪戈加西亚岛', '吉布提',
  '多米尼加共和国', '厄瓜多尔', '埃及', '萨尔瓦多', '赤道几内亚', '厄立特里亚', '爱沙尼亚', '埃塞俄比亚', '福克兰群岛',
  '法罗群岛', '斐济', '芬兰', '法国', '法属圭亚那', '法属波里尼西亚', '加蓬', '冈比亚', '格鲁吉亚', '德国', '加纳',
  '直布罗陀', '希腊', '格陵兰岛', '格林纳达', '瓜德罗普岛', '关岛', '危地马拉', '几内亚', '几内亚比绍', '圭亚那',
  '海地', '夏威夷', '洪都拉斯', '匈牙利', '冰岛', '印度', '印度尼西亚', '伊郎', '伊拉克', '爱尔兰', '以色列',
  '意大利', '科特迪瓦', '牙买加', '日本', '约旦', '柬埔塞', '哈萨克斯坦', '肯尼亚', '基里巴斯', '朝鲜', '韩国',
  '科威特', '吉尔吉斯斯坦', '老挝', '拉脱维亚', '黎巴嫩', '莱索托', '利比里亚', '利比亚', '列支敦士登', '立陶宛',
  '卢森堡', '马其顿', '马达加斯加', '马拉维', '马来西亚', '马尔代夫', '马里', '马耳他', '马里亚纳群岛', '马绍尔群岛',
  '马提尼克', '毛里塔尼亚', '毛里求斯', '马约特岛', '墨西哥', '密克罗尼西亚', '中途岛', '摩尔多瓦', '摩纳哥', '蒙古',
  '蒙特塞拉特岛', '摩洛哥', '莫桑比克', '缅甸', '纳米比亚', '瑙鲁', '尼泊尔', '荷兰', '荷属安的列斯群岛', '新喀里多尼亚群岛',
  '新西兰', '尼加拉瓜', '尼日尔', '尼日利亚', '纽埃岛', '诺福克岛', '挪威', '阿曼', '帕劳', '巴拿马', '巴布亚新几内亚',
  '巴拉圭', '秘鲁', '菲律宾', '波兰', '葡萄牙', '巴基斯坦', '波多黎各', '卡塔尔', '留尼汪岛', '罗马尼亚', '俄罗斯',
  '卢旺达', '东萨摩亚', '西萨摩亚', '圣马力诺', '圣皮埃尔岛及密克隆岛', '圣多美和普林西比', '沙特阿拉伯', '塞内加尔',
  '塞舌尔', '新加坡', '斯洛伐克', '斯洛文尼亚', '所罗门群岛', '索马里', '南非', '西班牙', '斯里兰卡', '圣克里斯托弗和尼维斯',
  '圣赫勒拿', '圣卢西亚', '圣文森特岛', '苏丹', '苏里南', '斯威士兰', '瑞典', '瑞士', '叙利亚', '塔吉克斯坦', '坦桑尼亚',
  '泰国', '阿拉伯联合酋长国', '多哥', '托克劳群岛', '汤加', '特立尼达和多巴哥', '突尼斯', '土耳其', '土库曼斯坦',
  '特克斯和凯科斯群岛', '图瓦卢', '美国', '乌干达', '乌克兰', '英国', '乌拉圭', '乌兹别克斯坦', '瓦努阿图',
  '梵蒂冈', '委内瑞拉', '越南', '维尔京群岛', '维尔京群岛和圣罗克伊', '威克岛', '瓦里斯和富士那群岛', '西撒哈拉',
  '也门', '南斯拉夫', '扎伊尔', '赞比亚', '桑给巴尔', '津巴布韦', '中华人民共和国', '中国',
];

const _address_provinces = [
  '北京市', '上海市', '天津市', '重庆市',
  '内蒙古自治区', '山西省', '河北省', '吉林省', '江苏省', '辽宁省', '黑龙江省',
  '安徽省', '山东省', '浙江省', '江西省', '福建省', '湖南省', '湖北省',
  '河南省', '广东省', '广西壮族自治区', '贵州省', '海南省', '四川省', '云南省',
  '陕西省', '甘肃省', '宁夏回族自治区', '青海省', '新疆维吾尔自治区', '西藏自治区',
  '台湾省', '香港特别行政区', '澳门特别行政区',
];

const _address_cities = [
  '北京', '上海', '天津', '重庆', '哈尔滨', '长春', '沈阳', '呼和浩特',
  '石家庄', '乌鲁木齐', '兰州', '西宁', '西安', '银川', '郑州', '济南', '太原',
  '合肥', '武汉', '长沙', '南京', '成都', '贵阳', '昆明', '南宁', '拉萨',
  '杭州', '南昌', '广州', '福州', '台北', '海口', '香港', '澳门', '通辽',
  '兴安盟', '太原', '辛集', '邯郸', '沈阳', '辽阳', '兴城', '北镇', '阜新',
  '哈尔滨', '齐齐哈尔', '淮安', '张家港', '海门', '六安', '巢湖', '马鞍山',
  '永安', '宁德', '嘉禾', '荆门', '潜江', '大冶', '宜都', '佛山', '深圳',
  '潮州', '惠州', '汕尾', '东莞', '梧州', '柳州', '合山', '六盘水', '关岭',
];

const _address_districts = [
  '西夏', '永川', '秀英', '高港', '清城', '兴山', '锡山', '清河',
  '龙潭', '华龙', '海陵', '滨城', '东丽', '高坪', '沙湾', '平山',
  '城北', '海港', '沙市', '双滦', '长寿', '山亭', '南湖', '浔阳',
  '南长', '友好', '安次', '翔安', '沈河', '魏都', '西峰', '萧山',
  '金平', '沈北新', '孝南', '上街', '城东', '牧野', '大东',
  '白云', '花溪', '南山', '新城', '怀柔', '六枝特', '涪城',
  '清浦', '南溪', '淄川', '高明', '东城', '崇文', '朝阳', '大兴',
  '房山', '门头沟', '黄浦', '徐汇', '静安', '普陀', '闵行', '和平',
  '蓟州', '永川', '长寿', '璧山', '合川', '梁平', '丰都', '江北',
  '金水', '二七', '中原', '管城', '惠济', '高新', '经开', '郑东',
  '港区', '巩义', '上街', '荥阳', '中牟', '登封', '新密', '新郑',
];

const _address_districts_suffixes = [
  '市', '区', '县',
];

const _address_streets = [
  '一马路', '三全路', '三马路', '东大街', '东风东路', '东风南路', '东风路', '丰乐路',
  '丰产路', '丰庆路', '二七路', '二马路', '京广路', '人民路', '伊河路', '伏牛路',
  '众意西路', '众意路', '兴隆街', '农业东路', '农业南路', '农业路', '农科路', '冬青街',
  '凤亭路', '凤仪路', '凤苑路', '出航路', '功铭路', '化工路', '华山路', '南阳路',
  '合欢街', '商城路', '国基路', '垂柳路', '城东路', '城北路', '城南路', '太康路',
  '太湖路', '如意西路', '如意路', '宏河路', '山桃路', '嵩山路', '巡航路', '巢湖路',
  '工人路', '幸福路', '庆丰街', '建设路', '开航路', '政一街', '政三街', '政二街',
  '春兰路', '春藤路', '林科路', '枫杨街', '桐柏路', '梧桐街', '梯航路', '棉织路',
  '汝河路', '江山路', '沁河路', '洛河路', '洪泽湖大道', '淮河路', '玉兰街', '瑞达路',
  '电厂路', '白桦街', '石楠路', '碧桃路', '福寿街', '科学大道', '秦岭路', '红专路',
  '红旗路', '红梅街', '纬一路', '纬三路', '纬二路', '纺织街', '经一路', '经三路',
  '经二路', '绿梅街', '翠竹街', '航海路', '芙蓉路', '花园路', '药厂街', '莲花街',
  '西大街', '西站路', '通泰路', '鄱阳湖路', '金梭路', '金水东路', '金水路', '银屏路',
  '长兴路', '长椿路', '陇海路', '雪松路', '领航路', '颍河路', '黄河东路', '黄河南路',
];

const _address_buildings = [
  '世贸大厦', '东方鼎盛中心', '中华大厦', '中原万达广场', '中国人保大厦', '中油新澳大厦',
  '中科金座', '五行嘉园', '亚新广场', '亚星SOHO国际', '企业壹号大厦', '传媒创意中心',
  '佳田国际广场', '兰德中心', '兴达国贸', '凯利大厦', '创艺中心', '升龙大厦', '升龙广场',
  '升龙环球大厦', '华林新时代广场', '名门国际中心', '商都世贸中心', '嘉亿东方大厦',
  '国家863中部软件园', '国家开发银行', '国泰财富中心', '国际商会大厦', '基正聚源国际',
  '天一大厦', '威斯顿广场', '宏光协和城邦', '广地和顺中心', '康桥商务广场', '建业凯旋广场',
  '建业总部港', '建正东方中心', '新芒果大厦', '方圆创世国际', '易元国际写字楼', '景峰国际',
  '格拉姆', '楷林IFC', '楷林中心', '楷林国际', '正商和谐大厦', '正商经开广场', '正岩大厦',
  '正岩铂兹中心', '民生银行大厦', '永和国际广场', '永和宇宙星写字楼', '浦发国际金融中心',
  '海赋国际写字楼', '瀚海璞丽中心', '王鼎国贸大厦写字楼', '王鼎国际', '盛润白宫',
  '科技财智名座', '立基上东国际', '绿地世纪峰会', '绿地中心千玺广场', '绿地之窗',
  '绿地原盛国际', '绿地峰会天下', '绿地新都会', '美侨世纪广场', '美盛中心', '联合中心大厦',
  '苏荷中心', '行署国际广场', '裕鸿国际', '豫航中心', '财信大厦', '绿地中心', '金城国贸',
  '金成东方国际', '金成时代广场写字楼', '龙湖大厦', '兴业大厦', '雅宝东方国际',
  '顺驰第一国际', '领秀国际中心',
];

const _address_buildings_units = [
  'A座', 'B座', 'C座', 'D座', 'E座', 'F座',
];

const _address_communities = [
  '一处庭院', '七里香堤', '万龙花园', '世茂云尚城', '世豪小公馆', '东城花园', '东文雅小区',
  '东方梦园', '东润泰和', '东瑞佳苑', '中建文苑', '中方园', '中海锦苑', '中联花园', '中鼎花园',
  '丰乐花苑', '丰庆佳苑', '丰庆华府', '丽水人家', '九锦台', '京广花园', '人和花园', '亿安花园',
  '伍号院', '佳河园', '佳苑小区', '假日蓝湾', '关虎屯小区', '兴达公寓', '冯庄小区', '凤凰台花园',
  '凤凰苑', '北云鹤花园', '北晨颐商苑', '北苑家园', '升龙玺园', '华园华庭', '华瑞紫薇苑',
  '博瑞盛和苑', '原田花园', '发展南郡', '可乐公寓', '呈祥花园', '商城花园', '嘉佰丽园', '嘉和园',
  '嘉瑞园', '嘉秀园', '嘉辰丽景苑', '嘉辰时代公寓', '四季花城', '四月天', '国泰一品庄园',
  '国泰罗马假日', '国贸新领地', '国贸酒店公寓', '国鑫小时代', '圣菲城', '城南春天', '城市之星',
  '外商公寓', '天伦水晶城', '天擎花园', '天福苑', '太极公馆', '奥兰和园', '安泰嘉园', '宏达花苑',
  '宏都花园', '家和万世家园', '富邦铭邸', '山顶御金城', '广兴航海花城', '康华苑小区', '康宁居',
  '康普新巷', '康桥康城', '康桥悦岛', '建业香槟圣园', '御府三号', '恒升家园', '恒升府第',
  '惠工小区', '数码公寓', '文化绿城', '文华苑', '文博公寓', '文博名门', '文博花园', '文雅小区',
  '文雅新世界', '方圆创世', '时代骏庭', '明天花园', '明辉小区', '朝阳小区', '未来丽景苑',
  '未来和枫苑', '核勘苑', '梦苑小区', '森林阳光花园', '橄榄城新公馆', '橡树玫瑰城', '正商中州城',
  '正商创富欣城', '正商华钻', '正商城', '正商幸福港湾', '正商新蓝钻', '正弘蓝堡湾', '正馨花园',
  '民安尚郡', '永丰心座', '永丰新城', '永丰新都', '永威城', '永恒亲亲家园', '永恒理想世界',
  '汇宝花园', '汉飞城市公园', '江山名典', '河畔人家', '泰宏建业国际城', '泰山誉景', '海轮城市风铃',
  '海通苑', '清华紫光园', '源升府邻竹园', '源升金锣湾', '滨河花园', '瀚海思念城', '瀚海泰苑',
  '琥珀名城', '百草园', '盈家美地', '益兴花园', '盛润小城之春', '碧桂园天麓', '紫东苑', '紫云小区',
  '紫南花园', '紫域云庭', '紫燕华庭', '紫竹小区', '紫竹轩', '紫荆小区', '紫荆苑', '紫荆阳光地带',
  '紫薇小区', '紫藤苑', '紫金城', '红楼易居', '维也纳森林', '绿云都市家园', '绿洲云顶', '绿洲花园',
  '绿洲银郡', '绿都紫荆华庭', '美景美境', '美景花郡', '美盛教育港湾', '翠和园', '翠园锦荣世家',
  '翡丽公馆', '联创佳苑', '联合家园', '联合花园', '联合雅园', '舒馨花园', '花半里', '花都港湾',
  '苗圃小区', '英地天骄华庭', '裕华文桂园', '裕鸿花园', '西里小区', '豫新公寓', '豫港花苑',
  '远征都市花园', '通利紫荆尚都', '郁金香苑', '都市花园', '都市铭座', '金印现代城', '金印阳光城',
  '金晨嘉园', '金桂苑', '金桥小区', '金水万达', '金祥花园', '金誉良苑', '金领寓', '鑫苑世家',
  '鑫苑国际新城', '锦华苑', '锦艺新时代', '阳光铭座', '陇东小区', '陇海里小区', '隆达小区',
  '雅美新居', '集业小区', '青年居易', '青秀佳苑', '香桔市', '龙源世纪龙城',
];

function country() {
  return this.pick(this._address_countries);
}

function province() {
  return this.pick(this._address_provinces);
}

function city_name() {
  return this.pick(this._address_cities);
}

function city_suffix() {
  return '市';
}

function city() {
  return this.pick(this._address_cities) + '市';
}

function district_name() {
  return this.pick(this._address_districts);
}

function district_suffix() {
  return this.pick(this._address_districts_suffixes);
}

function district() {
  return this.pick(this._address_districts) + this.pick(this._address_districts_suffixes);
}

function street_name() {
  return this.pick(this._address_streets);
}

function street_number() {
  return this.number(1, 366, 0) + '号';
}

function street() {
  return this.pick(this._address_streets) + this.street_number();
}

function building_name() {
  return this.pick(this._address_buildings);
}

function building_unit() {
  return this.pick(this._address_buildings_units);
}

function building_number() {
  return this.number(1, 31, 0) + this.number(1, 31, 0).toString().padStart(2, 0) + '室';
}

function building() {
  return this.pick(this._address_buildings) + this.pick(this._address_buildings_units) + this.building_number();
}

function community_name() {
  return this.pick(this._address_communities);
}

function community_unit() {
  return this.number(1, 7, 0) + '号楼' + this.number(1, 4, 0) + '单元';
}

function community_number() {
  return this.number(1, 21, 0) + '楼' + this.number(1, 121, 0) + '号';
}

function community() {
  return this.pick(this._address_communities) + this.community_unit() + this.community_number();
}

function office_address() {
  return /* this.country() + */ this.province() + this.city() + this.district() + this.street() + this.building();
}

function home_address() {
  return /* this.country() + */ this.province() + this.city() + this.district() + this.street() + this.community();
}

function address() {
  return this.home_address();
}

function postcode() {
  return this.number(100000, 999999, 0);
}

module.exports = function(pino) {
  pino._address_countries = _address_countries;
  pino._address_provinces = _address_provinces;
  pino._address_cities = _address_cities;
  pino._address_districts = _address_districts;
  pino._address_districts_suffixes = _address_districts_suffixes;
  pino._address_streets = _address_streets;
  pino._address_buildings = _address_buildings;
  pino._address_buildings_units = _address_buildings_units;
  pino._address_communities = _address_communities;

  pino.register('country', country);
  pino.register('province', province);
  pino.register('city_name', city_name);
  pino.register('city_suffix', city_suffix);
  pino.register('city', city);
  pino.register('district_name', district_name);
  pino.register('district_suffix', district_suffix);
  pino.register('district', district);
  pino.register('street_name', street_name);
  pino.register('street_number', street_number);
  pino.register('street', street);
  pino.register('building_name', building_name);
  pino.register('building_unit', building_unit);
  pino.register('building_number', building_number);
  pino.register('building', building);
  pino.register('community_name', community_name);
  pino.register('community_unit', community_unit);
  pino.register('community_number', community_number);
  pino.register('community', community);
  pino.register('home_address', home_address);
  pino.register('office_address', office_address);
  pino.register('address', address);
  pino.register('postcode', postcode);
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const _automotive_provinces = {
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

const _automotive_names = [
  '京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖',
  '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵',
  '云', '藏', '陕', '甘', '青', '宁', '新',
];

function license_plate_p2n(province) {
  return this._automotive_names[province.substring(0, 2)];
}

function license_plate_province() {
  return this.pick(this._automotive_names);
}

function license_plate_city() {
  return this.string(1, 'ABCDEFGHJKLMNPQRSTUVWXYZ');
}

function license_plate() {
  return this.pick(this._automotive_names) + this.string(1, 'ABCDEFGHJKLMNPQRSTUVWXYZ') + this.string(5, 'ABCDEFGHJKLMNPQRSTUVWXYZ01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
}

module.exports = function(pino) {
  pino._automotive_provinces = _automotive_provinces;
  pino._automotive_names = _automotive_names;

  pino.register('license_plate_p2n', license_plate_p2n);
  pino.register('license_plate_province', license_plate_province);
  pino.register('license_plate_city', license_plate_city);
  pino.register('license_plate', license_plate);
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const _company_names_data = {
  '超艺':'chaoyi','和泰':'hetai','九方':'jiufang','鑫博':'xinbo','腾飞':'tengfei','戴硕':'daishuo','亿次元':'yiciyuan','海创':'haichuang','创联世纪':'chuanglianshiji','凌云':'lingyun','泰麒麟':'taiqilin','彩虹':'caihong','兰金':'lanjin','晖来':'huilai','天益':'tianyi','恒聪百汇':'hengcongbaihui','菊风':'jufeng','惠派':'huipai','宇通':'yutong','创汇':'chuanghui','思优':'siyou','时空盒数字':'shikongheshuzi','易动力':'yidongli','飞海':'feihai','华泰通安':'huataitongan','盟新':'mengxin','商软冠联':'shangruanguanlian','图龙信息':'tulongxinxi','易动力':'yidongli','华远软件':'huayuanruanjian','创亿':'chuangyi','时刻':'shike','世创':'shichuang','明腾':'mingteng','良诺':'liangnuo','天开':'tiankai','毕博诚':'bibocheng','快讯':'kuaixun','凌颖信息':'lingyingxinxi','黄石金承':'huangshijincheng','恩悌':'enti','雨林木风':'yulinmufeng','双敏':'shuangmin','维旺明':'weiwangming','网新恒天':'wangxinhengtian','铭泰':'mingtai','飞利信':'feilixin','立信':'lixin','联通时科':'liantongshike','建业':'jianye','新格林耐特':'xingelinnaite','宇龙':'yulong','浙大万朋':'zhedawanpeng','讯飞':'xunfei','太能':'taineng','昂歌':'angge','万迅':'wanxun','方正':'fangzheng','联软':'lianruan','七喜':'qixi','南康':'nankang','银嘉':'yinjia','巨奥':'juao','佳禾':'jiahe','国讯':'guoxun','信诚致远':'xinchengzhiyuan','浦华众城':'puhuazhongcheng','迪摩':'dimo','太极':'taiji','群英':'qunying','合联':'helian','同兴万点':'tongxingwandian','博凯':'bokai','精芯':'jingxin','艾提科信':'aitikexin','昊嘉':'haojia','鸿睿思博':'hongruisibo','四通':'sitong','富罳':'fusi','商软冠联':'shangruanguanlian','诺依曼':'nuoyiman','东方峻景':'dongfangjunjing','华成育卓':'huachengyuzhuo','趋势':'qushi','维涛':'weitao','通际名联':'tongjiminglian','五菱':'wuling',
};

const _company_types = [
  '文化','科技','管理','咨询','服务','传播','传媒','信息','国际','影业','电子商务','品牌','商贸','商务','科贸','贸易','广告','教育','体育','设计','生物','图文','建筑','规划','餐饮','医疗','安全','动画','健康','保险','环境',
];

const _company_suffixes = [
  '有限公司', '股份有限公司', '集团公司',
];

function company_name() {
  return this.pick(this._company_names);
}

function company_name_pinyin(name = this.company_name()) {
  return this._company_names_data[name] || '';
}

function company_type() {
  return this.pick(this._company_types);
}

function company_suffix() {
  return this.pick(this._company_suffixes);
}

function company() {
  return `${this.city_name()}${this.pick(this._company_names)}${this.pick(this._company_types)}${this.pick(this._company_suffixes)}`;
}

function company_short() {
  return `${this.pick(this._company_names)}${this.pick(this._company_types)}`;
}

module.exports = function(pino) {
  pino._company_names_data = _company_names_data;
  pino._company_names = Object.keys(_company_names_data);
  pino._company_types = _company_types;
  pino._company_suffixes = _company_suffixes;

  pino.register('company_name', company_name);
  pino.register('company_name_pinyin', company_name_pinyin);
  pino.register('company_type', company_type);
  pino.register('company_suffix', company_suffix);
  pino.register('company', company);
  pino.register('company_short', company_short);
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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
  if (false) {}
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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const _internet_free_email_domains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  '163.com', '126.com', 'yeah.net', 'qq.com', 'foxmail.com',
  'sina.com.cn', 'sohu.com',
];

const _internet_protocols = [
  'http', 'https',
];

const _internet_tlds = [
  'com', 'net', 'cn', 'com.cn', 'net.cn',
];

const _internet_hosts = [
  'www', 'www', 'www', 'www', 'oa', 'mail', 'email', 'disk', 'im', 'data', 'file',
];

const _internet_url_paths = [
  'app', 'main', 'wp-content', 'search', 'category', 'tag', 'categories',
  'tags', 'blog', 'posts', 'list', 'explore',
];

const _internet_url_pages = [
  'index', 'home', 'search', 'main', 'post', 'homepage', 'category',
  'register', 'login', 'faq', 'about', 'terms', 'privacy', 'author',
];

const _internet_url_extensions = [
  'html', 'htm', 'php', 'jsp', 'asp',
];

function domain_tld() {
  return this.pick(this._internet_tlds);
}

function domain_name(domain_name = null) {
  return domain_name || this.string(8, 'abcdefghijklmnopqrstuvwxy');
}

function domain_host() {
  return this.pick(this._internet_hosts);
}

function domain(domain_name = null) {
  return `${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function hostname(domain_name = null) {
  return `${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function free_email_domain() {
  return this.pick(this._internet_free_email_domains);
}

function free_email() {
  return `${this.name_pinyin()}@${this.pick(this._internet_free_email_domains)}`;
}

function company_email_domain() {
  return `${this.company_name_pinyin()}.${this.pick(this._internet_tlds)}`;
}

function company_email() {
  return `${this.name_pinyin()}@${this.company_name_pinyin()}.${this.pick(this._internet_tlds)}`;
}

function email() {
  return this.free_email();
}

function ipv4() {
  return this.range(4, this.uint8).join('.');
}

function ipv6() {
  return this.range(8, this.uint16).map(v => v.toString(16)).join(':');
}

function mac_address() {
  return this.range(6, this.uint8).map(v => v.toString(16).padStart(2, 0)).join(':');
}

function protocal() {
  return this.pick(this._internet_protocols);
}

function site(domain_name = null) {
  return `${this.protocal()}://${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function url_path(depth = 2) {
  return '/' + this.range(depth, () => this.pick(this._internet_url_paths)).join('/');
}

function url_page() {
  return this.pick(this._internet_url_pages);
}

function url_extension() {
  return this.pick(this._internet_url_extensions);
}

function url(domain_name = null) {
  return `${this.site(domain_name)}${this.url_path()}/${this.url_page()}.${this.url_extension()}`;
}

module.exports = function(pino) {
  pino._internet_free_email_domains = _internet_free_email_domains;
  pino._internet_protocols = _internet_protocols;
  pino._internet_tlds = _internet_tlds;
  pino._internet_hosts = _internet_hosts;
  pino._internet_url_paths = _internet_url_paths;
  pino._internet_url_pages = _internet_url_pages;
  pino._internet_url_extensions = _internet_url_extensions;

  pino.register('domain_tld', domain_tld);
  pino.register('domain_name', domain_name);
  pino.register('domain_host', domain_host);
  pino.register('domain', domain);
  pino.register('hostname', hostname);
  pino.register('free_email_domain', free_email_domain);
  pino.register('free_email', free_email);
  pino.register('company_email_domain', company_email_domain);
  pino.register('company_email', company_email);
  pino.register('email', email);
  pino.register('ipv4', ipv4);
  pino.register('ipv6', ipv6);
  pino.register('mac_address', mac_address);
  pino.register('protocal', protocal);
  pino.register('site', site);
  pino.register('url_path', url_path);
  pino.register('url_page', url_page);
  pino.register('url_extension', url_extension);
  pino.register('url', url);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const _lorem_words = [
  '活动', '重要', '显示', '大小', '使用', '最后', '系列', '注意', '一些', '其中',
  '我的', '怎么', '最新', '只要', '为了', '一下', '位置', '组织', '日期', '成功',
  '男人', '那些', '需要', '对于', '城市', '成为', '电影', '简介', '免费', '软件',
  '继续', '报告', '通过', '可以', '工程', '分析', '操作', '公司', '自己', '作品',
  '生活', '社区', '得到', '论坛', '必须', '提供', '电脑', '进行', '关系', '影响',
  '方面', '音乐', '直接', '商品', '等级', '如何', '内容', '更新', '生产', '中文',
  '准备', '留言', '电子', '一切', '实现', '一直', '东西', '主题', '责任', '可能',
  '销售', '以上', '介绍', '人员', '发生', '她的', '女人', '游戏', '大家', '发展',
  '查看', '不断', '全部', '这里', '推荐', '地址', '工作', '网站', '时候', '一样',
  '以及', '管理', '数据', '其实', '评论', '他们', '各种', '而且', '服务', '不是',
  '一定', '为什', '积分', '中心', '系统', '知道', '说明', '提高', '如此', '要求',
  '建设', '完成', '我们', '设计', '能力', '法律', '还是', '时间', '状态', '在线',
  '您的', '同时', '进入', '喜欢', '完全', '经营', '这个', '联系', '下载', '具有',
  '起来', '出现', '都是', '由于', '搜索', '一次', '当前', '学校', '标题', '用户',
  '其他', '能够', '个人', '决定', '这么', '朋友', '标准', '到了', '选择', '汽车',
  '次数', '作者', '因此', '很多', '密码', '现在', '你的', '设备', '之间', '所以',
  '任何', '没有', '发表', '登录', '本站', '所有', '来自', '市场', '工具', '是一',
  '相关', '项目', '虽然', '行业', '的人', '这些', '结果', '一种', '开始', '原因',
  '运行', '国际', '浏览', '有限', '表示', '大学', '品牌', '手机', '经验', '这是',
  '帖子', '包括', '会员', '无法', '谢谢', '企业', '合作', '是否', '方法', '图片',
  '网上', '功能', '技术', '注册', '文件', '你们', '最大', '文章', '业务', '学生',
  '两个', '应用', '有些', '一个', '情况', '发布', '还有', '威望', '地区', '这种',
  '目前', '经济', '之后', '感觉', '参加', '问题', '点击', '今年', '认为', '回复',
  '方式', '资料', '出来', '拥有', '类型', '来源', '以后', '主要', '专业', '不要',
  '就是', '资源', '客户', '可是', '阅读', '地方', '学习', '程序', '以下', '文化',
  '科技', '的话', '不同', '特别', '首页', '制作', '发现', '应该', '或者', '空间',
  '部分', '也是', '因为', '的是', '基本', '希望', '过程', '加入', '但是', '那个',
  '关于', '正在', '信息', '看到', '电话', '欢迎', '广告', '作为', '如果', '什么',
  '只是', '研究', '一起', '增加', '质量', '不能', '网络', '不会', '他的', '精华',
  '解决', '帮助', '觉得', '今天', '产品', '计划', '更多', '价格', '然后', '不过',
  '孩子', '环境', '类别', '开发', '名称', '处理', '那么', '只有', '投资', '当然',
  '历史', '比较', '一点', '非常', '事情', '语言', '教育', '根据', '这样', '一般',
  '详细', '支持', '已经',
];

function word() {
  return this.pick(this._lorem_words);
}

function text(len = 200) {
  const proba = this.probability(['，', 8], ['。', 2]);
  let text = '';
  while (text.length < len) {
    text += this.range(this.number(3, 9, 0), this.word).join('') + proba();
  }
  return text.substr(0, len - 1) + '。';
}

module.exports = function(pino) {
  pino._lorem_words = _lorem_words;

  pino.register('word', word);
  pino.register('text', text);
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

const _person_last_names_data = {
  '丁':'ding','万':'wan','上':'shang','丌':'qi','丘':'qiu','东':'dong','严':'yan','丰':'feng','乌':'wu','乐':'le','乔':'qiao','乜':'mie','习':'xi','于':'yu','云':'yun','五':'wu','井':'jing','亢':'kang','人':'ren','仇':'chou','仉':'zhang','从':'cong','令':'ling','仰':'yang','仲':'zhong','任':'ren','伊':'yi','伍':'wu','伏':'fu','伯':'bo','何':'he','佘':'she','余':'yu','佟':'tong','佴':'er','侯':'hou','俞':'yu','俟':'si','倪':'ni','傅':'fu','储':'chu','元':'yuan','充':'chong','党':'dang','全':'quan','公':'gong','关':'guan','养':'yang','冀':'ji','冉':'ran','农':'nong','冯':'feng','况':'kuang','冶':'ye','冷':'leng','凌':'ling','凤':'feng','刁':'diao','刘':'liu','利':'li','别':'bie','劳':'lao','勾':'gou','包':'bao','匡':'kuang','华':'hua','卓':'zhuo','单':'dan','南':'nan','卜':'bu','卞':'bian','卢':'lu','卫':'wei','印':'yin','危':'wei','卻':'que','厉':'li','厍':'she','双':'shuang','叔':'shu','古':'gu','台':'tai','史':'shi','叶':'ye','司':'si','吉':'ji','后':'hou','向':'xiang','吕':'lv','吴':'wu','周':'zhou','呼':'hu','和':'he','咸':'xian','哈':'ha','唐':'tang','商':'shang','喻':'yu','国':'guo','堵':'du','墨':'mo','壤':'rang','夏':'xia','夔':'kui','太':'tai','夹':'jia','奚':'xi','姓':'xing','姚':'yao','姜':'jiang','姬':'ji','娄':'lou','子':'zi','孔':'kong','孙':'sun','孟':'meng','季':'ji','宁':'ning','宇':'yu','安':'an','宋':'song','宓':'mi','宗':'zong','官':'guan','宣':'xuan','宦':'huan','宫':'gong','宰':'zai','家':'jia','容':'rong','宿':'su','寇':'kou','富':'fu','寿':'shou','封':'feng','尉':'wei','尚':'shang','尤':'you','尹':'yin','居':'ju','屈':'qu','屠':'tu','山':'shan','岑':'cen','岳':'yue','崔':'cui','嵇':'ji','巢':'chao','左':'zuo','巩':'gong','巫':'wu','巴':'ba','帅':'shuai','师':'shi','席':'xi','常':'chang','干':'gan','平':'ping','年':'nian','幸':'xing','广':'guang','庄':'zhuang','应':'ying','庞':'pang','康':'kang','庾':'yu','廉':'lian','廖':'liao','延':'yan','弓':'gong','弘':'hong','张':'zhang','强':'qiang','归':'gui','彭':'peng','徐':'xu','徒':'tu','微':'wei','怀':'huai','惠':'hui','慎':'shen','慕':'mu','戈':'ge','戎':'rong','成':'cheng','戚':'qi','戴':'dai','房':'fang','扈':'hu','扶':'fu','拓':'tuo','支':'zhi','政':'zheng','敖':'ao','文':'wen','方':'fang','於':'yu','施':'shi','时':'shi','昌':'chang','明':'ming','易':'yi','昝':'zan','晁':'chao','晋':'jin','晏':'yan','景':'jing','暨':'ji','暴':'bao','曲':'qu','曹':'cao','曾':'zeng','月':'yue','有':'you','木':'mu','朱':'zhu','权':'quan','李':'li','杜':'du','束':'shu','杨':'yang','杭':'hang','松':'song','林':'lin','柏':'bai','查':'cha','柯':'ke','柳':'liu','柴':'chai','栾':'luan','桂':'gui','桑':'sang','桓':'huan','梁':'liang','梅':'mei','楚':'chu','樊':'fan','欧':'ou','正':'zheng','步':'bu','武':'wu','殳':'shu','段':'duan','殷':'yin','毋':'wu','毕':'bi','毛':'mao','水':'shui','汝':'ru','江':'jiang','池':'chi','汤':'tang','汪':'wang','汲':'ji','沃':'wo','沈':'shen','沙':'sha','法':'fa','洪':'hong','浦':'pu','海':'hai','涂':'tu','淳':'chun','温':'wen','游':'you','湛':'zhan','滑':'hua','滕':'teng','满':'man','漆':'qi','潘':'pan','澹':'dan','濮':'pu','焦':'jiao','熊':'xiong','燕':'yan','爱':'ai','父':'fu','牛':'niu','牟':'mou','牧':'mu','狄':'di','狐':'hu','王':'wang','班':'ban','琴':'qin','璩':'qu','甄':'zhen','甘':'gan','生':'sheng','甫':'fu','田':'tian','申':'shen','白':'bai','百':'bai','皇':'huang','皮':'pi','益':'yi','盖':'gai','盛':'sheng','相':'xiang','督':'du','瞿':'qu','石':'shi','祁':'qi','祖':'zu','祝':'zhu','禄':'lu','福':'fu','禹':'yu','离':'li','秋':'qiu','秦':'qin','程':'cheng','穆':'mu','空':'kong','窦':'dou','章':'zhang','童':'tong','端':'duan','竺':'zhu','符':'fu','笪':'da','第':'di','简':'jian','管':'guan','籍':'ji','米':'mi','糜':'mi','索':'suo','红':'hong','纪':'ji','终':'zhong','经':'jing','缑':'gou','缪':'mou','罗':'luo','羊':'yang','羿':'yi','翁':'weng','翟':'di','耿':'geng','聂':'nie','胡':'hu','胥':'xu','能':'neng','臧':'zang','舌':'she','舒':'shu','良':'liang','艾':'ai','芮':'rui','花':'hua','苍':'cang','苏':'su','苗':'miao','范':'fan','茅':'mao','茹':'ru','荀':'xun','荆':'jing','荣':'rong','莘':'shen','莫':'mo','萧':'xiao','葛':'ge','董':'dong','蒋':'jiang','蒙':'meng','蒯':'kuai','蒲':'pu','蓝':'lan','蓟':'ji','蓬':'peng','蔚':'wei','蔡':'cai','蔺':'lin','薄':'bao','薛':'xue','虞':'yu','融':'rong','衡':'heng','袁':'yuan','裘':'qiu','裴':'pei','褚':'zhu','西':'xi','解':'jie','言':'yan','訾':'zi','詹':'zhan','计':'ji','许':'xu','诸':'zhu','谈':'tan','谢':'xie','谭':'tan','谯':'qiao','谷':'gu','贝':'bei','贡':'gong','贲':'bi','费':'fei','贺':'he','贾':'gu','赏':'shang','赖':'lai','赫':'he','赵':'zhao','越':'yue','跋':'ba','路':'lu','车':'che','轩':'xuan','辕':'yuan','辛':'xin','边':'bian','连':'lian','迟':'chi','逄':'pang','通':'tong','逯':'lu','邓':'deng','邢':'xing','那':'na','邬':'wu','邰':'tai','邱':'qiu','邴':'bing','邵':'shao','邹':'zou','郁':'yu','郈':'hou','郎':'lang','郏':'jia','郑':'zheng','郗':'xi','郜':'gao','郝':'hao','郦':'li','郭':'guo','都':'du','鄂':'e','鄢':'yan','酆':'feng','里':'li','金':'jin','钟':'zhong','钦':'qin','钭':'dou','钮':'niu','钱':'qian','长':'chang','门':'men','闫':'yan','闵':'min','闻':'wen','闾':'lv','阎':'yan','阙':'que','阚':'kan','阮':'ruan','阳':'yang','阴':'yin','陆':'lu','陈':'chen','陶':'tao','隆':'long','隗':'wei','雍':'yong','雕':'diao','雷':'lei','霍':'huo','靳':'jin','鞠':'ju','韦':'wei','韩':'han','韶':'shao','项':'xiang','须':'xu','顾':'gu','颛':'zhuan','颜':'yan','饶':'rao','马':'ma','驷':'si','骆':'luo','高':'gao','鬱':'yu','魏':'wei','鱼':'yu','鲁':'lu','鲍':'bao','鲜':'xian','麻':'ma','黄':'huang','黎':'li','齐':'qi','龙':'long','龚':'gong',
};

const _person_first_names_male_data = {
  '潇健':'xiaojian','大成':'dacheng','贺雄':'hexiong','家宇':'jiayu','屿':'yu','湑凯':'xukai','志铭':'zhiming','一劼':'yijie','博琨':'bokun','永澍':'yongshu','卓熙':'zhuoxi','佳铮':'jiazheng','钟炜':'zhongwei','凤星':'fengxing','金锋':'jinfeng','乾宇':'qianyu','盛':'sheng','颀炜':'qiwei','晟卓':'shengzhuo','帅':'shuai','竟东':'jingdong','平琦':'pingqi','伟亮':'weiliang','璐凯':'lukai','肃':'su','楷善':'kaishan','海阳':'haiyang','皓俊':'haojun','伟祥':'weixiang','晨祎':'chenyi','霄泽':'xiaoze','沛泽':'peize','永旭':'yongxu','鹏帆':'pengfan','政旭':'zhengxu','东阳':'dongyang','健强':'jianqiang','俊燚':'junyi','默然':'moran','谨昊':'jinhao','国政':'guozheng','翊鸿':'yihong','千炜':'qianwei','尧城':'yaocheng','钰伟':'yuwei','耀':'yao','嘉文':'jiawen','健健':'jianjian','序':'xu','孝金':'xiaojin','佳肴':'jiayao','天骑':'tianqi','泽枫':'zefeng','守浩':'shouhao','鹏月':'pengyue','恒阅':'hengyue','泓臻':'hongzhen','晶硕':'jingshuo','忠元':'zhongyuan','华森':'huasen','旭畅':'xuchang','国强':'guoqiang','文治':'wenzhi','纪雄':'jixiong','嘉衡':'jiaheng','伟杰':'weijie','兆辉':'zhaohui','思成':'sicheng','林旭':'linxu','少辉':'shaohui','星淇':'xingqi','昊喆':'haozhe','飞扬':'feiyang','晓贺':'xiaohe','瑀翀':'yuchong','仁昭':'renzhao','胜涛':'shengtao','鸥卜':'oubu','云宝':'yunbao','瑞涵':'ruihan','川':'chuan','铠滔':'kaitao','明炬':'mingju','运乾':'yunqian','新富':'xinfu','羿灿':'yican','锦前':'jinqian','伍沐':'wumu','威弘':'weihong','拯':'zheng','江洋':'jiangyang','杭杰':'hangjie','天鑫':'tianxin','雪通':'xuetong','茂新':'maoxin','泽仕':'zeshi','方洋':'fangyang','煜杰':'yujie','韪铭':'weiming','家瑜':'jiayu',
};

const _person_first_names_female_data = {
  '艳娇':'yanjiao','晓思':'xiaosi','轶伟':'yiwei','晓涵':'xiaohan','若晴':'ruoqing','铭璇':'mingxuan','玉灿':'yucan','馥宁':'funing','赛琼':'saiqiong','恬祎':'tianyi','靖雪':'jingxue','潇丹':'xiaodan','超月':'chaoyue','子怡':'ziyi','李妃':'lifei','瑞鸿':'ruihong','芳源':'fangyuan','祺钰':'qiyu','雅琪':'yaqi','配如':'peiru','俣佳':'yujia','议丹':'yidan','雅凡':'yafan','梓楠':'zinan','坤宇':'kunyu','星楠':'xingnan','祺琦':'qiqi','叶青':'yeqing','煜':'yu','林凡':'linfan','婷文':'tingwen','莹雪':'yingxue','洢柠':'yining','晓薇':'xiaowei','馨妍':'xinyan','阳阳':'yangyang','钰莹':'yuying','婉祺':'wanqi','紫琼':'ziqiong','雨涵':'yuhan','昕怡':'xinyi','一楠':'yinan','天冉':'tianran','天茹':'tianru','欣彤':'xintong','玥涵':'yuehan','艳婷':'yanting','贺尧':'heyao','梦召':'mengzhao','禾苗':'hemiao','亚捷':'yajie','自翼':'ziyi','小雅':'xiaoya','佳荣':'jiarong','贻冉':'yiran','淙淙':'congcong','玉帆':'yufan','雨萌':'yumeng','艳非':'yanfei','家幸':'jiaxing','祺昕':'qixin','丽君':'lijun','佳淇':'jiaqi','泓悦':'hongyue','思齐':'siqi','懿纯':'yichun','艾妮':'aini','亦苗':'yimiao','静哲':'jingzhe','笑蓉':'xiaorong','天为':'tianwei','砚心':'yanxin','伊璇':'yixuan','姿':'zi','欢':'huan','展':'zhan','芮颍':'ruiying','琼玉':'qiongyu','晓函':'xiaohan','艺馨':'yixin','赛亚':'saiya','佳曼':'jiaman','馨宁':'xinning','紫予':'ziyu','石良':'shiliang','奥博':'aobo','聪敏':'congmin','怡雯':'yiwen','杨灿':'yangcan','雲河':'yunhe','怿萱':'yixuan','馨玥':'xinyue','苏宇':'suyu','艺灿':'yican','思慧':'sihui','铭浛':'minghan','博淼':'bomiao','艺蒙':'yimeng','伊明':'yiming','瑞瑞':'ruirui',
};

const _person_jobs = [
  '客户关系经理/主管', '化妆品研发', '仓库经理/主管', '运动健身', '综合业务专员', '审核员',
  '市场/营销/拓展经理', '调墨技师', '飞机维修机械师', '网页设计/制作/美工', '房地产项目招投标',
  '医药招商', 'CNC工程师', '医疗器械销售代表', '学徒工', '语音/视频/图形开发工程师', '造纸研发',
  '供应链经理', '房地产项目/策划经理', '包装设计', '信息技术专员', '医疗器械研发',
  '实验室负责人/工程师', '专柜彩妆顾问(BA)', '高级客户经理/客户经理', '变压器与磁电工程师',
  '游戏界面设计师', '市场通路经理/主管', '美发店长', '美容保健', '算法工程师', '电分操作员',
  '建筑项目助理', '镗工', '技术文员/助理', '编辑出版', '酒店前台', '会计经理/会计主管',
  '汽车检验/检测', '高级软件工程师',
];

function name_update(first_names_male_data = null, first_names_female_data = null) {
  this._person_first_names_male_data = first_names_male_data;
  this._person_first_names_male = Object.keys(this._person_first_names_male_data);
  this._person_first_names_female_data = first_names_female_data;
  this._person_first_names_female = Object.keys(this._person_first_names_female_data);
  this._person_first_names_data = Object.assign({}, first_names_male_data, first_names_female_data);
  this._person_first_names = Object.keys(this._person_first_names_data);
}

function last_name() {
  return this.pick(this._person_last_names);
}

function last_name_pinyin(name = this.last_name()) {
  return this._person_last_names_data[name] || '';
}

function first_name_male() {
  return this.pick(this._person_first_names_male);
}

function first_name_male_pinyin(name = this.first_name_male()) {
  return this._person_first_names_male_data[name] || '';
}

function first_name_female() {
  return this.pick(this._person_first_names_female);
}

function first_name_female_pinyin(name = this.first_name_female()) {
  return this._person_first_names_female_data[name] || '';
}

function first_name() {
  return this.pick(this._person_first_names);
}

function first_name_pinyin(name = this.first_name()) {
  return this._person_first_names_data[name] || '';
}

function name() {
  return this.last_name() +  this.first_name();
}

function name_male() {
  return this.last_name() + this.first_name_male();
}

function name_female() {
  return this.last_name() + this.first_name_female();
}

function name_pinyin(name = this.name()) {
  return this.last_name_pinyin(name.substr(0, 1)) + this.first_name_pinyin(name.substr(1));
}

function username() {
  return this.name_pinyin();
}

function password() {
  return this.string(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`-=');
}

function job() {
  return this.pick(this._person_jobs);
}

function phone() {
  return `1${this.pick([3, 5, 8])}${this.number(100000000, 999999999, 0)}`;
}

module.exports = function(pino) {
  pino.register('name_update', name_update);

  pino._person_last_names_data = _person_last_names_data;
  pino._person_last_names = Object.keys(pino._person_last_names_data);
  pino.name_update(_person_first_names_male_data, _person_first_names_female_data);
  pino._person_jobs = _person_jobs;

  pino.register('last_name', last_name);
  pino.register('last_name_pinyin', last_name_pinyin);
  pino.register('first_name_male', first_name_male);
  pino.register('first_name_male_pinyin', first_name_male_pinyin);
  pino.register('first_name_female', first_name_female);
  pino.register('first_name_female_pinyin', first_name_female_pinyin);
  pino.register('first_name', first_name);
  pino.register('first_name_pinyin', first_name_pinyin);
  pino.register('name', name);
  pino.register('name_male', name_male);
  pino.register('name_female', name_female);
  pino.register('name_pinyin', name_pinyin);
  pino.register('username', username);
  pino.register('password', password);
  pino.register('job', job);
  pino.register('phone', phone);
};


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=pino.js.map