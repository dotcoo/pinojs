(async() => {
  // get
  const res1 = await fetch('/blog/1000/comment/1111');
  const data1 = await res1.text();
  console.log(data1);

  // get
  const res2 = await fetch('/blog/1000?name=dotcoo&site=dotcoo.com');
  const data2 = await res2.json();
  console.log(data2);

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
})();
