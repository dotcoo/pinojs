const pino = require('../dist/pino');
global.pino = pino;

require('./index_test');
