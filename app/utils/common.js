const { v4: uuIdv4 } = require('uuid');

const roundDecimal = (number) => Math.round(number * 10000) / 10000;
const generateUuid = () => uuIdv4();

module.exports = {
  roundDecimal,
  generateUuid,
};
