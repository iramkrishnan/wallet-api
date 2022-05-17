const WalletModel = require('../../models/Wallet');
const TransactionModel = require('../../models/Transaction');
const responseUtility = require('../../utils/responseUtility');
const { DataNotFoundException } = require('../../utils/exceptions');
const { roundDecimal } = require('../../utils/number');

const addTransaction = async (req, res, next) => {
  const { amount, description } = req.body;
  const { walletId } = req.params;
  try {
    const wallet = await WalletModel.readOneByKey({ _id: walletId });
    if (!wallet) throw new DataNotFoundException('Wallet Not Found');

    const transaction = await TransactionModel.create({
      wallet: walletId,
      balance: roundDecimal(wallet.balance + amount),
      description,
      amount: Math.abs(amount),
      type: amount > 0 ? 'CREDIT' : 'DEBIT',
      date: new Date(),
    });

    const updatedWallet = await WalletModel.update(
      { _id: walletId },
      { balance: roundDecimal(wallet.balance + amount) },
      { new: true }
    );

    const response = {
      balance: updatedWallet.balance,
      transactionId: transaction._id,
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
        wallet: walletId,
      },
      skip,
      limit,
      { date: -1 }
    );

    const response = transactions.map((t) => ({
      id: t._id,
      walletId: t.wallet,
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
