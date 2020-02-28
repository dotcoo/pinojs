const address = require('./address');
const automotive = require('./automotive');
const color = require('./color');
const company = require('./company');
const date = require('./date');
const image = require('./image');
const internet = require('./internet');
const lorem = require('./lorem');
const person = require('./person');

module.exports = function(pino) {
  address(pino);
  automotive(pino);
  color(pino);
  company(pino);
  date(pino);
  image(pino);
  internet(pino);
  lorem(pino);
  person(pino);
};
