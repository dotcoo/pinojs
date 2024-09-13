#!/usr/local/bin/node

import pino from '../dist/pinojs.js';
import './index.js';

console.log(process.versions.node);

globalThis.test(pino);
