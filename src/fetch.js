const { Request } = require('./Server');

window.fetchReal = window.fetch;

async function fetch(url, init = {}, ...args) {
  const req = new Request(url, init, ...args);
  await fetch.handle(req);
  const response = req.response;
  return response.status === 444 ? window.fetchReal(url, init, ...args) : response;
}

fetch.handle = async function(req) {
  req.response.status = 444;
};

module.exports = fetch;
