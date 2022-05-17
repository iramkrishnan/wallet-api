const WalletModel = require('../../models/Wallet');
const TransactionModel = require('../../models/Transaction');
const responseUtility = require('../../utils/responseUtility');
const { DataNotFoundException } = require('../../utils/exceptions');
const { roundDecimal, generateUuid } = require('../../utils/common');

const addTransaction = async (req, res, next) => {
  const { amount, description } = req.body;
  const { walletId } = req.params;
  try {
    const wallet = await WalletModel.readOneByKey({ walletId });
    if (!wallet) throw new DataNotFoundException('Wallet Not Found');

    const { transactionId } = await TransactionModel.create({
      walletId,
      transactionId: generateUuid(),
      balance: roundDecimal(wallet.balance + amount),
      description,
      amount: Math.abs(amount),
      type: amount > 0 ? 'CREDIT' : 'DEBIT',
      date: new Date(),
    });

    const updatedWallet = await WalletModel.update(
      { walletId },
      { balance: roundDecimal(wallet.balance + amount) },
      { new: true }
    );

    const response = {
      balance: updatedWallet.balance,
      transactionId,
    };

    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

const getTransactions = async (req, res, next) => {
  const { walletId, skip, limit } = req.query;
  try {
    const transactions = await TransactionModel.lazyRead(
      {
        walletId,
      },
      skip,
      limit,
      { date: -1 }
    );

    const response = transactions.map((t) => ({
      id: t.transactionId,
      walletId: t.walletId,
      amount: t.amount,
      balance: t.balance,
      description: t.description,
      date: t.date,
      type: t.type,
    }));
    return res.status(200).json(responseUtility.build('SUCCESS', response));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addTransaction,
  getTransactions,
};
