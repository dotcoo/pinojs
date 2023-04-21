const person_last_names_data = {
  丁: 'ding', 万: 'wan', 上: 'shang', 丌: 'qi', 丘: 'qiu', 东: 'dong', 严: 'yan', 丰: 'feng', 乌: 'wu', 乐: 'le', 乔: 'qiao', 乜: 'mie', 习: 'xi', 于: 'yu', 云: 'yun', 五: 'wu', 井: 'jing', 亢: 'kang', 人: 'ren', 仇: 'chou', 仉: 'zhang', 从: 'cong', 令: 'ling', 仰: 'yang', 仲: 'zhong', 任: 'ren', 伊: 'yi', 伍: 'wu', 伏: 'fu', 伯: 'bo', 何: 'he', 佘: 'she', 余: 'yu', 佟: 'tong', 佴: 'er', 侯: 'hou', 俞: 'yu', 俟: 'si', 倪: 'ni', 傅: 'fu', 储: 'chu', 元: 'yuan', 充: 'chong', 党: 'dang', 全: 'quan', 公: 'gong', 关: 'guan', 养: 'yang', 冀: 'ji', 冉: 'ran', 农: 'nong', 冯: 'feng', 况: 'kuang', 冶: 'ye', 冷: 'leng', 凌: 'ling', 凤: 'feng', 刁: 'diao', 刘: 'liu', 利: 'li', 别: 'bie', 劳: 'lao', 勾: 'gou', 包: 'bao', 匡: 'kuang', 华: 'hua', 卓: 'zhuo', 单: 'dan', 南: 'nan', 卜: 'bu', 卞: 'bian', 卢: 'lu', 卫: 'wei', 印: 'yin', 危: 'wei', 卻: 'que', 厉: 'li', 厍: 'she', 双: 'shuang', 叔: 'shu', 古: 'gu', 台: 'tai', 史: 'shi', 叶: 'ye', 司: 'si', 吉: 'ji', 后: 'hou', 向: 'xiang', 吕: 'lv', 吴: 'wu', 周: 'zhou', 呼: 'hu', 和: 'he', 咸: 'xian', 哈: 'ha', 唐: 'tang', 商: 'shang', 喻: 'yu', 国: 'guo', 堵: 'du', 墨: 'mo', 壤: 'rang', 夏: 'xia', 夔: 'kui', 太: 'tai', 夹: 'jia', 奚: 'xi', 姓: 'xing', 姚: 'yao', 姜: 'jiang', 姬: 'ji', 娄: 'lou', 子: 'zi', 孔: 'kong', 孙: 'sun', 孟: 'meng', 季: 'ji', 宁: 'ning', 宇: 'yu', 安: 'an', 宋: 'song', 宓: 'mi', 宗: 'zong', 官: 'guan', 宣: 'xuan', 宦: 'huan', 宫: 'gong', 宰: 'zai', 家: 'jia', 容: 'rong', 宿: 'su', 寇: 'kou', 富: 'fu', 寿: 'shou', 封: 'feng', 尉: 'wei', 尚: 'shang', 尤: 'you', 尹: 'yin', 居: 'ju', 屈: 'qu', 屠: 'tu', 山: 'shan', 岑: 'cen', 岳: 'yue', 崔: 'cui', 嵇: 'ji', 巢: 'chao', 左: 'zuo', 巩: 'gong', 巫: 'wu', 巴: 'ba', 帅: 'shuai', 师: 'shi', 席: 'xi', 常: 'chang', 干: 'gan', 平: 'ping', 年: 'nian', 幸: 'xing', 广: 'guang', 庄: 'zhuang', 应: 'ying', 庞: 'pang', 康: 'kang', 庾: 'yu', 廉: 'lian', 廖: 'liao', 延: 'yan', 弓: 'gong', 弘: 'hong', 张: 'zhang', 强: 'qiang', 归: 'gui', 彭: 'peng', 徐: 'xu', 徒: 'tu', 微: 'wei', 怀: 'huai', 惠: 'hui', 慎: 'shen', 慕: 'mu', 戈: 'ge', 戎: 'rong', 成: 'cheng', 戚: 'qi', 戴: 'dai', 房: 'fang', 扈: 'hu', 扶: 'fu', 拓: 'tuo', 支: 'zhi', 政: 'zheng', 敖: 'ao', 文: 'wen', 方: 'fang', 於: 'yu', 施: 'shi', 时: 'shi', 昌: 'chang', 明: 'ming', 易: 'yi', 昝: 'zan', 晁: 'chao', 晋: 'jin', 晏: 'yan', 景: 'jing', 暨: 'ji', 暴: 'bao', 曲: 'qu', 曹: 'cao', 曾: 'zeng', 月: 'yue', 有: 'you', 木: 'mu', 朱: 'zhu', 权: 'quan', 李: 'li', 杜: 'du', 束: 'shu', 杨: 'yang', 杭: 'hang', 松: 'song', 林: 'lin', 柏: 'bai', 查: 'cha', 柯: 'ke', 柳: 'liu', 柴: 'chai', 栾: 'luan', 桂: 'gui', 桑: 'sang', 桓: 'huan', 梁: 'liang', 梅: 'mei', 楚: 'chu', 樊: 'fan', 欧: 'ou', 正: 'zheng', 步: 'bu', 武: 'wu', 殳: 'shu', 段: 'duan', 殷: 'yin', 毋: 'wu', 毕: 'bi', 毛: 'mao', 水: 'shui', 汝: 'ru', 江: 'jiang', 池: 'chi', 汤: 'tang', 汪: 'wang', 汲: 'ji', 沃: 'wo', 沈: 'shen', 沙: 'sha', 法: 'fa', 洪: 'hong', 浦: 'pu', 海: 'hai', 涂: 'tu', 淳: 'chun', 温: 'wen', 游: 'you', 湛: 'zhan', 滑: 'hua', 滕: 'teng', 满: 'man', 漆: 'qi', 潘: 'pan', 澹: 'dan', 濮: 'pu', 焦: 'jiao', 熊: 'xiong', 燕: 'yan', 爱: 'ai', 父: 'fu', 牛: 'niu', 牟: 'mou', 牧: 'mu', 狄: 'di', 狐: 'hu', 王: 'wang', 班: 'ban', 琴: 'qin', 璩: 'qu', 甄: 'zhen', 甘: 'gan', 生: 'sheng', 甫: 'fu', 田: 'tian', 申: 'shen', 白: 'bai', 百: 'bai', 皇: 'huang', 皮: 'pi', 益: 'yi', 盖: 'gai', 盛: 'sheng', 相: 'xiang', 督: 'du', 瞿: 'qu', 石: 'shi', 祁: 'qi', 祖: 'zu', 祝: 'zhu', 禄: 'lu', 福: 'fu', 禹: 'yu', 离: 'li', 秋: 'qiu', 秦: 'qin', 程: 'cheng', 穆: 'mu', 空: 'kong', 窦: 'dou', 章: 'zhang', 童: 'tong', 端: 'duan', 竺: 'zhu', 符: 'fu', 笪: 'da', 第: 'di', 简: 'jian', 管: 'guan', 籍: 'ji', 米: 'mi', 糜: 'mi', 索: 'suo', 红: 'hong', 纪: 'ji', 终: 'zhong', 经: 'jing', 缑: 'gou', 缪: 'mou', 罗: 'luo', 羊: 'yang', 羿: 'yi', 翁: 'weng', 翟: 'di', 耿: 'geng', 聂: 'nie', 胡: 'hu', 胥: 'xu', 能: 'neng', 臧: 'zang', 舌: 'she', 舒: 'shu', 良: 'liang', 艾: 'ai', 芮: 'rui', 花: 'hua', 苍: 'cang', 苏: 'su', 苗: 'miao', 范: 'fan', 茅: 'mao', 茹: 'ru', 荀: 'xun', 荆: 'jing', 荣: 'rong', 莘: 'shen', 莫: 'mo', 萧: 'xiao', 葛: 'ge', 董: 'dong', 蒋: 'jiang', 蒙: 'meng', 蒯: 'kuai', 蒲: 'pu', 蓝: 'lan', 蓟: 'ji', 蓬: 'peng', 蔚: 'wei', 蔡: 'cai', 蔺: 'lin', 薄: 'bao', 薛: 'xue', 虞: 'yu', 融: 'rong', 衡: 'heng', 袁: 'yuan', 裘: 'qiu', 裴: 'pei', 褚: 'zhu', 西: 'xi', 解: 'jie', 言: 'yan', 訾: 'zi', 詹: 'zhan', 计: 'ji', 许: 'xu', 诸: 'zhu', 谈: 'tan', 谢: 'xie', 谭: 'tan', 谯: 'qiao', 谷: 'gu', 贝: 'bei', 贡: 'gong', 贲: 'bi', 费: 'fei', 贺: 'he', 贾: 'gu', 赏: 'shang', 赖: 'lai', 赫: 'he', 赵: 'zhao', 越: 'yue', 跋: 'ba', 路: 'lu', 车: 'che', 轩: 'xuan', 辕: 'yuan', 辛: 'xin', 边: 'bian', 连: 'lian', 迟: 'chi', 逄: 'pang', 通: 'tong', 逯: 'lu', 邓: 'deng', 邢: 'xing', 那: 'na', 邬: 'wu', 邰: 'tai', 邱: 'qiu', 邴: 'bing', 邵: 'shao', 邹: 'zou', 郁: 'yu', 郈: 'hou', 郎: 'lang', 郏: 'jia', 郑: 'zheng', 郗: 'xi', 郜: 'gao', 郝: 'hao', 郦: 'li', 郭: 'guo', 都: 'du', 鄂: 'e', 鄢: 'yan', 酆: 'feng', 里: 'li', 金: 'jin', 钟: 'zhong', 钦: 'qin', 钭: 'dou', 钮: 'niu', 钱: 'qian', 长: 'chang', 门: 'men', 闫: 'yan', 闵: 'min', 闻: 'wen', 闾: 'lv', 阎: 'yan', 阙: 'que', 阚: 'kan', 阮: 'ruan', 阳: 'yang', 阴: 'yin', 陆: 'lu', 陈: 'chen', 陶: 'tao', 隆: 'long', 隗: 'wei', 雍: 'yong', 雕: 'diao', 雷: 'lei', 霍: 'huo', 靳: 'jin', 鞠: 'ju', 韦: 'wei', 韩: 'han', 韶: 'shao', 项: 'xiang', 须: 'xu', 顾: 'gu', 颛: 'zhuan', 颜: 'yan', 饶: 'rao', 马: 'ma', 驷: 'si', 骆: 'luo', 高: 'gao', 鬱: 'yu', 魏: 'wei', 鱼: 'yu', 鲁: 'lu', 鲍: 'bao', 鲜: 'xian', 麻: 'ma', 黄: 'huang', 黎: 'li', 齐: 'qi', 龙: 'long', 龚: 'gong',
};

const person_last_names = Object.keys(person_last_names_data);

const person_first_names_male_data = {
  潇健: 'xiaojian', 大成: 'dacheng', 贺雄: 'hexiong', 家宇: 'jiayu', 屿: 'yu', 湑凯: 'xukai', 志铭: 'zhiming', 一劼: 'yijie', 博琨: 'bokun', 永澍: 'yongshu', 卓熙: 'zhuoxi', 佳铮: 'jiazheng', 钟炜: 'zhongwei', 凤星: 'fengxing', 金锋: 'jinfeng', 乾宇: 'qianyu', 盛: 'sheng', 颀炜: 'qiwei', 晟卓: 'shengzhuo', 帅: 'shuai', 竟东: 'jingdong', 平琦: 'pingqi', 伟亮: 'weiliang', 璐凯: 'lukai', 肃: 'su', 楷善: 'kaishan', 海阳: 'haiyang', 皓俊: 'haojun', 伟祥: 'weixiang', 晨祎: 'chenyi', 霄泽: 'xiaoze', 沛泽: 'peize', 永旭: 'yongxu', 鹏帆: 'pengfan', 政旭: 'zhengxu', 东阳: 'dongyang', 健强: 'jianqiang', 俊燚: 'junyi', 默然: 'moran', 谨昊: 'jinhao', 国政: 'guozheng', 翊鸿: 'yihong', 千炜: 'qianwei', 尧城: 'yaocheng', 钰伟: 'yuwei', 耀: 'yao', 嘉文: 'jiawen', 健健: 'jianjian', 序: 'xu', 孝金: 'xiaojin', 佳肴: 'jiayao', 天骑: 'tianqi', 泽枫: 'zefeng', 守浩: 'shouhao', 鹏月: 'pengyue', 恒阅: 'hengyue', 泓臻: 'hongzhen', 晶硕: 'jingshuo', 忠元: 'zhongyuan', 华森: 'huasen', 旭畅: 'xuchang', 国强: 'guoqiang', 文治: 'wenzhi', 纪雄: 'jixiong', 嘉衡: 'jiaheng', 伟杰: 'weijie', 兆辉: 'zhaohui', 思成: 'sicheng', 林旭: 'linxu', 少辉: 'shaohui', 星淇: 'xingqi', 昊喆: 'haozhe', 飞扬: 'feiyang', 晓贺: 'xiaohe', 瑀翀: 'yuchong', 仁昭: 'renzhao', 胜涛: 'shengtao', 鸥卜: 'oubu', 云宝: 'yunbao', 瑞涵: 'ruihan', 川: 'chuan', 铠滔: 'kaitao', 明炬: 'mingju', 运乾: 'yunqian', 新富: 'xinfu', 羿灿: 'yican', 锦前: 'jinqian', 伍沐: 'wumu', 威弘: 'weihong', 拯: 'zheng', 江洋: 'jiangyang', 杭杰: 'hangjie', 天鑫: 'tianxin', 雪通: 'xuetong', 茂新: 'maoxin', 泽仕: 'zeshi', 方洋: 'fangyang', 煜杰: 'yujie', 韪铭: 'weiming', 家瑜: 'jiayu',
};

const person_first_names_male = Object.keys(person_first_names_male_data);

const person_first_names_female_data = {
  艳娇: 'yanjiao', 晓思: 'xiaosi', 轶伟: 'yiwei', 晓涵: 'xiaohan', 若晴: 'ruoqing', 铭璇: 'mingxuan', 玉灿: 'yucan', 馥宁: 'funing', 赛琼: 'saiqiong', 恬祎: 'tianyi', 靖雪: 'jingxue', 潇丹: 'xiaodan', 超月: 'chaoyue', 子怡: 'ziyi', 李妃: 'lifei', 瑞鸿: 'ruihong', 芳源: 'fangyuan', 祺钰: 'qiyu', 雅琪: 'yaqi', 配如: 'peiru', 俣佳: 'yujia', 议丹: 'yidan', 雅凡: 'yafan', 梓楠: 'zinan', 坤宇: 'kunyu', 星楠: 'xingnan', 祺琦: 'qiqi', 叶青: 'yeqing', 煜: 'yu', 林凡: 'linfan', 婷文: 'tingwen', 莹雪: 'yingxue', 洢柠: 'yining', 晓薇: 'xiaowei', 馨妍: 'xinyan', 阳阳: 'yangyang', 钰莹: 'yuying', 婉祺: 'wanqi', 紫琼: 'ziqiong', 雨涵: 'yuhan', 昕怡: 'xinyi', 一楠: 'yinan', 天冉: 'tianran', 天茹: 'tianru', 欣彤: 'xintong', 玥涵: 'yuehan', 艳婷: 'yanting', 贺尧: 'heyao', 梦召: 'mengzhao', 禾苗: 'hemiao', 亚捷: 'yajie', 自翼: 'ziyi', 小雅: 'xiaoya', 佳荣: 'jiarong', 贻冉: 'yiran', 淙淙: 'congcong', 玉帆: 'yufan', 雨萌: 'yumeng', 艳非: 'yanfei', 家幸: 'jiaxing', 祺昕: 'qixin', 丽君: 'lijun', 佳淇: 'jiaqi', 泓悦: 'hongyue', 思齐: 'siqi', 懿纯: 'yichun', 艾妮: 'aini', 亦苗: 'yimiao', 静哲: 'jingzhe', 笑蓉: 'xiaorong', 天为: 'tianwei', 砚心: 'yanxin', 伊璇: 'yixuan', 姿: 'zi', 欢: 'huan', 展: 'zhan', 芮颍: 'ruiying', 琼玉: 'qiongyu', 晓函: 'xiaohan', 艺馨: 'yixin', 赛亚: 'saiya', 佳曼: 'jiaman', 馨宁: 'xinning', 紫予: 'ziyu', 石良: 'shiliang', 奥博: 'aobo', 聪敏: 'congmin', 怡雯: 'yiwen', 杨灿: 'yangcan', 雲河: 'yunhe', 怿萱: 'yixuan', 馨玥: 'xinyue', 苏宇: 'suyu', 艺灿: 'yican', 思慧: 'sihui', 铭浛: 'minghan', 博淼: 'bomiao', 艺蒙: 'yimeng', 伊明: 'yiming', 瑞瑞: 'ruirui',
};

const person_first_names_female = Object.keys(person_first_names_female_data);

const person_first_names_data = Object.assign({}, person_first_names_male_data, person_first_names_female_data);

const person_first_names = Object.keys(person_first_names_data);

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

function name_update(person_last_names_data = null, person_first_names_male_data = null, person_first_names_female_data = null) {
  this.data.person_last_names_data = person_last_names_data;
  this.data.person_last_names = Object.keys(this.person_last_names_data);
  this.data.person_first_names_male_data = person_first_names_male_data;
  this.data.person_first_names_male = Object.keys(this.data.person_first_names_male_data);
  this.data.person_first_names_female_data = person_first_names_female_data;
  this.data.person_first_names_female = Object.keys(this.data.person_first_names_female_data);
  this.data.person_first_names_data = Object.assign({}, person_first_names_male_data, person_first_names_female_data);
  this.data.person_first_names = Object.keys(this.data.person_first_names_data);
}

function last_name() {
  return this.random(this.data.person_last_names);
}

function last_name_pinyin(name = this.last_name()) {
  return this.data.person_last_names_data[name] || '';
}

function first_name_male() {
  return this.random(this.data.person_first_names_male);
}

function first_name_male_pinyin(name = this.first_name_male()) {
  return this.data.person_first_names_male_data[name] || '';
}

function first_name_female() {
  return this.random(this.data.person_first_names_female);
}

function first_name_female_pinyin(name = this.first_name_female()) {
  return this.data.person_first_names_female_data[name] || '';
}

function first_name() {
  return this.random(this.data.person_first_names);
}

function first_name_pinyin(name = this.first_name()) {
  return this.data.person_first_names_data[name] || '';
}

function name() {
  return this.last_name() + this.first_name();
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

function gender(name = this.name(), female = 0, male = 1) {
  return name.substr(1) in this.data.person_first_names_female_data ? female : male;
}

function username(name = this.name()) {
  return this.name_pinyin(name);
}

function password() {
  return this.string(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`-=');
}

function job() {
  return this.random(this.data.person_jobs);
}

function phone() {
  return `1${this.random([3, 5, 8])}${this.number(100000000, 999999999, 0)}`;
}

export default function(pino) {
  pino.registers({
    // data
    person_last_names_data,
    person_last_names,
    person_first_names_male_data,
    person_first_names_male,
    person_first_names_female_data,
    person_first_names_female,
    person_first_names_data,
    person_first_names,
    person_jobs,
    // method
    name_update,
    last_name,
    last_name_pinyin,
    first_name_male,
    first_name_male_pinyin,
    first_name_female,
    first_name_female_pinyin,
    first_name,
    first_name_pinyin,
    name,
    name_male,
    name_female,
    name_pinyin,
    gender,
    username,
    password,
    job,
    phone,
  });
};
