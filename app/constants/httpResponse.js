const httpResponse = {
  APP_MESSAGES: {
    SUCCESS: {
      message: 'Success',
      statusCode: 200,
    },
    ERROR_VALIDATION: {
      message: 'Validation Error',
      statusCode: 400,
    },
    ERROR_NO_DATA: {
      message: 'No Data Available',
      statusCode: 404,
    },
    ERROR_SERVER_ERROR: {
      message: 'Server Error',
      statusCode: 500,
    },
    ERROR_NOT_FOUND: {
      message: 'Resource Not Found',
      statusCode: 404,
    },
    ERROR_CONSTRAINT_VIOLATION: {
      message: 'Data Constraint Violation',
      statusCode: 400,
    },
  },
};

module.exports = httpResponse;
