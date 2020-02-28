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
