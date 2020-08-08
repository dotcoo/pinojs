const pino = require('../src');
window.pino = pino;
pino.install();

window.axios = require('axios');
window.$ = require('jquery');

require('./index_test');
require('./Server_test');
require('./fetch_test');
require('./XMLHttpRequest_test');
