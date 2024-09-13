#!/usr/local/bin/node

const { default: pino } = require('../dist/pinojs.cjs');
const { test } = require('./index.cjs');

console.log(process.versions.node);

test(pino);
