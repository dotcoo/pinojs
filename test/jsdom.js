const { JSDOM, ResourceLoader } = require("jsdom");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pinocchio Test</title>
</head>
<body>
</body>
</html>`;

const options = {
  url: "http://localhost/",
  referrer: "http://localhost/",
  contentType: "text/html",
  includeNodeLocations: true,
  storageQuota: 10000000,
};

const dom = new JSDOM(html, options);

global.window = dom.window;

class Request {
  constructor() {
    this.headers = new window.Headers();
  }
}

class Response {
  constructor() {
    this.headers = new window.Headers();
  }
}

function fetch() {
  throw new Error('fetch error!');
}

class XMLHttpRequest {
  constructor () {
    this.headers = new window.Headers();
  }

  open() {

  }

  setRequestHeader(name, value) {
    this.headers.set(name, value)
  }

  send() {
    throw new Error('XMLHttpRequest::send error!');
  }
}

window.fetch = fetch;
window.XMLHttpRequest = XMLHttpRequest;
window.Request = Request;
window.Response = Response;

const pino = require('../src');

global.pino = pino;
global.fetch = pino.fetch;
global.XMLHttpRequest = pino.XMLHttpRequest;
global.axios = require('axios');
global.$ = require('jquery');

require('./index_test');
require('./Server_test');
require('./fetch_test');
require('./XMLHttpRequest_test');
