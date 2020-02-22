import address from './address';
import automotive from './automotive';
import color from './color';
import company from './company';
import date from './date';
import image from './image';
import internet from './internet';
import lorem from './lorem';
import person from './person';

export default function(pino) {
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
