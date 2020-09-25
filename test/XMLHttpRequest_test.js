// ====== XMLHttpRequest ======

const xhr1 = new XMLHttpRequest();
xhr1.open('GET', '/blog/1000/comment/1111', true);
xhr1.send();
xhr1.onreadystatechange = function() {
  if (this.readyState === 4) {
    console.log('readyState:', this.readyState);
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);
    console.log('responseText:', this.responseText);
  }
};

const xhr2 = new XMLHttpRequest();
xhr2.open('GET', '/blog/1000?name=dotcoo&site=dotcoo.com', true);
// xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// xhr2.send('username=dotcoo&password=dotcoo123');
xhr2.send();
xhr2.onreadystatechange = function() {
  if (this.readyState === 4) {
    console.log('readyState:', this.readyState);
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);
    console.log('responseText:', this.responseText);
  }
};

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
