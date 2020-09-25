import { Request } from './Server';

window.fetchReal = window.fetch;

async function fetch(url, init = {}, ...args) {
  const req = new Request({ ...init, url });

  req.useIntercept = true;
  if (await fetch.handle(req)) {
    return new window.Response(req.response.body, {
      status: req.response.status,
      statusText: req.response.statusText,
      headers: new window.Headers(req.response.headers),
    });
  }
  req.useIntercept = false;

  try {
    return await window.fetchReal(url, init, ...args);
  } catch (err) {
    console.log('fetch error:', err);
    if (!fetch.handle(req)) {
      throw err;
    }
  }

  await fetch.handle(req);
  return new window.Response(req.response.body, {
    status: req.response.status,
    statusText: req.response.statusText,
    headers: new window.Headers(req.response.headers),
  });
}

fetch.route = function(req) {
  return false;
};

fetch.handle = async function(req) {
  req.response.status = 444;
};

export default fetch;
