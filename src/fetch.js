window.fetchReal = window.fetch;

async function fetch(url, init = {}, ...args) {
  const req = { url, method: 'GET', headers: new window.Headers(), ...init, response: {} };
  const res = await fetch.handle(req);
  return res.status === 444 ? window.fetchReal(url, init, ...args) : res;
}

fetch.handle = async function(req) {
  req.response.status = 444;
};

module.exports = fetch;
