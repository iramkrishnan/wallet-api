const httpResponse = require('../constants/httpResponse');

const response = {};

response.build = (key, result, msg) => {
  let responseObj = httpResponse.APP_MESSAGES[key];
  if (!responseObj) {
    responseObj = httpResponse.APP_MESSAGES.ERROR_SERVER_ERROR;
  }

  return {
    status: key === 'SUCCESS',
    statusCode: responseObj.statusCode,
    statusMessage: msg || responseObj.message,
    response: result || {},
  };
};

module.exports = response;
