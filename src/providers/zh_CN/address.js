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

export default function(pino) {
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