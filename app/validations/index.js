const { body, param, query, validationResult } = require('express-validator');
const responseUtility = require('../utils/responseUtility');
const { validate: validateUuid } = require('uuid');

const parseValidationErrors = (errors) => {
  const errorObject = {};
  Object.keys(errors).forEach((value) => {
    errorObject[value] = errors[value].msg;
  });
  return errorObject;
};

exports.checkForError = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const rs = parseValidationErrors(error.mapped());
    const responseOb = responseUtility.build('ERROR_VALIDATION', rs);
    return res.status(400).json(responseOb).end();
  }
  return next();
};

exports.validateSetupWallet = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('balance')
    .exists()
    .withMessage('Balance is required')
    .isNumeric()
    .withMessage('Balance should be a numeric value')
    .notEmpty()
    .withMessage('Balance cannot be empty'),
];

exports.validateAddTransaction = [
  body('amount')
    .exists()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount should be a numeric value')
    .notEmpty()
    .withMessage('Amount cannot be empty'),
  param('walletId')
    .exists()
    .custom((id) => validateUuid(id)),
];

exports.validateGetTransactions = [
  query('walletId')
    .exists()
    .withMessage('walletId is required')
    .custom((id) => validateUuid(id)),
  query('skip').custom((skip) => {
    if (skip) {
      return typeof Number(skip) == 'number' && !isNaN(Number(skip));
    }
    return true;
  }),
  query('limit').custom((limit) => {
    if (limit) {
      return typeof Number(limit) == 'number' && !isNaN(Number(limit));
    }
    return true;
  }),
];

exports.validateGetWalletDetails = [
  param('id')
    .exists()
    .custom((id) => validateUuid(id)),
];
