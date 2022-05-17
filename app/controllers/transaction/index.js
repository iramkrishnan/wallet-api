const responseUtility = require('../../utils/responseUtility');
const transactionService = require('../../services/transactionService');

const addTransaction = async (req, res, next) => {
  const { amount, description } = req.body;
  const { walletId } = req.params;
  try {
    const response = await transactionService.addTransaction({
      amount,
      description,
      walletId,
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
