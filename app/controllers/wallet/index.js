const WalletModel = require('../../models/Wallet');
const TransactionModel = require('../../models/Transaction');
const responseUtility = require('../../utils/responseUtility');
const { DataNotFoundException } = require('../../utils/exceptions');

const setupWallet = async (req, res, next) => {
  try {
    const wallet = await WalletModel.create({
      name: req.body.name,
      balance: req.body.balance,
      date: new Date(),
    });

    const { _id: walletId, balance, name, date } = wallet;

    const { _id: transactionId } = await TransactionModel.create({
      wallet: walletId,
      balance,
      amount: balance,
      type: 'CREDIT',
      date: new Date(),
    });

    const response = {
      id: walletId,
      balance,
      transactionId,
      name,
      date,
    };

    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

const getWalletDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const wallet = await WalletModel.readOneByKey({ _id: id });
    if (!wallet) throw new DataNotFoundException('Wallet Not Found');

    const { _id: walletId, balance, name, date } = wallet;
    const response = {
      id: walletId,
      balance,
      name,
      date,
    };

    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  setupWallet,
  getWalletDetails,
};
