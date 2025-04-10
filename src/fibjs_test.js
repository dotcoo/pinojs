#!/usr/local/bin/fibjs

const { pino } = require('../dist/pinojs.umd.cjs');
require('./main.js');

console.log(process.versions.node);

globalThis.test(pino);
