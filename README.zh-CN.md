[English](https://github.com/wee9/pinojs/blob/master/README.md) | 简体中文

## 简介

[pinojs](https://github.com/wee9/pinojs)， 拦截ajax请求并响应假数据。

## 安装

使用 npm

``` bash
npm install pinojs
```

使用 cdn

``` html
<script src="https://unpkg.com/pinojs/dist/pino.min.js"></script>
```

## 示例

### 随机基础类型

``` js
console.log(pino.bool(), pino.boolean()); // true false // 随机出现 true 和 false

// pino.number(min, max, dotlen);
console.log(pino.number()); // 725529809.7393556

// pino.string(len, chars);
console.log(pino.string(10)); // pm7s6eyg29

// 其它
console.log(pino.float(), pino.float8(), pino.float16(), pino.float32(), pino.float64()); // 1885965470.3914413 94.31532790863642 5527.827595874842 -2017764709.9286506 2715833847827471.5

console.log(pino.ufloat(), pino.ufloat8(), pino.ufloat16(), pino.ufloat32(), pino.ufloat64()); // 1738532697.7559228 235.0860977653759 4454.686755517535 616772531.1650121 1597656664024015.8

console.log(pino.int(), pino.int8(), pino.int16(), pino.int32(), pino.int64()); // 1179924614 25 30226 -1897697086 -899786393304780

console.log(pino.uint(), pino.uint8(), pino.uint16(), pino.uint32(), pino.uint64()); // 1886266343 88 12053 40027370 4276249758040316
```

### 柯里化

``` js
// 随机多个数据
const scores = [];
for (let i = 0; i < 35; i++) {
  scores.push(pino.number(0, 101, 1));
}
console.log(scores);

// 每次传入参数比较麻烦, 可以使用柯里化把参数绑定进去
const score = pino.number.currying(0, 101, 1);
for (let i = 0; i < 35; i++) {
  scores.push(score()); // 更容易理解
}
console.log(scores);

// 为什么需要柯里化? 主要是配合生成对象.
```

### 生成对象

``` js
const age = pino.number.currying(18, 25, 0);

const user = {
  username: pino.string(10),
  password: pino.string(8),
  gender: pino.bool(),
  age: age(),
  score: score(),
};

console.log(user); // {username: "zecf37u9r5", password: "4tq8tp80", gender: false, age: 21, score: 80}
```

### 生成数组数据

``` js
// 方法签名: pino.range(start, end, step, (i, arr) => i)

// 生成连续的数组

console.log(pino.range(10)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(pino.range(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(pino.range(1, 10, 2)); // [1, 3, 5, 7, 9]

console.log(pino.range(10, 1, -2)); // [10, 8, 6, 4, 2]

// 自定义处理

console.log(pino.range(10, i => i * i)); // [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

console.log(pino.range(1, 10, i => i * i)); // [1, 4, 9, 16, 25, 36, 49, 64, 81]

console.log(pino.range(1, 10, 2, i => i * i)); // [1, 9, 25, 49, 81]

console.log(pino.range(10, 1, -2, i => i * i)); // [100, 64, 36, 16, 4]

// 分页数据

// 方法签名: pino.page(total, page_current, page_size, (i, arr) => i)

console.log(pino.page(83, 1, 10, i => i * i)); // [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

### 生成嵌套数据

``` js
console.log({
  code: 0,
  message: 'ok',
  data: {
    users: pino.range(0, 10, (i, arr) => ({ // 当然这里更合适使用 pino.page
      id: i + 1,
      username: pino.string(10),
      password: pino.string(8),
      gender: pino.bool(), // true -> 男, false -> 女
      age: age(),
      score: score(),
    })),
    total: 83,
  },
});

// {
//   "code": 0,
//   "message": "ok",
//   "data": {
//     "users": [
//       { "id": 1, "username": "g9ga2c00i1", "password": "yd7i8n6q", "gender": true, "age": 21, "score": 29 },
//       { "id": 2, "username": "l02nb8kakj", "password": "0vs77xww", "gender": true, "age": 25, "score": 36 },
//       { "id": 3, "username": "zec8d9wo1v", "password": "wsyouewk", "gender": true, "age": 25, "score": 36 },
//       { "id": 4, "username": "kiiiwm3p6b", "password": "9c6f4auk", "gender": false, "age": 24, "score": 83 },
//       { "id": 5, "username": "tkbsyak59t", "password": "j6fkfw35", "gender": false, "age": 23, "score": 5} ,
//       { "id": 6, "username": "g3jaxe7yrx", "password": "4zdqp8v3", "gender": true, "age": 20, "score": 65 },
//       { "id": 7, "username": "h6y6hugg4l", "password": "9v8vnnt8", "gender": false, "age": 22, "score": 12 },
//       { "id": 8, "username": "n0xxj2ypza", "password": "ls68t0dt", "gender": true, "age": 22, "score": 84 },
//       { "id": 9, "username": "udzjshjkbl", "password": "6mpr7p0v", "gender": false, "age": 23, "score": 44 },
//       { "id": 10, "username": "ix4s0apuhc", "password": "q6svlpo6", "gender": false, "age": 24, "score": 4}
//     ],
//     "total": 83
//   }
// }
```

### 概率

``` js
// 有时候我们的类型不是一致的, 比如数据库用户表中的性别和成绩, 是可空的,
// 也就是说需要产生 null, bool 和 number, 如果我们只产生一种类型的数据,
// 生成的数据过于完美, 这时候就需要控制一下概率.

// 方法签名: probability([value1, count], [value2, count], ...)

const gender_probability = pino.probability(
  [null, 6], // 未填写, 比例: `6.59340%`, 计算公式: `6 / (6 + 53 + 32)`
  [true, 53], // 男性, 比例: `58.24175%`, 计算公式: `53 / (6 + 53 + 32)`
  [false, 32], // 女性, 比例: `35.16483%`, 计算公式: `32 / (6 + 53 + 32)`
);

const score_probability = pino.probability(
  [pino.number.currying(0, 60, 0), 3], // 不及格, 比例: `6.52173%`, 计算公式: `3 / (3 + 9 + 32 + 2)`
  [pino.number.currying(60, 80, 0), 9], // 及格, 比例: `19.56521%`, 计算公式: `9 / (3 + 9 + 32 + 2)`
  [pino.number.currying(80, 100, 0), 32], // 优秀, 这里使用了柯里化, 在柯里化函数执行的时候会随机返回对应范围的数据
  [100, 2], // 满分, 为什么需要添加这一行呢? 因为数值返回是 `[min，max)`, 包含 min, 不包含 max, 所以需要这一行
);

console.log({
  data: {
    users: pino.range(0, 10, (i, arr) => ({ // 当然这里更合适使用 pino.page
      id: i + 1,
      username: pino.string(10),
      gender: gender_probability(), // 这里使用概率表来产生数据
      score: score_probability(), // 这里使用概率表来产生数据
    })),
  },
});

// {
//   "data": {
//     "users": [
//       { "id": 1, "username": "67kuoy4om5", "gender": true, "score": 91 },
//       { "id": 2, "username": "ct5ljsac5j", "gender": true, "score": 92 },
//       { "id": 3, "username": "h4io7nqy05", "gender": true, "score": 88 },
//       { "id": 4, "username": "7bloq8aczd", "gender": true, "score": 61 },
//       { "id": 5, "username": "ol6vmal1ps", "gender": null, "score": 91 },
//       { "id": 6, "username": "pcwe8js8xj", "gender": false, "score": 78 },
//       { "id": 7, "username": "ghy1uwaby0", "gender": false, "score": 100 },
//       { "id": 8, "username": "2ga0z5ocm3", "gender": false, "score": 89 },
//       { "id": 9, "username": "fs02zimkp3", "gender": true, "score": 69 },
//       { "id": 10, "username": "z1z4nsblw0", "gender": false, "score": 89 }
//     ]
//   }
// }
```

### 地址

``` js
console.log(pino.range(10, () => pino.country() + pino.province() + pino.city() + pino.district() + pino.street() + pino.building()));

console.log(pino.range(10, () => pino.country() + pino.province() + pino.city() + pino.district() + pino.street() + pino.community()));

console.log(pino.range(10, pino.address));

console.log(pino.range(10, pino.office_address));

console.log(pino.range(10, pino.home_address));
```

### 车牌

``` js
console.log(pino.range(10, pino.license_plate));

console.log(pino.range(10, pino.license_plate.currying('黑龙江')));

console.log(pino.range(10, pino.license_plate.currying('河南')));

console.log(pino.range(10, pino.license_plate.currying('豫')));

console.log(pino.range(10, pino.license_plate.currying('河南', 'A')));
```

### 颜色

``` js
console.log(pino.range(10, pino.color_name));

console.log(pino.range(10, pino.color));

console.log(pino.range(10, pino.hex_color));

console.log(pino.range(10, pino.rgb_color));

console.log(pino.range(10, pino.rgba_color));

console.log(pino.range(10, pino.colorful));

console.log(pino.range(10, pino.hex_colorful));

console.log(pino.range(10, pino.rgb_colorful));

console.log(pino.range(10, pino.rgba_colorful));
```

### 公司

``` js
const company_names = pino.range(10, pino.company_name);

console.log(company_names);

console.log(company_names.map(name => pino.company_name_pinyin(name)));

console.log(pino.range(10, pino.company_type));

console.log(pino.range(10, pino.company_suffix));

console.log(pino.range(10, pino.company));

console.log(pino.range(10, pino.company_short));
```

### 时间

``` js
console.log(pino.date_expr('+7d')); // y: Year, m: Month, d: Day, h: Hours, i: Minutes, s: Second

console.log(pino.date_format(new Date(), 'y-m-d h:i:s')); // y: Year, m: Month, d: Day, h: Hours, i: Minutes, s: Second

console.log(pino.range(10, pino.date));

console.log(pino.range(10, pino.date.currying('-3d', '+3d', 'y-m-d')));
```

### 图片

``` js
const image_url = pino.image_url({
  width: 200,
  height: 160,
  background: pino.colorful(), // optional
  foreground: pino.colorful(), // optional
  format: 'png', // optional
  text: 'pino.js', // optional
});

console.log('%ci', `color: rgba(0,0,0,0); padding: 0 100px; line-height: 160px; background: url('${image_url}') no-repeat;`);

if (typeof window !== 'undefined') {
  const image_data_url = pino.image_data_url({
    width: 200,
    height: 160,
    background: pino.colorful(), // optional
    foreground: pino.colorful(), // optional
    text: 'pin.js', // optional
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
```
}
### 网络

``` js
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
```

### 文本

``` js
console.log(pino.range(10, pino.word));

console.log(pino.range(10, pino.text.currying(100)));
```

### 个人信息

``` js
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

console.log(pino.range(10, pino.job));

console.log(pino.range(10, pino.phone));
```

### 拦截 Ajax 和 fetch

``` js
// 请求处理

// middleware1
pino.use(async (req, next) => {
  req.haha = 'm1';
  await next(req);
});

// middleware2
pino.use(async (req, next) => {
  req.haha += 'm2';
  await next(req);
});

pino.get('/blog/:bid', async(req) => {
  req.haha += 'get blog';
  const res = req.response; // 获取响应
  res.status = 200;
  res.statusText = 'OK';
  res.headers.set('Content-Type', 'application/json');
  res.send(JSON.stringify({ // 响应数据
    request: 'get blog',
    params: req.params, // url路径参数
    query: req.query, // get 参数
    form: req.form, // post 参数
    formData: req.formData, // 文件上传 参数
    json: req.json, // json 参数
  }));
});

pino.post('/blog/:bid', async(req) => {
  req.haha += 'post blog';
  const res = req.response;
  res.status = 200;
  res.statusText = 'OK';
  res.headers.set('Content-Type', 'application/json');
  res.sendJson({ // 响应JSON数据
    request: 'post blog',
    params: req.params, // url路径参数
    query: req.query, // get 参数
    form: req.form, // post 参数
    formData: req.formData, // 文件上传 参数
    json: req.json, // json 参数
  });
});

// 替换 XMLHttpRequest 和 fetch
pino.install();

// 恢复 XMLHttpRequest 和 fetch
pino.uninstall();
```

### fetch 发起请求

``` js
// post form
const res3 = await fetch('/blog/1000?name=dotcoo&site=dotcoo.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'username=dotcoo&password=dotcoo123',
});
const data3 = await res3.json();
console.log(data3);

// post form
const res31 = await fetch('/blog/1000?name=dotcoo&site=dotcoo.com', {
  method: 'POST',
  body: new URLSearchParams('username=dotcoo&password=dotcoo123'),
});
const data31 = await res31.json();
console.log(data31);

// post formData
const fd4 = new FormData();
fd4.append('username', 'dotcoo');
fd4.append('password', 'dotcoo123');
const res4 = await fetch('/blog/1000?name=dotcoo&site=dotcoo.com', {
  method: 'POST',
  body: fd4,
});
const data4 = await res4.json();
console.log(data4);

// post json
const res5 = await fetch('/blog/1000?name=dotcoo&site=dotcoo.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'dotcoo', password: 'dotcoo123' }),
});
const data5 = await res5.json();
console.log(data5);
```

### ajax 发起请求

``` js
const xhr3 = new XMLHttpRequest();
xhr3.open('POST', '/blog/1000?name=dotcoo&site=dotcoo.com', true);
xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr3.send('username=dotcoo&password=dotcoo123');
xhr3.onreadystatechange = function() {
  if (this.readyState === 4) {
    console.log('readyState:', this.readyState);
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);
    console.log('responseText:', this.responseText);
  }
};

const xhr31 = new XMLHttpRequest();
xhr31.open('POST', '/blog/1000?name=dotcoo&site=dotcoo.com', true);
xhr31.send(new URLSearchParams('username=dotcoo&password=dotcoo123'));
xhr31.onreadystatechange = function() {
  if (this.readyState === 4) {
    console.log('readyState:', this.readyState);
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);
    console.log('responseText:', this.responseText);
  }
};

const fd4 = new FormData();
fd4.append('username', 'dotcoo');
fd4.append('password', 'dotcoo123');
const xhr4 = new XMLHttpRequest();
xhr4.open('POST', '/blog/1000?name=dotcoo&site=dotcoo.com', true);
xhr4.send(fd4);
xhr4.onreadystatechange = function() {
  if (this.readyState === 4) {
    console.log('readyState:', this.readyState);
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);
    console.log('responseText:', this.responseText);
  }
};

const xhr5 = new XMLHttpRequest();
xhr5.open('POST', '/blog/1000?name=dotcoo&site=dotcoo.com', true);
xhr5.setRequestHeader('Content-Type', 'application/json');
xhr5.send(JSON.stringify({ username: 'dotcoo', password: 'dotcoo123' }));
xhr5.onreadystatechange = function() {
  if (this.readyState === 4) {
    console.log('readyState:', this.readyState);
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);
    console.log('responseText:', this.responseText);
  }
};
```

## License

```
[MIT](https://github.com/wee9/pinojs/blob/master/LICENSE) license.

Copyright (c) 2020-present dotcoo zhao
```
