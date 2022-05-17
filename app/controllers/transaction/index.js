const responseUtility = require('../../utils/responseUtility');
const transactionService = require('../../services/transactionService');

const addTransaction = async (req, res, next) => {
  try {
    const response = await transactionService.addTransaction({
      ...req.body,
      ...req.params,
    });
    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const response = await transactionService.getTransactions(req.query);
    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addTransaction,
  getTransactions,
};
