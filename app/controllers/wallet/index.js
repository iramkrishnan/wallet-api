const responseUtility = require('../../utils/responseUtility');
const walletService = require('../../services/walletService');

const setupWallet = async (req, res, next) => {
  try {
    const response = await walletService.setupWallet(req.body);
    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

const getWalletDetails = async (req, res, next) => {
  try {
    const response = await walletService.getWalletDetails(req.params);
    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  setupWallet,
  getWalletDetails,
};
