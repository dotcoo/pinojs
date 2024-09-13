#!/usr/local/bin/fibjs

const { default: pino } = require('../dist/pinojs.cjs');
require('./index.js');

console.log(process.versions.node);

globalThis.test(pino);
