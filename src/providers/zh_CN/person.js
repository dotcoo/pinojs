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
  'ding', 'wan', 'yan', 'feng', 'wu', 'le', 'qiao', 'yu', 'yun', 'jing', 'fu',
  'dai', 'zhong', 'ren', 'wu', 'lun', 'he', 'yu', 'ce', 'hou', 'yu', 'ni',
  'fu', 'yuan', 'guang', 'guan', 'dong', 'feng', 'leng', 'dao', 'diao', 'liu',
  'gang', 'qu', 'ban', 'hua', 'dan', 'bu', 'lu', 'gu', 'ke', 'ye', 'hou',
  'lv', 'han', 'wu', 'zhou', 'hu', 'he', 'yong', 'pin', 'gen', 'tang', 'hui',
  'kun', 'xia', 'duo', 'ye', 'da', 'qi', 'jiang', 'wei', 'kong', 'sun', 'meng',
  'ning', 'yu', 'an', 'song', 'guan', 'you', 'jia', 'mei', 'you', 'yao', 'yin',
  'tu', 'yue', 'cui', 'chuan', 'zuo', 'wu', 'chang', 'ping', 'ying', 'pang',
  'kang', 'yu', 'liao', 'zhang', 'xian', 'zhang', 'peng', 'xu', 'de', 'heng',
  'en', 'gong', 'mu', 'cheng', 'dai', 'fang', 'cheng', 'quan', 'wen', 'fang',
  'shi', 'yi', 'xing', 'chun', 'huang', 'chen', 'jing', 'bao', 'qu', 'cao',
  'zeng', 'zhu', 'pu', 'quan', 'li', 'du', 'yang', 'lin', 'feng', 'ke', 'liu',
  'sang', 'liang', 'li', 'fan', 'ou', 'can', 'yin', 'bi', 'mao', 'min', 'yong',
  'jiang', 'tang', 'wang', 'shen', 'sha', 'he', 'bo', 'ze', 'xi', 'hong',
  'pai', 'hao', 'hai', 'yu', 'wen', 'you', 'man', 'mo', 'pan', 'peng', 'huo',
  'yan', 'shao', 'jiao', 'xiong', 'ya', 'niu', 'gou', 'zhu', 'wang', 'gan',
  'tian', 'jia', 'bai', 'hao', 'shi', 'qi', 'zhu', 'xiu', 'qin', 'cheng',
  'dou', 'li', 'tong', 'xiao', 'fu', 'jian', 'jing', 'ji', 'xu', 'luo', 'yu',
  'weng', 'lao', 'xiao', 'pang', 'sheng', 'hu', 'teng', 'zang', 'yi', 'ai',
  'rui', 'su', 'gou', 'fan', 'huang', 'mo', 'xiao', 'ge', 'dong', 'jiang',
  'meng', 'lan', 'cai', 'xue', 'cang', 'dan', 'yuan', 'tan', 'yan', 'shi',
  'xu', 'xie', 'tan', 'er', 'fei', 'he', 'gu', 'lai', 'zhao', 'lu', 'che',
  'xin', 'guo', 'chi', 'deng', 'kuang', 'tai', 'qiu', 'yu', 'lang', 'zheng',
  'hao', 'guo', 'ku', 'shi', 'jin', 'zhong', 'qin', 'niu', 'gao', 'yan', 'yan',
  'kan', 'ruan', 'yang', 'a', 'lu', 'chen', 'tao', 'yu', 'lei', 'huo', 'wei',
  'han', 'gu', 'yan', 'rao', 'man', 'ma', 'luo', 'gao', 'wei', 'lu', 'bao',
  'hong', 'peng', 'lu', 'mai', 'huang', 'li', 'hei', 'qi', 'long',
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
  '嘉颖', '庚', '毅鹏', '志浩', '仕伟', '善为', '提', '不易', '恕权', '若昀', '爽',
  '琪', '圣', '睿', '臣刚', '宗泽', '浚龙', '尊', '正宵', '桓宇', '卫健',
];

// console.log(JSON.stringify(person_first_names_male.map(v => pinyin(v, { style: 'normal' }).flat().join(''))));
const person_first_names_male_pinyin = [
  'yucheng', 'ziming', 'shian', 'wenle', 'tong', 'fuzhu', 'zhan', 'lingnuo',
  'mingxue', 'shaoyi', 'quan', 'zhaojun', 'jiannian', 'weiyi', 'jingji', 'yinghua',
  'jiahui', 'hanzhong', 'huangqi', 'le', 'wei', 'yue', 'zhongji', 'zhiqiang',
  'jingqing', 'yasen', 'haiquan', 'shengwen', 'zhimin', 'xiaoyuan', 'jiajie',
  'xin', 'kequn', 'guofeng', 'sileng', 'wei', 'yan', 'zhentao', 'andong', 'junkai',
  'shaoyang', 'niu', 'hongming', 'zhendong', 'guoxiang', 'teng', 'mingjie',
  'zhihui', 'zhiqin', 'li', 'jiakai', 'wencong', 'weixi', 'chenyu', 'zi', 'dehao',
  'yun', 'wenjun', 'zongpei', 'suyu', 'yunpeng', 'bo', 'xiaosao', 'zhiwen',
  'guanyu', 'mingzhi', 'baoyi', 'guang', 'zhe', 'dong', 'yuzhong', 'changsheng',
  'mingyu', 'chao', 'weihuang', 'yang', 'tao', 'yuyang', 'yiming', 'yalun', 'lihang',
  'jingchen', 'haoran', 'bin', 'lilin', 'honggang', 'luoluo', 'jian', 'ting',
  'huaijing', 'nailin', 'chengqing', 'yichen', 'weiyang', 'zhiqian', 'haixiao',
  'jiacheng', 'wa', 'jue', 'zitao', 'geye', 'yin', 'zuming', 'weiren', 'haokang',
  'gang', 'dongjun', 'fangyuan', 'guohao', 'minyou', 'xi', 'mingyang', 'zhijian',
  'jihan', 'zheming', 'shengqiang', 'kun', 'guofeng', 'ziyang', 'zhentang', 'jicong',
  'jiang', 'chongzheng', 'hu', 'xishui', 'zhangwei', 'tu', 'zhongping', 'dezhong',
  'hansheng', 'dunhao', 'jiling', 'chengguang', 'shixian', 'jinhao', 'xiezhi',
  'zhiping', 'chuanhui', 'qitian', 'sheng', 'tanghao', 'genghong', 'jianglong',
  'wensen', 'tianshuo', 'zhian', 'yueting', 'shaosheng', 'yundi', 'kun', 'qi',
  'jianxiang', 'dayou', 'xudong', 'luobin', 'yuwei', 'shangshi', 'yongyi',
  'jiaqiang', 'tianhua', 'yilun', 'zhengliang', 'xiaofeng', 'jiaqiang', 'hongwei',
  'shanliang', 'qixian', 'xinzhe', 'junwei', 'yixing', 'qianzhe', 'chunxi',
  'guanting', 'wei', 'yunxiao', 'guonian', 'haoxian', 'xiaoyu', 'yongkang',
  'guorong', 'zigang', 'shichao', 'yunqian', 'yang', 'yuan', 'qili', 'wubei',
  'shaocong', 'dongyang', 'guanpu', 'shan', 'geliang', 'xueyou', 'laining',
  'shifeng', 'kaiwei', 'ziqiang', 'hangsheng', 'sicheng', 'pinchao', 'youjia',
  'shengming', 'mengmeng', 'pinyuan', 'guangping', 'gangshan', 'hexuan', 'mingzhang',
  'xiao', 'xinyang', 'zhixiang', 'siyuan', 'zhiguang', 'zhuoxi', 'ruoquan', 'jiaer',
  'jianhui', 'yida', 'guojing', 'chengming', 'zhicheng', 'ming', 'minghan', 'wencheng',
  'zihua', 'mao', 'yijie', 'yuanzhe', 'chen', 'jiaying', 'geng', 'yipeng', 'zhihao',
  'shiwei', 'shanwei', 'ti', 'buyi', 'shuquan', 'ruoyun', 'shuang', 'qi', 'sheng',
  'rui', 'chengang', 'zongze', 'junlong', 'zun', 'zhengxiao', 'huanyu', 'weijian',
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
  '妞', '淑娜', '倩玉', '桐舟', '思函', '雪琳', '绮贞', '雨轩', '二妮', '怡萍',
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
  'yiyi', 'xiaoyun', 'yanhong', 'ke', 'yang', 'yanshi', 'zixuan', 'xuan', 'ruixi',
  'feiping', 'huijun', 'zitong', 'weiling', 'mei', 'zhuoyan', 'ximan', 'yajie',
  'jingyi', 'fang', 'qi', 'qiufeng', 'shuyi', 'xiaomei', 'wenyu', 'liying', 'minli',
  'lu', 'songru', 'dema', 'ling', 'timo', 'rui', 'dou', 'qiao', 'xiaodi', 'miaoling',
  'gema', 'qiacuo', 'minqi', 'zhibi', 'dai', 'rui', 'jie', 'shan', 'mei', 'suo',
  'meihui', 'xiulin', 'tong', 'ji', 'leshi', 'baizhi', 'shao', 'yao', 'xi', 'yiwen',
  'shu', 'dan', 'zishan', 'suosuo', 'xiaotong', 'xue', 'xiaomin', 'qiuhong', 'niao',
  'xiangting', 'shishi', 'xiaoxiong', 'luofei', 'mingzhen', 'renfeng', 'huanjun',
  'bichang', 'shiqin', 'bingbing', 'anqi', 'qing', 'haiying', 'fanxi', 'xun',
  'wenhui', 'yichun', 'hong', 'jiawei', 'yixian', 'yu', 'xintong', 'yanxi', 'xiaoniu',
  'anning', 'xiaodou', 'xiaorong', 'yang', 'qianlian', 'meichen', 'meimei', 'wenxun',
  'mingjuan', 'yiting', 'ning', 'ling', 'xi', 'anyu', 'yun', 'luoshi', 'xiangyi',
  'fenlan', 'huiling', 'zhilei', 'qing', 'shizhe', 'xier', 'yingping', 'zhen', 'ruoxi',
  'san', 'peiwen', 'sihan', 'qianmin', 'sang', 'jieli', 'xinxin', 'ya', 'mengyuan',
  'haiqiao', 'bichen', 'xin', 'xingyu', 'zhixian', 'qianqian', 'yisha', 'wenxin',
  'xiaoqin', 'jiamei', 'hai', 'jiaying', 'runjie', 'xi', 'yan', 'ziyi', 'ning',
  'caijie', 'sihui', 'miaoke', 'xiaoping', 'weiling', 'laitian', 'shuang', 'luke',
  'zuozuo', 'xian', 'feier', 'chenxi', 'xiaoyun', 'xiaohua', 'xi', 'xiaopi', 'xinyao',
  'meilin', 'tong', 'songyun', 'xiyi', 'chi', 'yuan', 'shiyun', 'guang', 'huilan',
  'qiongzhi', 'jie', 'zhiyun', 'yuqing', 'yufei', 'baihe', 'yanglin', 'chunjia',
  'lingxia', 'naiwen', 'mengni', 'shenyue', 'xinwei', 'baoru', 'lisuo', 'niu', 'shuna',
  'qianyu', 'tongzhou', 'sihan', 'xuelin', 'qizhen', 'yuxuan', 'erni', 'yiping',
  'yuxin', 'weiwei', 'yanni', 'fan', 'feifei', 'yixuan', 'yongqi', 'mi', 'xiaoyun',
  'ziman', 'jiali', 'xi', 'hongfei', 'kan', 'ya', 'shian', 'chunru', 'hong', 'yuyou',
  'wei', 'huan', 'fuzhen', 'yufen', 'jieyi', 'jingyin', 'kailin', 'yuqi', 'hailing',
  'meiman', 'wanting', 'xia', 'xufang', 'xiaoxia', 'mao', 'lin', 'bei', 'shanshan',
  'juaner', 'wanying', 'sheng', 'qiuhua', 'baozhu', 'zhongwei', 'lei', 'haimei',
  'sihua', 'wenjie', 'erwen', 'jiewen', 'ziyue', 'youqi', 'zuying', 'liting', 'xiaonan',
  'lude', 'xinyu', 'wanting', 'shu', 'yuefei', 'yina', 'wen', 'jiaming', 'qianya',
  'yixuan', 'jingshan', 'qian',
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
