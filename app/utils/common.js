const { v4: uuIdv4 } = require('uuid');

const generateUuid = () => uuIdv4();

module.exports = {
  generateUuid,
};
