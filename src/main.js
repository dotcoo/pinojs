function test(pino) {
  // ### value 值

  // pino.bool()
  console.log(pino.bool(), pino.boolean()); // true false

  // pino.int(min, max)
  console.log(pino.int()); // 725529809

  // pino.string(len, charts)
  console.log(pino.string(10)); // pm7s6eyg29

  // more 更多

  // pino.int(min, max)
  console.log(pino.int(), pino.int8(), pino.int16(), pino.int32(), pino.int64()); // 1179924614 25 30226 -1897697086 -899786393304780

  // pino.uint(min, max)
  console.log(pino.uint(), pino.uint8(), pino.uint16(), pino.uint32(), pino.uint64()); // 1886266343 88 12053 40027370 4276249758040316

  // ### array 数组

  // pino.range(start, end, step, (i, arr) => i)
  console.log(pino.range(10)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  console.log(pino.range(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

  console.log(pino.range(1, 10, 2)); // [1, 3, 5, 7, 9]

  console.log(pino.range(10, 1, -2)); // [10, 8, 6, 4, 2]

  console.log(pino.range(10, i => i * i)); // [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

  console.log(pino.range(1, 10, i => i * i)); // [1, 4, 9, 16, 25, 36, 49, 64, 81]

  console.log(pino.range(1, 10, 2, i => i * i)); // [1, 9, 25, 49, 81]

  console.log(pino.range(10, 1, -2, i => i * i)); // [100, 64, 36, 16, 4]

  // ### object 对象

  console.log({
    username: pino.string(10),
    password: pino.string(8),
    gender: pino.bool(),
    age: pino.int(18, 25),
    score: pino.int(0, 101),
  }); // { username: "zecf37u9r5", password: "4tq8tp80", gender: false, age: 21, score: 80 }

  // ### currying 柯里化

  const total = 66;
  const page = 1;
  const limit = 10;
  const username = pino.string.currying(10);
  const password = pino.string.currying(8);
  const gender = pino.bool.currying();
  const age = pino.int.currying(18, 25);
  const score = pino.int.currying(0, 101);
  console.log({
    code: 0,
    message: 'ok',
    data: {
      list: pino.range(limit, (i, a) => ({
        username: username(),
        password: password(),
        gender: gender(),
        age: age(),
        score: score(),
      })),
      total,
      page,
      limit,
    },
  });
  /*
  {
    "code": 0,
    "message": "ok",
    "data": {
      "list": [
        { "username": "X9NioRASpp", "password": "ViITv6Ft", "gender": true, "age": 22, "score": 27 },
        { "username": "ussfLQZH4w", "password": "Ybzl1bBN", "gender": false, "age": 23, "score": 93 },
        { "username": "BEMvwnhqcI", "password": "GL0YeGPL", "gender": true, "age": 23, "score": 1 },
        { "username": "apSrrGg7TH", "password": "quOHRya7", "gender": false, "age": 21, "score": 97 },
        { "username": "KNuGvSSLem", "password": "AouIa6rw", "gender": true, "age": 23, "score": 73 },
        { "username": "XRZzPUVTan", "password": "lhmwBs20", "gender": false, "age": 20, "score": 41 },
        { "username": "SJwegQgwiQ", "password": "OhYDfxOZ", "gender": false, "age": 22, "score": 73 },
        { "username": "npecoXO71M", "password": "z6XsezYO", "gender": false, "age": 22, "score": 64 },
        { "username": "dIt61wKp5S", "password": "S5iE67RW", "gender": true, "age": 24, "score": 61 },
        { "username": "Db08eZIgEt", "password": "PhZIFPP8", "gender": false, "age": 18, "score": 100 }
      ],
      "total": 66,
      "page": 1,
      "limit": 10
    }
  }
  */

  // ### unique 唯一

  // pino.unique(func)
  console.log(pino.range(20, pino.uint8.unique())); // [198, 35, 46, 22, 162, 45, 171, 6, 184, 87, 210, 108, 88, 44, 138, 32, 69, 97, 216, 249]
  console.log(pino.range(20, pino.unique(pino.uint8))); // [226, 224, 35, 84, 99, 195, 251, 216, 133, 237, 90, 51, 213, 109, 69, 11, 78, 89, 200, 93]

  // ### probability 概率

  // pino.probability([value|func, proba], [value|func, proba], ...)
  const score_probability = pino.probability(
    [pino.int.currying(0, 60), 1], // 不及格, 比例: `10%`, 计算公式: `1 / (1 + 2 + 6 + 1)`
    [pino.int.currying(60, 80), 2], // 及格, 比例: `20%`, 计算公式: `2 / (1 + 2 + 6 + 1)`
    [pino.int.currying(80, 100), 6], // 优秀, 这里使用了柯里化, 在柯里化函数执行的时候会随机返回对应范围的数据
    [100, 1], // 满分, 为什么需要添加这一行呢? 因为 `int()` 返回是 `[min，max)`, 包含 min, 不包含 max, 所以需要这一行
  );
  console.log(pino.range(10, i => ({
    id: i + 1,
    username: username(),
    score: score_probability(), // 这里使用概率表来产生数据
  })));
  /*
  [
    { "id": 1, "username": "GS6guox1nB", "score": 85 },
    { "id": 2, "username": "dmjH7Iv2p6", "score": 29 },
    { "id": 3, "username": "BHY4KLiiX4", "score": 80 },
    { "id": 4, "username": "o3KuDb5dnk", "score": 66 },
    { "id": 5, "username": "KE58vRKFbc", "score": 100 },
    { "id": 6, "username": "H5TCIRD6jk", "score": 89 },
    { "id": 7, "username": "p6aTIJ3PiU", "score": 92 },
    { "id": 8, "username": "c6Dg8U3Tf3", "score": 64 },
    { "id": 9, "username": "79qInCr83w", "score": 99 },
    { "id": 10, "username": "8fitq1wuYa", "score": 82 }
  ]
  */

  // ### 地址

  console.log(pino.range(10, () => pino.country() + pino.province() + pino.city() + pino.district() + pino.street() + pino.building()));

  console.log(pino.range(10, () => pino.country() + pino.province() + pino.city() + pino.district() + pino.street() + pino.community()));

  console.log(pino.range(10, pino.address));

  console.log(pino.range(10, pino.office_address));

  console.log(pino.range(10, pino.home_address));

  // ### 车牌

  console.log(pino.range(10, pino.license_plate));

  console.log(pino.range(10, pino.license_plate.currying('黑龙江')));

  console.log(pino.range(10, pino.license_plate.currying('河南')));

  console.log(pino.range(10, pino.license_plate.currying('豫')));

  console.log(pino.range(10, pino.license_plate.currying('河南', 'A')));

  // ### 颜色

  console.log(pino.range(10, pino.color_name));

  console.log(pino.range(10, pino.color));

  console.log(pino.range(10, pino.hex_color));

  console.log(pino.range(10, pino.rgb_color));

  console.log(pino.range(10, pino.rgba_color));

  console.log(pino.range(10, pino.colorful));

  console.log(pino.range(10, pino.hex_colorful));

  console.log(pino.range(10, pino.rgb_colorful));

  console.log(pino.range(10, pino.rgba_colorful));

  // ### 公司

  const company_names = pino.range(10, pino.company_name);

  console.log(company_names);

  console.log(company_names.map(name => pino.company_name_pinyin(name)));

  console.log(pino.range(10, pino.company_type));

  console.log(pino.range(10, pino.company_suffix));

  console.log(pino.range(10, pino.company));

  console.log(pino.range(10, pino.company_short));

  // ### 时间

  console.log(pino.date_expr('+7d')); // y: Year, m: Month, d: Day, h: Hours, i: Minutes, s: Second

  console.log(pino.date_format(new Date(), 'y-m-d h:i:s')); // y: Year, m: Month, d: Day, h: Hours, i: Minutes, s: Second

  console.log(pino.range(10, pino.date));

  console.log(pino.range(10, pino.date.currying('-3d', '+3d', 'y-m-d')));

  // ### 图片

  if (typeof window !== 'undefined') {
    const image_data_url = pino.image_data_url({
      width: 200,
      height: 160,
      background: pino.colorful(), // optional
      foreground: pino.colorful(), // optional
      text: 'pinojs', // optional
      font: 'bold 20px "Impact"', // optional
    });

    console.log(image_data_url);

    console.log('%ci', `color: rgba(0,0,0,0); padding: 0 100px; line-height: 160px; background: url('${image_data_url}') no-repeat;`);

    const image_avatar = pino.image_avatar({
      width: 360, // 图片宽度 // optional
      height: 360, // 图片高度 // optional
      padding: 20, // 边距 // optional
      dot: 8, // 点行列数 // optional
    });

    console.log(image_avatar);

    console.log('%ci', `color: rgba(0,0,0,0); padding: 0 180px; line-height: 360px; background: url('${image_avatar}') no-repeat;`);
  }
  // ### 网络

  console.log(pino.range(10, pino.domain_tld));

  console.log(pino.range(10, pino.domain_name));

  console.log(pino.range(10, pino.domain_host));

  console.log(pino.range(10, pino.domain));

  console.log(pino.range(10, pino.hostname));

  console.log(pino.range(10, pino.free_email_domain));

  console.log(pino.range(10, pino.free_email));

  console.log(pino.range(10, pino.company_email_domain));

  console.log(pino.range(10, pino.company_email));

  console.log(pino.range(10, pino.email));

  console.log(pino.range(10, pino.ipv4));

  console.log(pino.range(10, pino.ipv6));

  console.log(pino.range(10, pino.mac_address));

  console.log(pino.range(10, pino.protocal));

  console.log(pino.range(10, pino.site));

  console.log(pino.range(10, pino.url_path));

  console.log(pino.range(10, pino.url_page));

  console.log(pino.range(10, pino.url_extension));

  console.log(pino.range(10, pino.url));

  // ### 文本

  console.log(pino.range(10, pino.word));

  console.log(pino.range(10, pino.text.currying(100)));

  // ### 个人信息

  const last_names = pino.range(10, pino.last_name);
  console.log(last_names);
  console.log(last_names.map(v => pino.last_name_pinyin(v)));

  const first_names = pino.range(10, pino.first_name);
  console.log(first_names);
  console.log(first_names.map(v => pino.first_name_pinyin(v)));

  const first_name_males = pino.range(10, pino.first_name_male);
  console.log(first_name_males);
  // console.log(first_name_males.map(v => pino.first_name_male_pinyin(v)));

  const first_name_females = pino.range(10, pino.first_name_female);
  console.log(first_name_females);
  // console.log(first_name_females.map(v => pino.first_name_female_pinyin(v)));

  const names = pino.range(10, pino.name);
  console.log(names);
  console.log(names.map(v => pino.name_pinyin(v)));

  const name_males = pino.range(10, pino.name_male);
  console.log(name_males);
  // console.log(name_males.map(v => pino.name_male_pinyin(v)));

  const name_females = pino.range(10, pino.name_female);
  console.log(name_females);
  // console.log(name_females.map(v => pino.name_female_pinyin(v)));

  console.log('邢林旭', pino.gender('邢林旭'));
  console.log('季婷文', pino.gender('季婷文'));

  console.log(pino.range(10, pino.job));

  console.log(pino.range(10, pino.phone));
}

globalThis.test = test;
