(async() => {
  const res1 = await fetch('/blog/1000');
  const data1 = await res1.text();
  console.log(data1);

  const res2 = await fetch('/blog/1000?name=dotcoo&site=dotcoo.com', { method: 'POST', body: JSON.stringify({ username: 'dotcoo', password: 'dotcoo123' }) });
  const data2 = await res2.json();
  console.log(data2);
})();
