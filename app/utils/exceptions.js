const httpErrors = require(`../constants/httpResponse`);
const NodeException = require('node-exceptions');

class ApplicationException extends NodeException.LogicalException {
  constructor(errorKey = 'ERROR_SERVER_ERROR', message) {
    super();
    const error = httpErrors.APP_MESSAGES[errorKey];
    this.message = message || error.message;
    this.status = error.statusCode;
    this.code = error.errorCode;
  }
}

class DataNotFoundException extends ApplicationException {
  constructor(message) {
    super('ERROR_NO_DATA', message);
  }
}

class ValidationFailed extends ApplicationException {
  constructor(message) {
    super('ERROR_VALIDATION', message);
  }
}

class DataConstraintViolation extends ApplicationException {
  constructor(message) {
    super('ERROR_CONSTRAINT_VIOLATION', message);
  }
}

class Unauthorized extends ApplicationException {
  constructor(message) {
    super('ERROR_UNAUTHORIZED', message);
  }
}

module.exports = {
  DataNotFoundException,
  ValidationFailed,
  Unauthorized,
  DataConstraintViolation,
};
