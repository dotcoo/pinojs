const pino = require('../src');
window.pino = pino;
pino.setup();

window.axios = require('axios');
window.$ = require('jquery');

require('./index_test');
require('./Server_test');
require('./fetch_test');
require('./XMLHttpRequest_test');
