(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pino"] = factory();
	else
		root["pino"] = factory();
})(window, function() {
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
/***/ (function(module, exports, __webpack_require__) {

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
}.bind(pino);

pino.currying = function(...cargs) {
  const method = this;
  const func = function(...args) {
    return method(...cargs, ...args)
  }.bind(pino);
  func.currying = pino.currying;
  return func;
};
pino.currying.bind = () => {};

// ====== types ======

pino.bool = function() {
  return Math.floor(Math.random() * MAX_INT) % 2 === 1;
}.bind(pino);
pino.bool.currying = pino.currying;
pino.boolean = pino.bool;

pino.number = function(...args) {
  const def = {
    min: MIN_INT,
    max: MAX_INT,
    decimal: -1,
  };
  const conf = Object.assign({}, def, ...args);
  let n = conf.min + Math.random() * (conf.max - conf.min);
  if (conf.decimal > -1) {
    n = n.toFixed(conf.decimal) - 0;
  }
  return n;
}.bind(pino);
pino.number.currying = pino.currying;

pino.string = function(...args) {
  if (args.length > 0 && typeof args[0] === 'number') {
    args[0] = { len: args[0] };
  }
  const def = {
    len: 8,
    chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  };
  const conf = Object.assign({}, def, ...args);
  let str = '';
  for (let i = 0; i < conf.len; i++) {
    str += conf.chars.charAt(Math.random() * conf.chars.length | 0);
  }
  return str;
}.bind(pino);
pino.string.currying = pino.currying;

// ====== range ======

pino.empty = function(size = 0) {
  return new Array(size);
}.bind(pino);

pino.zeros = function(size = 0) {
  return new Array(size).fill(0);
}.bind(pino);

pino.ones = function(size = 0) {
  return new Array(size).fill(1);
}.bind(pino);

pino.fill = function(size = 0, value = 0) {
  return new Array(size).fill(value);
}.bind(pino);

pino.range = function(...args) {
  let start = 0;
  let end = 0;
  let step = 1;
  const f = this.a2f(args) || ((i, arr) => i);
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
}.bind(pino);

pino.page = function(total, page, pagesize, f) {
  return this.range((page - 1) * pagesize, Math.min(page * pagesize, total), f);
}.bind(pino);

// ====== math ======

pino.linspace = function(start, end, num, endpoint = true) {
  const step = (end - start) / (num - endpoint);
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(start + step * i);
  }
  return arr;
}.bind(pino);

pino.min = function(...args) {
  return Math.min(...args);
}.bind(pino);

pino.max = function(...args) {
  return Math.max(...args);
}.bind(pino);

pino.sum = function(...args) {
  return args.reduce((a, c) => a + c, 0);
}.bind(pino);

pino.mean = function(...args) {
  return this.sum(...args) / args.length;
}.bind(pino);

pino.median = function(...args) {
  const f = this.a2f(args) || ((a, b) => a - b);
  args.sort(f);
  if (args.length % 2 === 0) {
    return (args[args.length / 2 - 1] + args[args.length / 2]) / 2;
  } else {
    return args[Math.floor(args.length / 2)];
  }
}.bind(pino);

pino.var = function(...args) {
  const mean = this.mean(...args);
  const sum = this.sum(...args.map(v => (v - mean) ** 2));
  return sum / args.length;
}.bind(pino);

pino.std = function(...args) {
  return Math.sqrt(this.var(...args));
}.bind(pino);

// ====== probability ======

pino.normal = function (u = 0, a = 1, size = 0) {
  throw new Error('like numpy.normal, but not implemented!');
}.bind(pino);
pino.normal.currying = pino.currying;

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
}.bind(pino);

pino.probability_table = function(...args) {
  const shuffle = this.a2f(args) || this.shuffle;
  const tab = [];
  for (const [value, count] of args) {
    for (let i = 0; i < count; i++) {
      tab.push(value);
    }
  }
  return shuffle(tab);
}.bind(pino);

pino.probability = function(...args) {
  let tab = [];
  let cur = 0;
  return (i, arr) => {
    if (cur >= tab.length) {
      tab = this.probability_table(...args);
      cur = 0;
    }
    const value = tab[cur++];
    return value && value.constructor === Function ? value(i, arr) : value;
  };
}.bind(pino);

pino.pick = function(...args) {
  args = args.flat();
  return args[this.uint() % args.length];
}.bind(pino);

pino.picks = function(count, ...args) {
  args = args.flat();
  const vals = [];
  for (let i = 0; i < count; i++) {
    const r = this.uint() % args.length;
    vals.push(args[r]);
    if (r === args.length - 1) {
      args.pop();
    } else {
      args[r] = args.pop();
    }
  }
  return vals;
}.bind(pino);

// ====== quick ======

pino.float = pino.number.currying({ min: MIN_INT, max: MAX_INT });

pino.float8 = pino.number.currying({ min: MIN_BYTE, max: MAX_BYTE });

pino.float16 = pino.number.currying({ min: MIN_SHORT, max: MAX_SHORT });

pino.float32 = pino.number.currying({ min: MIN_INT, max: MAX_INT });

pino.float64 = pino.number.currying({ min: MIN_BIGINT, max: MAX_BIGINT });

pino.ufloat = pino.number.currying({ min: 0, max: MAX_UINT });

pino.ufloat8 = pino.number.currying({ min: 0, max: MAX_UBYTE });

pino.ufloat16 = pino.number.currying({ min: 0, max: MAX_USHORT });

pino.ufloat32 = pino.number.currying({ min: 0, max: MAX_UINT });

pino.ufloat64 = pino.number.currying({ min: 0, max: MAX_UBIGINT });

pino.int = pino.number.currying({ min: MIN_INT, max: MAX_INT, decimal: 0 });

pino.int8 = pino.number.currying({ min: MIN_BYTE, max: MAX_BYTE, decimal: 0 });

pino.int16 = pino.number.currying({ min: MIN_SHORT, max: MAX_SHORT, decimal: 0 });

pino.int32 = pino.number.currying({ min: MIN_INT, max: MAX_INT, decimal: 0 });

pino.int64 = pino.number.currying({ min: MIN_BIGINT, max: MAX_BIGINT, decimal: 0 });

pino.uint = pino.number.currying({ min: 0, max: MAX_UINT, decimal: 0 });

pino.uint8 = pino.number.currying({ min: 0, max: MAX_UBYTE, decimal: 0 });

pino.uint16 = pino.number.currying({ min: 0, max: MAX_USHORT, decimal: 0 });

pino.uint32 = pino.number.currying({ min: 0, max: MAX_UINT, decimal: 0 });

pino.uint64 = pino.number.currying({ min: 0, max: MAX_UBIGINT, decimal: 0 });

// ====== providers ======

pino.register = function(name, method) {
  this[name] = method.bind(this);
  this[name].currying = this.currying;
}.bind(pino);

pino.locale = function(locale) {
  locale(pino);
}.bind(pino);

pino.locale(__webpack_require__(1));

// ====== Server fetch XMLHttpRequest ======

if (typeof window !== 'undefined') {

  // ====== Server ======

  const Server = __webpack_require__(11);

  pino.server = new Server();

  pino.use = pino.server.use.bind(pino.server);
  pino.get = pino.server.get.bind(pino.server);
  pino.post = pino.server.post.bind(pino.server);
  pino.put = pino.server.put.bind(pino.server);
  pino.delete = pino.server.delete.bind(pino.server);
  pino.route = pino.server.route.bind(pino.server);

  pino.servers = [pino.server];

  pino.addServer = function(server) {
    this.servers.push(server);
  }.bind(pino);

  pino.handle = async function(req) {
    for (const server of this.servers) {
      if (server.isHost(req.uri.host)) {
        return await server.handle(req);
      }
    }
    return false;
  }.bind(pino);

  pino.Server = Server;
  pino.Server.handle = pino.handle;

  // ====== fetch ======

  const fetch = __webpack_require__(12);

  pino.fetch = fetch;
  pino.fetch.handle = pino.handle;

  // ====== XMLHttpRequest ======

  const XMLHttpRequest = __webpack_require__(13);

  pino.XMLHttpRequest = XMLHttpRequest;
  pino.XMLHttpRequest.handle = pino.handle;

  pino.setup = function() {
    window.XMLHttpRequest = XMLHttpRequest;
    window.fetch = fetch;
  }.bind(pino);
}

// ====== export ======

module.exports = pino;


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

const address_countries = [
  "阿富汗", "阿拉斯加", "阿尔巴尼亚", "阿尔及利亚", "安道尔", "安哥拉", "安圭拉岛英", "安提瓜和巴布达",
  "阿根廷", "亚美尼亚", "阿鲁巴岛", "阿森松", "澳大利亚", "奥地利", "阿塞拜疆", "巴林", "孟加拉国",
  "巴巴多斯", "白俄罗斯", "比利时", "伯利兹", "贝宁", "百慕大群岛", "不丹", "玻利维亚", "波斯尼亚和黑塞哥维那",
  "博茨瓦纳", "巴西", "保加利亚", "布基纳法索", "布隆迪", "喀麦隆", "加拿大", "加那利群岛", "佛得角",
  "开曼群岛", "中非", "乍得", "智利", "圣诞岛", "科科斯岛", "哥伦比亚", "巴哈马国", "多米尼克国", "科摩罗",
  "刚果", "科克群岛", "哥斯达黎加", "克罗地亚", "古巴", "塞浦路斯", "捷克", "丹麦", "迪戈加西亚岛", "吉布提",
  "多米尼加共和国", "厄瓜多尔", "埃及", "萨尔瓦多", "赤道几内亚", "厄立特里亚", "爱沙尼亚", "埃塞俄比亚", "福克兰群岛",
  "法罗群岛", "斐济", "芬兰", "法国", "法属圭亚那", "法属波里尼西亚", "加蓬", "冈比亚", "格鲁吉亚", "德国", "加纳",
  "直布罗陀", "希腊", "格陵兰岛", "格林纳达", "瓜德罗普岛", "关岛", "危地马拉", "几内亚", "几内亚比绍", "圭亚那",
  "海地", "夏威夷", "洪都拉斯", "匈牙利", "冰岛", "印度", "印度尼西亚", "伊郎", "伊拉克", "爱尔兰", "以色列",
  "意大利", "科特迪瓦", "牙买加", "日本", "约旦", "柬埔塞", "哈萨克斯坦", "肯尼亚", "基里巴斯", "朝鲜", "韩国",
  "科威特", "吉尔吉斯斯坦", "老挝", "拉脱维亚", "黎巴嫩", "莱索托", "利比里亚", "利比亚", "列支敦士登", "立陶宛",
  "卢森堡", "马其顿", "马达加斯加", "马拉维", "马来西亚", "马尔代夫", "马里", "马耳他", "马里亚纳群岛", "马绍尔群岛",
  "马提尼克", "毛里塔尼亚", "毛里求斯", "马约特岛", "墨西哥", "密克罗尼西亚", "中途岛", "摩尔多瓦", "摩纳哥", "蒙古",
  "蒙特塞拉特岛", "摩洛哥", "莫桑比克", "缅甸", "纳米比亚", "瑙鲁", "尼泊尔", "荷兰", "荷属安的列斯群岛", "新喀里多尼亚群岛",
  "新西兰", "尼加拉瓜", "尼日尔", "尼日利亚", "纽埃岛", "诺福克岛", "挪威", "阿曼", "帕劳", "巴拿马", "巴布亚新几内亚",
  "巴拉圭", "秘鲁", "菲律宾", "波兰", "葡萄牙", "巴基斯坦", "波多黎各", "卡塔尔", "留尼汪岛", "罗马尼亚", "俄罗斯",
  "卢旺达", "东萨摩亚", "西萨摩亚", "圣马力诺", "圣皮埃尔岛及密克隆岛", "圣多美和普林西比", "沙特阿拉伯", "塞内加尔",
  "塞舌尔", "新加坡", "斯洛伐克", "斯洛文尼亚", "所罗门群岛", "索马里", "南非", "西班牙", "斯里兰卡", "圣克里斯托弗和尼维斯",
  "圣赫勒拿", "圣卢西亚", "圣文森特岛", "苏丹", "苏里南", "斯威士兰", "瑞典", "瑞士", "叙利亚", "塔吉克斯坦", "坦桑尼亚",
  "泰国", "阿拉伯联合酋长国", "多哥", "托克劳群岛", "汤加", "特立尼达和多巴哥", "突尼斯", "土耳其", "土库曼斯坦",
  "特克斯和凯科斯群岛", "图瓦卢", "美国", "乌干达", "乌克兰", "英国", "乌拉圭", "乌兹别克斯坦", "瓦努阿图",
  "梵蒂冈", "委内瑞拉", "越南", "维尔京群岛", "维尔京群岛和圣罗克伊", "威克岛", "瓦里斯和富士那群岛", "西撒哈拉",
  "也门", "南斯拉夫", "扎伊尔", "赞比亚", "桑给巴尔", "津巴布韦", "中华人民共和国", "中国",
];

const address_provinces = [
  "北京市", "上海市", "天津市", "重庆市",
  "内蒙古自治区", "山西省", "河北省", "吉林省", "江苏省", "辽宁省", "黑龙江省",
  "安徽省", "山东省", "浙江省", "江西省", "福建省", "湖南省", "湖北省",
  "河南省", "广东省", "广西壮族自治区", "贵州省", "海南省", "四川省", "云南省",
  "陕西省", "甘肃省", "宁夏回族自治区", "青海省", "新疆维吾尔自治区", "西藏自治区",
  "台湾省", "香港特别行政区", "澳门特别行政区",
];

const address_cities = [
  "北京", "上海", "天津", "重庆", "哈尔滨", "长春", "沈阳", "呼和浩特",
  "石家庄", "乌鲁木齐", "兰州", "西宁", "西安", "银川", "郑州", "济南", "太原",
  "合肥", "武汉", "长沙", "南京", "成都", "贵阳", "昆明", "南宁", "拉萨",
  "杭州", "南昌", "广州", "福州", "台北", "海口", "香港", "澳门", "通辽",
  "兴安盟", "太原", "辛集", "邯郸", "沈阳", "辽阳", "兴城", "北镇", "阜新",
  "哈尔滨", "齐齐哈尔", "淮安", "张家港", "海门", "六安", "巢湖", "马鞍山",
  "永安", "宁德", "嘉禾", "荆门", "潜江", "大冶", "宜都", "佛山", "深圳",
  "潮州", "惠州", "汕尾", "东莞", "梧州", "柳州", "合山", "六盘水", "关岭",
];

const address_districts = [
  "西夏", "永川", "秀英", "高港", "清城", "兴山", "锡山", "清河",
  "龙潭", "华龙", "海陵", "滨城", "东丽", "高坪", "沙湾", "平山",
  "城北", "海港", "沙市", "双滦", "长寿", "山亭", "南湖", "浔阳",
  "南长", "友好", "安次", "翔安", "沈河", "魏都", "西峰", "萧山",
  "金平", "沈北新", "孝南", "上街", "城东", "牧野", "大东",
  "白云", "花溪", "南山", "新城", "怀柔", "六枝特", "涪城",
  "清浦", "南溪", "淄川", "高明", "东城", "崇文", "朝阳", "大兴",
  "房山", "门头沟", "黄浦", "徐汇", "静安", "普陀", "闵行", "和平",
  "蓟州", "永川", "长寿", "璧山", "合川", "梁平", "丰都", "江北",
  "金水", '二七', '中原', '管城', '惠济', '高新', '经开', '郑东',
  '港区', '巩义', '上街', '荥阳', '中牟', '登封', '新密', '新郑',
];

const address_districts_suffixes = [
  '市', '区', '县',
];
    
const address_streets = [
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

const address_buildings = [
  "世贸大厦", "东方鼎盛中心", "中华大厦", "中原万达广场", "中国人保大厦", "中油新澳大厦",
  "中科金座", "五行嘉园", "亚新广场", "亚星SOHO国际", "企业壹号大厦", "传媒创意中心",
  "佳田国际广场", "兰德中心", "兴达国贸", "凯利大厦", "创艺中心", "升龙大厦", "升龙广场",
  "升龙环球大厦", "华林新时代广场", "名门国际中心", "商都世贸中心", "嘉亿东方大厦",
  "国家863中部软件园", "国家开发银行", "国泰财富中心", "国际商会大厦", "基正聚源国际",
  "天一大厦", "威斯顿广场", "宏光协和城邦", "广地和顺中心", "康桥商务广场", "建业凯旋广场",
  "建业总部港", "建正东方中心", "新芒果大厦", "方圆创世国际", "易元国际写字楼", "景峰国际",
  "格拉姆", "楷林IFC", "楷林中心", "楷林国际", "正商和谐大厦", "正商经开广场", "正岩大厦",
  "正岩铂兹中心", "民生银行大厦", "永和国际广场", "永和宇宙星写字楼", "浦发国际金融中心",
  "海赋国际写字楼", "瀚海璞丽中心", "王鼎国贸大厦写字楼", "王鼎国际", "盛润白宫",
  "科技财智名座", "立基上东国际", "绿地世纪峰会", "绿地中心千玺广场", "绿地之窗",
  "绿地原盛国际", "绿地峰会天下", "绿地新都会", "美侨世纪广场", "美盛中心", "联合中心大厦",
  "苏荷中心", "行署国际广场", "裕鸿国际", "豫航中心", "财信大厦", "绿地中心", "金城国贸",
  "金成东方国际", "金成时代广场写字楼", "龙湖大厦", "兴业大厦", "雅宝东方国际",
  "顺驰第一国际", "领秀国际中心",  
];

const address_buildings_units = [
  'A座', 'B座', 'C座', 'D座', 'E座', 'F座',
];

const address_communities = [
  "一处庭院", "七里香堤", "万龙花园", "世茂云尚城", "世豪小公馆", "东城花园", "东文雅小区",
  "东方梦园", "东润泰和", "东瑞佳苑", "中建文苑", "中方园", "中海锦苑", "中联花园", "中鼎花园",
  "丰乐花苑", "丰庆佳苑", "丰庆华府", "丽水人家", "九锦台", "京广花园", "人和花园", "亿安花园",
  "伍号院", "佳河园", "佳苑小区", "假日蓝湾", "关虎屯小区", "兴达公寓", "冯庄小区", "凤凰台花园",
  "凤凰苑", "北云鹤花园", "北晨颐商苑", "北苑家园", "升龙玺园", "华园华庭", "华瑞紫薇苑",
  "博瑞盛和苑", "原田花园", "发展南郡", "可乐公寓", "呈祥花园", "商城花园", "嘉佰丽园", "嘉和园",
  "嘉瑞园", "嘉秀园", "嘉辰丽景苑", "嘉辰时代公寓", "四季花城", "四月天", "国泰一品庄园",
  "国泰罗马假日", "国贸新领地", "国贸酒店公寓", "国鑫小时代", "圣菲城", "城南春天", "城市之星",
  "外商公寓", "天伦水晶城", "天擎花园", "天福苑", "太极公馆", "奥兰和园", "安泰嘉园", "宏达花苑",
  "宏都花园", "家和万世家园", "富邦铭邸", "山顶御金城", "广兴航海花城", "康华苑小区", "康宁居",
  "康普新巷", "康桥康城", "康桥悦岛", "建业香槟圣园", "御府三号", "恒升家园", "恒升府第",
  "惠工小区", "数码公寓", "文化绿城", "文华苑", "文博公寓", "文博名门", "文博花园", "文雅小区",
  "文雅新世界", "方圆创世", "时代骏庭", "明天花园", "明辉小区", "朝阳小区", "未来丽景苑",
  "未来和枫苑", "核勘苑", "梦苑小区", "森林阳光花园", "橄榄城新公馆", "橡树玫瑰城", "正商中州城",
  "正商创富欣城", "正商华钻", "正商城", "正商幸福港湾", "正商新蓝钻", "正弘蓝堡湾", "正馨花园",
  "民安尚郡", "永丰心座", "永丰新城", "永丰新都", "永威城", "永恒亲亲家园", "永恒理想世界",
  "汇宝花园", "汉飞城市公园", "江山名典", "河畔人家", "泰宏建业国际城", "泰山誉景", "海轮城市风铃",
  "海通苑", "清华紫光园", "源升府邻竹园", "源升金锣湾", "滨河花园", "瀚海思念城", "瀚海泰苑",
  "琥珀名城", "百草园", "盈家美地", "益兴花园", "盛润小城之春", "碧桂园天麓", "紫东苑", "紫云小区",
  "紫南花园", "紫域云庭", "紫燕华庭", "紫竹小区", "紫竹轩", "紫荆小区", "紫荆苑", "紫荆阳光地带",
  "紫薇小区", "紫藤苑", "紫金城", "红楼易居", "维也纳森林", "绿云都市家园", "绿洲云顶", "绿洲花园",
  "绿洲银郡", "绿都紫荆华庭", "美景美境", "美景花郡", "美盛教育港湾", "翠和园", "翠园锦荣世家",
  "翡丽公馆", "联创佳苑", "联合家园", "联合花园", "联合雅园", "舒馨花园", "花半里", "花都港湾",
  "苗圃小区", "英地天骄华庭", "裕华文桂园", "裕鸿花园", "西里小区", "豫新公寓", "豫港花苑",
  "远征都市花园", "通利紫荆尚都", "郁金香苑", "都市花园", "都市铭座", "金印现代城", "金印阳光城",
  "金晨嘉园", "金桂苑", "金桥小区", "金水万达", "金祥花园", "金誉良苑", "金领寓", "鑫苑世家",
  "鑫苑国际新城", "锦华苑", "锦艺新时代", "阳光铭座", "陇东小区", "陇海里小区", "隆达小区",
  "雅美新居", "集业小区", "青年居易", "青秀佳苑", "香桔市", "龙源世纪龙城",
];

function country() {
  return this.pick(address_countries);
}

function province() {
  return this.pick(address_provinces);
}

function city_name() {
  return this.pick(address_cities);
}

function city_suffix() {
  return '市';
}

function city() {
  return this.pick(address_cities) + '市';
}

function district_name() {
  return this.pick(address_districts);
}

function district_suffix() {
  return this.pick(address_districts_suffixes);
}

function district() {
  return this.pick(address_districts) + this.pick(address_districts_suffixes);
}

function street_name() {
  return this.pick(address_streets);
}

function street_number() {
  return this.uint({ min: 1, max: 366 }) + '号';
}

function street() {
  return this.pick(address_streets) + this.street_number();
}

function building_name() {
  return this.pick(address_buildings);
}

function building_unit() {
  return this.pick(address_buildings_units);
}

function building_number() {
  return this.uint({ min: 1, max: 31 }) + this.uint({ min: 1, max: 31 }).toString().padStart(2, 0) + '室';
}

function building() {
  return this.pick(address_buildings) + this.pick(address_buildings_units) + this.building_number();
}

function community_name() {
  return this.pick(address_communities);
}

function community_unit() {
  return this.uint({ min: 1, max: 7 }) + '号楼' + this.uint({ min: 1, max: 4 }) + '单元';
}

function community_number() {
  return this.uint({ min: 1, max: 21 }) + '楼' + this.uint({ min: 1, max: 121 }) + '号';
}

function community() {
  return this.pick(address_communities) + this.community_unit() + this.community_number();
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
  return this.int({ min: 100000, max: 999999 });
}

module.exports = function(pino) {
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

const automotive_provinces = {
  "北京": "京", "天津": "津", "河北": "冀", "山西": "晋", "内蒙": "蒙",
  "辽宁": "辽", "吉林": "吉", "黑龙": "黑", "上海": "沪", "江苏": "苏",
  "浙江": "浙", "安徽": "皖", "福建": "闽", "江西": "赣", "山东": "鲁",
  "河南": "豫", "湖北": "鄂", "湖南": "湘", "广东": "粤", "广西": "桂",
  "海南": "琼", "重庆": "渝", "四川": "川", "贵州": "贵", "云南": "云",
  "西藏": "藏", "陕西": "陕", "甘肃": "甘", "青海": "青", "宁夏": "宁",
  "新疆": "新",
};

const automotive_names = [
  "京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏", "浙", "皖",
  "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "桂", "琼", "渝", "川", "贵",
  "云", "藏", "陕", "甘", "青", "宁", "新",
];

function license_plate(province = null, city = null) {
  let license_plate = '';
  if (province && province.substr(0, 2) in automotive_provinces) {
    license_plate += automotive_provinces[province.substr(0, 2)];
  } else if (province) {
    license_plate += province;
  } else {
    license_plate += this.pick(automotive_names);
  }
  license_plate += city ? city : this.string({ len: 1, chars: 'ABCDEFGHJKLMNPQRSTUVWXYZ' });
  license_plate += this.string({ len: 5, chars: 'ABCDEFGHJKLMNPQRSTUVWXYZ01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' });
  return license_plate;
}

module.exports = function(pino) {
  pino.register('license_plate', license_plate);
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const color_names = [
  "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", 
  "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", 
  "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", 
  "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", 
  "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", 
  "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", 
  "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", 
  "Feldspar", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", 
  "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "HoneyDew", 
  "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", 
  "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", 
  "LightGoldenRodYellow", "LightGrey", "LightGreen", "LightPink", "LightSalmon", 
  "LightSeaGreen", "LightSkyBlue", "LightSlateBlue", "LightSlateGray", 
  "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", 
  "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", 
  "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", 
  "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", 
  "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", 
  "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", 
  "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", 
  "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", 
  "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", 
  "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", 
  "Violet", "VioletRed", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen", 
];

function color_name() {
  return this.pick(color_names);
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
  let r = 0, g = 0, b = 0, a = Math.random().toFixed(2);
  while (true) {
    r = this.uint8();
    g = this.uint8();
    b = this.uint8();
    if (this.is_colorful(r, g, b, diff)) {
      return [r, g, b, a];
    }
  }
}

function colorful(diff = 160) {
  const [r, g, b] = this.random_colorful(diff);
  return `#${r.toString(16).padStart(2, 0)}${g.toString(16).padStart(2, 0)}${b.toString(16).padStart(2, 0)}`;
}

function hex_colorful(diff = 160) {
  const [r, g, b] = this.random_colorful(diff);
  return `#${r.toString(16).padStart(2, 0)}${g.toString(16).padStart(2, 0)}${b.toString(16).padStart(2, 0)}`;
}

function rgb_colorful(diff = 160) {
  const [r, g, b] = this.random_colorful(diff);
  return `rgb(${r},${g},${b})`;
}

function rgba_colorful(diff = 160) {
  const [r, g, b, a] = this.random_colorful(diff);
  return `rgba(${r},${g},${b},${a})`;
}

module.exports = function(pino) {
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

// const pinyin = require('node-pinyin');

const company_names = [
  "超艺", "和泰", "九方", "鑫博", '腾飞', "戴硕", "亿次元",
  "海创", "创联世纪", "凌云", "泰麒麟", "彩虹", "兰金",
  "晖来", "天益", "恒聪百汇", "菊风", "惠派", '宇通',
  "创汇", "思优", "时空盒数字", "易动力", "飞海", "华泰通安",
  "盟新", "商软冠联", "图龙信息", "易动力", "华远软件", "创亿",
  "时刻", "世创", "明腾", "良诺", "天开", "毕博诚", "快讯",
  "凌颖信息", "黄石金承", "恩悌", "雨林木风", "双敏",
  "维旺明", "网新恒天", "铭泰", "飞利信", "立信", "联通时科",
  "建业", "新格林耐特", "宇龙", "浙大万朋", "讯飞", '太能',
  "昂歌", "万迅", "方正", "联软", "七喜", "南康", "银嘉",
  "巨奥", "佳禾", "国讯", "信诚致远", "浦华众城", "迪摩", "太极",
  "群英", "合联", "同兴万点", "博凯", "精芯", "艾提科信",
  "昊嘉", "鸿睿思博", "四通", "富罳", "商软冠联", "诺依曼",
  "东方峻景", "华成育卓", "趋势", "维涛", "通际名联", '五菱',
];

// console.log(JSON.stringify(company_names.map(v => pinyin(v, { style: 'normal' }).flat().join(''))));
const company_names_pinyin = [
  "chaoyi", "hetai", "jiufang", "xinbo", "tengfei", "daishuo", "yiciyuan",
  "haichuang", "chuanglianshiji", "lingyun", "taiqilin", "caihong",
  "lanjin", "huilai", "tianyi", "hengcongbaihui", "jufeng", "huipai",
  "yutong", "chuanghui", "siyou", "shikongheshuzi", "yidongli", "feihai",
  "huataitongan", "mengxin", "shangruanguanlian", "tulongxinxi", "yidongli",
  "huayuanruanjian", "chuangyi", "shike", "shichuang", "mingteng",
  "liangnuo", "tiankai", "bibocheng", "kuaixun", "lingyingxinxi",
  "huangshijincheng", "enti", "yulinmufeng", "shuangmin", "weiwangming",
  "wangxinhengtian", "mingtai", "feilixin", "lixin", "liantongshike",
  "jianye", "xingelinnaite", "yulong", "zhedawanpeng", "xunfei", "taineng",
  "angge", "wanxun", "fangzheng", "lianruan", "qixi", "nankang", "yinjia",
  "juao", "jiahe", "guoxun", "xinchengzhiyuan", "puhuazhongcheng", "dimo",
  "taiji", "qunying", "helian", "tongxingwandian", "bokai", "jingxin",
  "aitikexin", "haojia", "hongruisibo", "sitong", "fusi", "shangruanguanlian",
  "nuoyiman", "dongfangjunjing", "huachengyuzhuo", "qushi", "weitao",
  "tongjiminglian", "wuling",
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
  return`${this.city_name()}${this.pick(company_names)}${this.pick(company_types)}${this.pick(company_suffixes)}`;
}

function company_short() {
  return`${this.pick(company_names)}${this.pick(company_types)}`;
}

module.exports = function(pino) {
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
    for (const [_, number, unit] of expr.toLowerCase().matchAll(/([+-]\d+)([ymdhis])/g)) {
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

function date(...args) {
  const def = {
    start: 0,
    end: 4294967295000,
    format: 'y-m-d h:i:s',
  };
  const conf = Object.assign({}, def, ...args);
  conf.start = this.date_expr(conf.start);
  conf.end = this.date_expr(conf.end);
  return this.date_format(new Date(this.int({ min: conf.start.getTime(), max: conf.end.getTime() })), conf.format);
}

module.exports = function(pino) {
  pino.register('date_expr', date_expr);
  pino.register('date_format', date_format);
  pino.register('date', date);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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
    if (false) {}
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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const internet_free_email_domains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  '163.com', '126.com', 'yeah.net', 'qq.com', 'foxmail.com',
  'sina.com.cn', 'sohu.com', 
];

const internet_protocols = [
  'http', 'https',
];

const internet_tlds = [
  'com', 'net', 'cn', 'com.cn', 'net.cn',
];

const internet_hosts = [
  'www', 'www', 'www', 'www', 'oa', 'mail', 'email', 'disk', 'im', 'data', 'file',
];

const internet_url_paths = [
  'app', 'main', 'wp-content', 'search', 'category', 'tag', 'categories',
  'tags', 'blog', 'posts', 'list', 'explore',
];

const internet_url_pages = [
  'index', 'home', 'search', 'main', 'post', 'homepage', 'category',
  'register', 'login', 'faq', 'about', 'terms', 'privacy', 'author',
];

const internet_url_extensions = [
  'html', 'htm', 'php', 'jsp', 'asp',
];

function domain_tld() {
  return this.pick(internet_tlds);
}

function domain_name(domain_name = null) {
  return domain_name || this.string({ len: 8, chars: 'abcdefghijklmnopqrstuvwxy' });
}

function domain_host() {
  return this.pick(internet_hosts);;
}

function domain(domain_name = null) {
  return `${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function hostname(domain_name = null) {
  return `${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function free_email_domain() {
  return this.pick(internet_free_email_domains);
}

function free_email() {
  return `${this.name_pinyin()}@${this.pick(internet_free_email_domains)}`;
}

function company_email_domain() {
  return `${this.company_name_pinyin()}.${this.pick(internet_tlds)}`;
}

function company_email() {
  return `${this.name_pinyin()}@${this.company_name_pinyin()}.${this.pick(internet_tlds)}`;
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
  return this.pick(internet_protocols);
}

function site(domain_name = null) {
  return `${this.protocal()}://${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function url_path(depth = 2) {
  return '/' + this.range(depth, () => this.pick(internet_url_paths)).join('/');
}

function url_page() {
  return this.pick(internet_url_pages);
}

function url_extension() {
  return this.pick(internet_url_extensions);
}

function url(domain_name = null) {
  return `${this.site(domain_name)}${this.url_path()}/${this.url_page()}.${this.url_extension()}`;
}

module.exports = function(pino) {
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

const lorem_words = [
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
  return this.pick(lorem_words);
}

function text(len = 200) {
  const proba = this.probability(['，', 8], ['。', 2]);
  let text = '';
  while(text.length < len) {
    text += this.range(this.int({ min: 3, max: 9 }), this.word).join('') + proba();
  }
  return text.substr(0, len - 1) + '。';
}

module.exports = function(pino) {
  pino.register('word', word);
  pino.register('text', text);
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// const pinyin = require('node-pinyin');

const person_last_names = [
  '丁', '万', '严', '丰', '乌', '乐', '乔', '于', '云', '井', '付', '代', '仲',
  '任', '伍', '伦', '何', '余', '侧', '侯', '俞', '倪', '傅', '元', '光', '关',
  '冬', '冯', '冷', '刀', '刁', '刘', '刚', '区', '半', '华', '单', '卜', '卢',
  '古', '可', '叶', '后', '吕', '含', '吴', '周', '呼', '和', '咏', '品', '哏',
  '唐', '回', '坤', '夏', '多', '夜', '大', '奇', '姜', '威', '孔', '孙', '孟',
  '宁', '宇', '安', '宋', '官', '宥', '家', '寐', '尤', '尧', '尹', '屠', '岳',
  '崔', '川', '左', '巫', '常', '平', '应', '庞', '康', '庾', '廖', '张', '弦',
  '張', '彭', '徐', '德', '恒', '恩', '恭', '慕', '成', '戴', '房', '承', '拳',
  '文', '方', '施', '易', '星', '春', '晃', '晨', '景', '暴', '曲', '曹', '曾',
  '朱', '朴', '权', '李', '杜', '杨', '林', '枫', '柯', '柳', '桑', '梁', '梨',
  '樊', '欧', '残', '殷', '毕', '毛', '民', '永', '江', '汤', '汪', '沈', '沙',
  '河', '波', '泽', '洗', '洪', '派', '浩', '海', '渔', '温', '游', '满', '漠',
  '潘', '澎', '火', '炎', '烧', '焦', '熊', '牙', '牛', '狗', '猪', '王', '甘',
  '田', '甲', '白', '皓', '石', '祁', '祝', '秀', '秦', '程', '窦', '立', '童',
  '笑', '符', '简', '精', '纪', '绪', '罗', '羽', '翁', '老', '肖', '胖', '胜',
  '胡', '腾', '臧', '艺', '艾', '芮', '苏', '苟', '范', '荒', '莫', '萧', '葛',
  '董', '蒋', '蒙', '蓝', '蔡', '薛', '藏', '蛋', '袁', '覃', '言', '誓', '许',
  '谢', '谭', '贰', '费', '贺', '贾', '赖', '赵', '路', '车', '辛', '过', '迟',
  '邓', '邝', '邰', '邱', '郁', '郎', '郑', '郝', '郭', '酷', '释', '金', '钟',
  '钦', '钮', '镐', '闫', '阎', '阚', '阮', '阳', '阿', '陆', '陈', '陶', '雨',
  '雷', '霍', '韦', '韩', '顾', '颜', '饶', '馒', '马', '骆', '高', '魏', '鲁',
  '鲍', '鸿', '鹏', '鹿', '麦', '黄', '黎', '黑', '齐', '龙',
];

// console.log(JSON.stringify(person_last_names.map(v => pinyin(v, { style: 'normal' }).flat().join(''))));
const person_last_names_pinyin = [
  "ding", "wan", "yan", "feng", "wu", "le", "qiao", "yu", "yun", "jing", "fu",
  "dai", "zhong", "ren", "wu", "lun", "he", "yu", "ce", "hou", "yu", "ni",
  "fu", "yuan", "guang", "guan", "dong", "feng", "leng", "dao", "diao", "liu",
  "gang", "qu", "ban", "hua", "dan", "bu", "lu", "gu", "ke", "ye", "hou",
  "lv", "han", "wu", "zhou", "hu", "he", "yong", "pin", "gen", "tang", "hui",
  "kun", "xia", "duo", "ye", "da", "qi", "jiang", "wei", "kong", "sun","meng",
  "ning", "yu", "an", "song", "guan", "you", "jia", "mei", "you", "yao", "yin",
  "tu", "yue", "cui", "chuan", "zuo", "wu", "chang", "ping", "ying", "pang",
  "kang", "yu", "liao", "zhang", "xian", "zhang", "peng", "xu", "de", "heng",
  "en", "gong", "mu", "cheng", "dai", "fang", "cheng", "quan", "wen", "fang",
  "shi", "yi", "xing", "chun", "huang", "chen", "jing", "bao", "qu", "cao",
  "zeng", "zhu", "pu", "quan", "li", "du", "yang", "lin", "feng", "ke", "liu",
  "sang", "liang", "li", "fan", "ou", "can", "yin", "bi", "mao", "min", "yong",
  "jiang", "tang", "wang", "shen", "sha", "he", "bo", "ze", "xi", "hong",
  "pai", "hao", "hai", "yu", "wen", "you", "man", "mo", "pan", "peng", "huo",
  "yan", "shao", "jiao", "xiong", "ya", "niu", "gou", "zhu", "wang", "gan",
  "tian", "jia", "bai", "hao", "shi", "qi", "zhu", "xiu", "qin", "cheng",
  "dou", "li", "tong", "xiao", "fu", "jian", "jing", "ji", "xu", "luo", "yu",
  "weng", "lao", "xiao", "pang", "sheng", "hu", "teng", "zang", "yi", "ai",
  "rui", "su", "gou", "fan", "huang", "mo", "xiao", "ge", "dong", "jiang",
  "meng", "lan", "cai", "xue", "cang", "dan", "yuan", "tan", "yan", "shi",
  "xu", "xie", "tan", "er", "fei", "he", "gu", "lai", "zhao", "lu", "che",
  "xin", "guo", "chi", "deng", "kuang", "tai", "qiu", "yu", "lang", "zheng",
  "hao", "guo", "ku", "shi", "jin", "zhong", "qin", "niu", "gao", "yan", "yan",
  "kan", "ruan", "yang", "a", "lu", "chen", "tao", "yu", "lei", "huo", "wei",
  "han", "gu", "yan", "rao", "man", "ma", "luo", "gao", "wei", "lu", "bao",
  "hong", "peng", "lu", "mai", "huang", "li", "hei", "qi", "long",
];

const person_first_names_male = [
  '宇澄', '子鸣', '势安', '文乐', '通', '福助', '战', '凌诺', '明学', '少翌', '泉',
  '兆骏', '建年', '暐议', '敬基', '英华', '家辉', '瀚中', '煌奇', '乐', '炜', '岳',
  '中基', '志强', '镜清', '雅森', '海泉', '圣文', '智民', '小源', '佳界', '欣',
  '克群', '国锋', '斯楞', '伟', '言', '镇涛', '安东', '俊凯', '绍洋', '牛', '鸿明',
  '振东', '国祥', '腾', '铭捷', '志辉', '智钦', '利', '家凯', '文聪', '魏西',
  '晨宇', '仔', '德豪', '云', '文军', '宗沛', '苏羽', '云鹏', '泊', '小骚', '志文',
  '冠宇', '明志', '保怡', '光', '喆', '东', '宇中', '常胜', '明育', '潮', '威煌',
  '阳', '涛', '雨阳', '一鸣', '亚纶', '力行', '静晨', '浩然', '宾', '励林', '洪刚',
  '洛洛', '键', '挺', '怀静', '乃麟', '澄庆', '逸晨', '未央', '之谦', '海啸',
  '家成', '娃', '珏', '子韬', '格叶', '寅', '祖名', '惟仁', '浩康', '罡', '东君',
  '方圆', '国豪', '旻佑', '晰', '明洋', '志健', '吉汉', '哲明', '盛强', '鲲',
  '国丰', '子洋', '振棠', '继聪', '江', '崇正', '琥', '熙水', '张伟', '图', '中平',
  '德钟', '汉声', '敦豪', '继铃', '承光', '识贤', '晋豪', '协志', '治平', '川晖',
  '启田', '胜', '汤豪', '畊宏', '江龙', '文森', '天朔', '志安', '岳庭', '韶声',
  '云迪', '坤', '气', '建祥', '大佑', '旭东', '洛宾', '宇威', '尚实', '泳毅',
  '嘉强', '天华', '依轮', '铮亮', '晓峰', '家强', '宏伟', '山亮', '启贤', '信哲',
  '浚伟', '艺兴', '虔哲', '春兮', '冠廷', '唯', '云霄', '过年', '浩贤', '晓宇',
  '永康', '国荣', '子冈', '世超', '允谦', '杨', '源', '琪力', '武贝', '少聪',
  '东阳', '冠蒲', '山', '哥亮', '学友', '来宁', '时丰', '恺蔚', '自强', '航生',
  '思诚', '品超', '宥嘉', '晟铭', '萌萌', '品源', '光平', '岗山', '赫宣', '明章',
  '晓', '昕阳', '志祥', '思远', '志光', '卓羲', '若权', '嘉尔', '剑辉', '义达',
  '国敬', '程明', '智成', '明', '明瀚', '文程', '紫骅', '猫', '一杰', '远喆', '晨',
  '嘉颖', '庚', '毅鹏', '志浩', '仕伟', '善为', '提', '不易', '恕权','若昀', '爽',
  '琪', '圣', '睿', '臣刚', '宗泽', '浚龙', '尊', '正宵', '桓宇', '卫健',
];

// console.log(JSON.stringify(person_first_names_male.map(v => pinyin(v, { style: 'normal' }).flat().join(''))));
const person_first_names_male_pinyin = [
  "yucheng", "ziming", "shian", "wenle", "tong", "fuzhu", "zhan", "lingnuo",
  "mingxue", "shaoyi", "quan", "zhaojun", "jiannian", "weiyi", "jingji", "yinghua",
  "jiahui", "hanzhong", "huangqi", "le", "wei", "yue", "zhongji", "zhiqiang",
  "jingqing", "yasen", "haiquan", "shengwen", "zhimin", "xiaoyuan", "jiajie",
  "xin", "kequn", "guofeng", "sileng", "wei", "yan", "zhentao", "andong", "junkai",
  "shaoyang", "niu", "hongming", "zhendong", "guoxiang", "teng", "mingjie",
  "zhihui", "zhiqin", "li", "jiakai", "wencong", "weixi", "chenyu", "zi", "dehao",
  "yun", "wenjun", "zongpei", "suyu", "yunpeng", "bo", "xiaosao", "zhiwen",
  "guanyu", "mingzhi", "baoyi", "guang", "zhe", "dong", "yuzhong", "changsheng",
  "mingyu", "chao", "weihuang", "yang", "tao", "yuyang", "yiming", "yalun", "lihang",
  "jingchen", "haoran", "bin", "lilin", "honggang", "luoluo", "jian", "ting",
  "huaijing", "nailin", "chengqing", "yichen", "weiyang", "zhiqian", "haixiao",
  "jiacheng", "wa", "jue", "zitao", "geye", "yin", "zuming", "weiren", "haokang",
  "gang", "dongjun", "fangyuan", "guohao", "minyou", "xi", "mingyang", "zhijian",
  "jihan", "zheming", "shengqiang", "kun", "guofeng", "ziyang", "zhentang", "jicong",
  "jiang", "chongzheng", "hu", "xishui", "zhangwei", "tu", "zhongping", "dezhong",
  "hansheng", "dunhao", "jiling", "chengguang", "shixian", "jinhao", "xiezhi",
  "zhiping", "chuanhui", "qitian", "sheng", "tanghao", "genghong", "jianglong",
  "wensen", "tianshuo", "zhian", "yueting", "shaosheng", "yundi", "kun", "qi",
  "jianxiang", "dayou", "xudong", "luobin", "yuwei", "shangshi", "yongyi",
  "jiaqiang", "tianhua", "yilun", "zhengliang", "xiaofeng", "jiaqiang", "hongwei",
  "shanliang", "qixian", "xinzhe", "junwei", "yixing", "qianzhe", "chunxi",
  "guanting", "wei", "yunxiao", "guonian", "haoxian", "xiaoyu", "yongkang",
  "guorong", "zigang", "shichao", "yunqian", "yang", "yuan", "qili", "wubei",
  "shaocong", "dongyang", "guanpu", "shan", "geliang", "xueyou", "laining",
  "shifeng", "kaiwei", "ziqiang", "hangsheng", "sicheng", "pinchao", "youjia",
  "shengming", "mengmeng", "pinyuan", "guangping", "gangshan", "hexuan", "mingzhang",
  "xiao", "xinyang", "zhixiang", "siyuan", "zhiguang", "zhuoxi", "ruoquan", "jiaer",
  "jianhui", "yida", "guojing", "chengming", "zhicheng", "ming", "minghan", "wencheng",
  "zihua", "mao", "yijie", "yuanzhe", "chen", "jiaying", "geng", "yipeng", "zhihao",
  "shiwei", "shanwei", "ti", "buyi", "shuquan", "ruoyun", "shuang", "qi", "sheng",
  "rui", "chengang", "zongze", "junlong", "zun", "zhengxiao", "huanyu", "weijian",
];

const person_first_names_female = [
  '依依', '小云', '艳泓', '珂', '泱', '雁诗', '子萱', '萱', '瑞兮', '妃平', '慧君',
  '姿彤', '伟苓', '梅', '卓妍', '熹蛮', '雅洁', '婧祎', '芳', '绮', '秋凤', '淑怡',
  '晓玫', '文煜', '丽颖', '敏莉', '璐', '颂茹', '德玛', '灵', '提莫', '蕊', '豆',
  '悄', '小笛', '妙玲', '格玛', '卡措', '玟岐', '之璧', '戴', '芮', '婕', '姗',
  '美', '莎', '美惠', '秀琳', '瞳', '悸', '乐诗', '柏芝', '烧', '瑶', '汐', '怡文',
  '姝', '丹', '子姗', '莎莎', '晓彤', '雪', '小敏', '湫泓', '鸟', '湘婷', '诗诗',
  '小熊', '洛菲', '明真', '人凤', '奂均', '笔畅', '诗钦', '冰冰', '安琪', '晴',
  '海英', '梵溪', '珣', '文慧', '依纯', '虹', '佳薇', '译贤', '郁', '欣潼', '妍熙',
  '小妞', '安咛', '小兜', '筱蓉', '洋', '倩莲', '美辰', '美美', '文珣', '明娟',
  '依婷', '凝', '凌', '兮', '安禹', '韵', '洛施', '湘怡', '芬兰', '蕙玲', '芷蕾',
  '清', '世哲', '希儿', '英苹', '震', '若溪', '三', '佩雯', '思涵', '倩敏', '桑',
  '洁丽', '欣欣', '娅', '梦园', '海俏', '碧晨', '馨', '兴瑜', '至贤', '倩倩',
  '艺纱', '文欣', '小芹', '家妹', '海', '嘉莹', '润洁', '熙', '琰', '子宜', '宁',
  '采洁', '思慧', '妙可', '小平', '韦伶', '籁天', '爽', '璐岢', '左左', '线',
  '菲儿', '晨唏', '霄雲', '小花', '曦', '小皮', '心瑶', '美麟', '彤', '松韵',
  '僖仪', '池', '袁', '诗芸', '光', '蕙兰', '琼之', '洁', '芷昀', '玉卿', '雨霏',
  '百何', '杨林', '淳佳', '凌霞', '乃文', '梦妮', '燊悦', '辛尉', '宝如', '丽莎',
  '妞', '淑娜', '倩玉', '桐舟', '思函', '雪琳', '绮贞', '雨轩', '二妮',  '怡萍',
  '雨欣', '维维', '燕妮', '凡', '菲菲', '以轩', '咏琪', '幂', '霄云', '子曼',
  '嘉丽', '浠', '荭菲', '侃', '亚', '诗安', '纯如', '红', '羽幽', '薇', '欢',
  '馥甄', '毓芬', '洁仪', '静音', '凯琳', '钰琪', '海玲', '美满', '婉婷', '霞',
  '旭方', '小霞', '毛', '临', '贝', '姗姗', '娟儿', '婉莹', '笙', '秋华', '宝珠',
  '仲薇', '蕾', '海媚', '斯华', '雯婕', '二汶', '洁文', '子月', '又琪', '祖英',
  '俐婷', '晓楠', '路得', '芯瑜', '琬婷', '殊', '玥菲', '艺娜', '汶', '佳明',
  '千雅', '逸璇', '靖姗', '茜',
];

// console.log(JSON.stringify(person_first_names_female.map(v => pinyin(v, { style: 'normal' }).flat().join(''))));
const person_first_names_female_pinyin = [
  "yiyi", "xiaoyun", "yanhong", "ke", "yang", "yanshi", "zixuan", "xuan", "ruixi",
  "feiping", "huijun", "zitong", "weiling", "mei", "zhuoyan", "ximan", "yajie",
  "jingyi", "fang", "qi", "qiufeng", "shuyi", "xiaomei", "wenyu", "liying", "minli",
  "lu", "songru", "dema", "ling", "timo", "rui", "dou", "qiao", "xiaodi", "miaoling",
  "gema", "qiacuo", "minqi", "zhibi", "dai", "rui", "jie", "shan", "mei", "suo",
  "meihui", "xiulin", "tong", "ji", "leshi", "baizhi", "shao", "yao", "xi", "yiwen",
  "shu", "dan", "zishan", "suosuo", "xiaotong", "xue", "xiaomin", "qiuhong", "niao",
  "xiangting", "shishi", "xiaoxiong", "luofei", "mingzhen", "renfeng", "huanjun",
  "bichang", "shiqin", "bingbing", "anqi", "qing", "haiying", "fanxi", "xun",
  "wenhui", "yichun", "hong", "jiawei", "yixian", "yu", "xintong", "yanxi", "xiaoniu",
  "anning", "xiaodou", "xiaorong", "yang", "qianlian", "meichen", "meimei", "wenxun",
  "mingjuan", "yiting", "ning", "ling", "xi", "anyu", "yun", "luoshi", "xiangyi",
  "fenlan", "huiling", "zhilei", "qing", "shizhe", "xier", "yingping", "zhen", "ruoxi",
  "san", "peiwen", "sihan", "qianmin", "sang", "jieli", "xinxin", "ya", "mengyuan",
  "haiqiao", "bichen", "xin", "xingyu", "zhixian", "qianqian", "yisha", "wenxin",
  "xiaoqin", "jiamei", "hai", "jiaying", "runjie", "xi", "yan", "ziyi", "ning",
  "caijie", "sihui", "miaoke", "xiaoping", "weiling", "laitian", "shuang", "luke",
  "zuozuo", "xian", "feier", "chenxi", "xiaoyun", "xiaohua", "xi", "xiaopi", "xinyao",
  "meilin", "tong", "songyun", "xiyi", "chi", "yuan", "shiyun", "guang", "huilan",
  "qiongzhi", "jie", "zhiyun", "yuqing", "yufei", "baihe", "yanglin", "chunjia",
  "lingxia", "naiwen", "mengni", "shenyue", "xinwei", "baoru", "lisuo", "niu", "shuna",
  "qianyu", "tongzhou", "sihan", "xuelin", "qizhen", "yuxuan", "erni", "yiping",
  "yuxin", "weiwei", "yanni", "fan", "feifei", "yixuan", "yongqi", "mi", "xiaoyun",
  "ziman", "jiali", "xi", "hongfei", "kan", "ya", "shian", "chunru", "hong", "yuyou",
  "wei", "huan", "fuzhen", "yufen", "jieyi", "jingyin", "kailin", "yuqi", "hailing",
  "meiman", "wanting", "xia", "xufang", "xiaoxia", "mao", "lin", "bei", "shanshan",
  "juaner", "wanying", "sheng", "qiuhua", "baozhu", "zhongwei", "lei", "haimei",
  "sihua", "wenjie", "erwen", "jiewen", "ziyue", "youqi", "zuying", "liting", "xiaonan",
  "lude", "xinyu", "wanting", "shu", "yuefei", "yina", "wen", "jiaming", "qianya",
  "yixuan", "jingshan", "qian",
];

const person_jobs = [
  '客户关系经理/主管', '化妆品研发', '仓库经理/主管', '运动健身', '综合业务专员', '审核员',
  '市场/营销/拓展经理', '调墨技师', '飞机维修机械师', '网页设计/制作/美工', '房地产项目招投标',
  '医药招商', 'CNC工程师', '医疗器械销售代表', '学徒工', '语音/视频/图形开发工程师', '造纸研发',
  '供应链经理', '房地产项目/策划经理', '包装设计', '信息技术专员', '医疗器械研发',
  '实验室负责人/工程师', '专柜彩妆顾问(BA)', '高级客户经理/客户经理', '变压器与磁电工程师',
  '游戏界面设计师', '市场通路经理/主管', '美发店长', '美容保健', '算法工程师', '电分操作员',
  '建筑项目助理', '镗工', '技术文员/助理', '编辑出版', '酒店前台', '会计经理/会计主管',
  '汽车检验/检测', '高级软件工程师', 
];

function last_name() {
  return this.pick(person_last_names);
}

function last_name_pinyin(name = null) {
  if (name && person_last_names.indexOf(name) > -1) {
    return person_last_names_pinyin[person_last_names.indexOf(name)];
  }
  return this.pick(person_last_names_pinyin);
}

function first_name() {
  return this.pick(person_first_names_male, person_first_names_female);
}

function first_name_pinyin(name = null) {
  if (name && person_first_names_male.indexOf(name) > -1) {
    return person_first_names_male_pinyin[person_first_names_male.indexOf(name)];
  }
  if (name && person_first_names_female.indexOf(name) > -1) {
    return person_first_names_female_pinyin[person_first_names_female.indexOf(name)];
  }
  return this.pick(person_first_names_male_pinyin, person_first_names_female_pinyin);
}

function first_name_male() {
  return this.pick(person_first_names_male);
}

// function first_name_male_pinyin(name = null) {
//   if (name && person_first_names_male.indexOf(name) > -1) {
//     return person_first_names_male_pinyin[person_first_names_male.indexOf(name)];
//   }
//   return this.pick(person_first_names_male_pinyin);
// }

function first_name_female() {
  return this.pick(person_first_names_female);
}

// function first_name_female_pinyin(name = null) {
//   if (name && person_first_names_female.indexOf(name) > -1) {
//     return person_first_names_female_pinyin[person_first_names_female.indexOf(name)];
//   }
//   return this.pick(person_first_names_female_pinyin);
// }

function name() {
  return this.last_name() + this.first_name();
}

function name_pinyin(name = null) {
  return this.last_name_pinyin(name && name.substr(0, 1)) + this.first_name_pinyin(name && name.substr(1));
}

function name_male() {
  return this.last_name() + this.first_name_male();
}

// function name_male_pinyin(name = null) {
//   return this.last_name_pinyin(name && name.substr(0, 1)) + this.first_name_male_pinyin(name && name.substr(1));
// }

function name_female() {
  return this.last_name() + this.first_name_female();
}

// function name_female_pinyin(name = null) {
//   return this.last_name_pinyin(name && name.substr(0, 1)) + this.first_name_female_pinyin(name && name.substr(1));
// }

function username() {
  return this.name_pinyin();
}

function password() {
  return this.string({ len: 10, chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`-=' });
}

function job() {
  return this.pick(person_jobs);
}

function phone() {
  return `1${this.pick([3, 5, 8])}${this.int({ min: 100000000, max: 999999999 })}`;
}

module.exports = function(pino) {
  pino.register('last_name', last_name);
  pino.register('last_name_pinyin', last_name_pinyin);
  pino.register('first_name', first_name);
  pino.register('first_name_pinyin', first_name_pinyin);
  pino.register('first_name_male', first_name_male);
  // pino.register('first_name_male_pinyin', first_name_male_pinyin);
  pino.register('first_name_female', first_name_female);
  // pino.register('first_name_female_pinyin', first_name_female_pinyin);
  pino.register('name', name);
  pino.register('name_pinyin', name_pinyin);
  pino.register('name_male', name_male);
  // pino.register('name_male_pinyin', name_male_pinyin);
  pino.register('name_female', name_female);
  // pino.register('name_female_pinyin', name_female_pinyin);
  pino.register('username', username);
  pino.register('password', password);
  pino.register('job', job);
  pino.register('phone', phone);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const AsyncFunction = (async() => {}).constructor;

function entries2props(vals) {
  if (vals.entries) {
    for (const [name, value] of vals.entries()) {
      vals[name] = value;
    }
  }
  return vals;
}

class Server {
  constructor(host = window.location.host) {
    this.host = host;
    this.middlewares = [];
    this.handler = null;
  }

  use(middleware) {
    if (middleware.constructor !== AsyncFunction) {
      throw new Error('middleware can only be asynchronous functions!');
    }
    this.middlewares.push(middleware);
  }

  isHost(host) {
    return this.host.constructor === RegExp ? this.host.test(host) : this.host === host;
  }

  get(path, handle) {
    this.route('GET', path, handle);
  }

  post(path, handle) {
    this.route('POST', path, handle);
  }

  put(path, handle) {
    this.route('PUT', path, handle);
  }

  delete(path, handle) {
    this.route('DELETE', path, handle);
  }

  route(method, path, handle) {
    if (handle.constructor !== AsyncFunction) {
      throw new Error('handle can only be asynchronous functions!');
    }
    let pathReg = path;
    if (path.constructor === String) {
      const paramsNames = [...path.matchAll(/:([a-z_][a-z0-9_]*)/ig)].map(v => v[1]);
      let pathRegStr = '^' + path.replace(/\//g, '\\/') + '$';
      for (const name of paramsNames) {
        pathRegStr = pathRegStr.replace(':' + name, `(?<${name}>[a-z0-9_]+)`);
      }
      pathReg = new RegExp(pathRegStr, 'ig');
    }
    this.use(async(req, res, next) => {
      if (req.uri.host !== this.host || req.method !== method || !new RegExp(pathReg.source, pathReg.flags).test(req.uri.pathname)) {
        await next(req, res);
        return;
      }
      req.params = entries2props(new window.URLSearchParams([...req.uri.pathname.matchAll(new RegExp(pathReg.source, pathReg.flags))].pop().groups));
      res.request = req;
      if (false) {}
      await handle(req, res, next);
      if (false) {}
    });
  }

  async notfound(req, res, next) {
    res.status = 404;
    res.statusText = 'not found';
    res.body = '';
  }

  getHandler() {
    let nextMiddleware = this.notfound;
    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const middleware = this.middlewares[i];
      const next = nextMiddleware;
      nextMiddleware = async (req, res) => await middleware(req, res, next);
    }
    return nextMiddleware;
  }

  async handle(req) {
    if (this.handler === null) {
      this.handler = this.getHandler();
    }
    req.uri = new window.URL(req.url, window.location.href);
    entries2props(req.headers);
    req.query = entries2props(new window.URLSearchParams(req.uri.search));
    req.form = new window.URLSearchParams();
    if (req.method === 'POST' && req.headers.get('Content-Type')) {
      if (req.headers.get('Content-Type').startsWith('application/x-www-form-urlencoded')) {
        req.form = entries2props(new window.URLSearchParams(req.body));
      } else if (req.headers.get('Content-Type').startsWith('application/json')) {
        req.form = JSON.parse(req.body);
      }
    }
    req.body = req.body ? req.body : '';
    const res = new window.Response();
    Object.defineProperties(res, {
      url: { configurable: true, enumerable: false, value: '', writable: true },
      status: { configurable: true, enumerable: false, value: 200, writable: true },
      statusText: { configurable: true, enumerable: false, value: 'OK', writable: true },
      body: { configurable: true, enumerable: false, value: '', writable: true },
    });
    res.url = req.url;
    res.send = function(data) {
      this.body = data;
    };
    res.json = function(data) {
      this.body = JSON.stringify(data);
    };
    await this.handler(req, res);
    entries2props(res.headers);
    res.text = async function() {
      return this.body;
    };
    res.json = async function() {
      return JSON.parse(this.body);
    };
    return res;
  }
}

module.exports = Server;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

window.fetchReal = window.fetch;

async function fetch(url, init, ...args) {
  const req = new window.Request('', {});
  Object.defineProperties(req, {
    method: { configurable: true, enumerable: false, value: 'GET', writable: true },
    url: { configurable: true, enumerable: false, value: '', writable: true },
    body: { configurable: true, enumerable: false, value: '', writable: true },
  });
  req.method = init && init.method ? init.method : 'GET';
  req.uri = new window.URL(url, window.location.href);
  req.url = req.uri.href;

  const res = await fetch.handle(req);

  if (res === false || (res && res.status === 404)) {
    return window.fetchReal(url, init, ...args);
  }

  return res;
}

fetch.handle = async function(req) {
  return false;
};

module.exports = fetch;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

window.XMLHttpRequestReal = window.XMLHttpRequest;

class XMLHttpRequest extends window.XMLHttpRequestReal {
  constructor() {
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    super();

    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    this.req = new window.Request('', {});
    Object.defineProperties(this.req, {
      method: { configurable: true, enumerable: false, value: 'GET', writable: true },
      url: { configurable: true, enumerable: false, value: '', writable: true },
      body: { configurable: true, enumerable: false, value: '', writable: true },
    });

    // https://developer.mozilla.org/en-US/docs/Web/API/Response
    this.res = null;

    Object.defineProperties(this, {
      readyState: { configurable: true, enumerable: false, value: 4, writable: true },
      status: { configurable: true, enumerable: false, value: 200, writable: true },
      statusText: { configurable: true, enumerable: false, value: 'OK', writable: true },
      responseText: { configurable: true, enumerable: false, value: '', writable: true },
    });
  }

  open(method, url, async = true, ...args) {
    super.open(method, url, async, ...args);
    this.req.method = method;
    this.req.uri = new URL(url, window.location.href);
    this.req.url = this.req.uri.href;
  }

  setRequestHeader(name, value) {
    super.setRequestHeader(name, value);
    this.req.headers.set(name, value);
  }

  getAllResponseHeaders() {
    let headers = '';
    for (const [name, value] of this.res.headers.entries()) {
      headers += `${name}: ${value}\r\n`;
    }
    return headers;
  }

  getResponseHeader(name) {
    return this.req.headers.get(name);
  }

  async send(value = '') {
    this.req.headers.set('Host', this.req.uri.host);
    this.req.headers.set('User-Agent', window.navigator.userAgent);
    this.req.headers.set('Accept', '*/*');
    this.req.headers.set('Referer', window.location.href);
    this.req.headers.set('Accept-Language', window.navigator.language);
    this.req.headers.set('Cookie', window.document.cookie);
    this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    this.req.body = value;

    this.res = await XMLHttpRequest.handle(this.req);

    if (this.res === false || this.res && this.res.status === 404) {
      return super.send(value);
    }

    this.readyState = 4;
    this.status = this.res.status;
    this.statusText = this.res.statusText;
    this.responseText = this.res.body;

    setTimeout(() => {
      if (this.onload) {
        this.onload();
      } else if (this.onreadystatechange) {
        this.onreadystatechange();
      } else {
        throw new Error('not found onload and onreadystatechange!');
      }
    }, XMLHttpRequest.delay);
  }
}

XMLHttpRequest.delay = 200;

XMLHttpRequest.handle = async function(req) {
  return false;
};

module.exports = XMLHttpRequest;


/***/ })
/******/ ]);
});
//# sourceMappingURL=pino.js.map