import pino from '../src';
import pinomock from '../src/mock';

pino.use(pinomock);

window.pino = pino;

window.axios = require('axios');
window.$ = require('jquery');

require('./index_test');
require('./Server_test');
require('./fetch_test');
require('./XMLHttpRequest_test');
