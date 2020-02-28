pino.setup();

// ====== XMLHttpRequest ======

const xhr1 = new XMLHttpRequest();

xhr1.open('GET', '/blog/10', true);
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

xhr2.open('POST', '/blog/20?name=dotcoo&site=dotcoo.com', true);
xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr2.send('username=dotcoo&password=dotcoo123');

xhr2.onreadystatechange = function() {
  if (this.readyState === 4) {
    console.log('readyState:', this.readyState);
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);
    console.log('responseText:', this.responseText);
  }
};

// ====== axios ======

(async() => {
  console.log((await axios.get('/blog/100')).data);
  console.log((await axios.post('/blog/200?name=dotcoo&site=dotcoo.com', { username: 'dotcoo', password: 'dotcoo123' })).data);
})();

// ====== jQuery ======

$.ajax({
  method: 'get',
  url: '/blog/300',
  success: function(res) {
    console.log('jquery:', res);
  },
  error: function(xhr, textStatus, error) {
    console.log(xhr.statusText, textStatus, error);
  },
});

$.ajax({
  method: 'post',
  url: '/blog/400?name=dotcoo&site=dotcoo.com',
  data: { username: 'dotcoo', password: 'dotcoo123' },
  success: function(res) {
    console.log('jquery:', res);
  },
});

$.get('/blog/500', function(res) {
  console.log('jquery:', res);
});

$.post('/blog/600?name=dotcoo&site=dotcoo.com', { username: 'dotcoo', password: 'dotcoo123' }, function(res) {
  console.log('jquery:', res);
}, 'json');
