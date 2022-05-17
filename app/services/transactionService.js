const WalletModel = require('../models/Wallet');
const TransactionModel = require('../models/Transaction');
const { DataNotFoundException } = require('../utils/exceptions');
const { roundDecimal, generateUuid } = require('../utils/common');

const addTransaction = async ({ amount, description, walletId }) => {
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

  return {
    balance: updatedWallet.balance,
    transactionId,
  };
};

const getTransactions = async ({ walletId, skip, limit }) => {
  const transactions = await TransactionModel.lazyRead(
    {
      walletId,
    },
    skip,
    limit,
    { date: -1 }
  );

  return transactions.map((t) => ({
    id: t.transactionId,
    walletId: t.walletId,
    amount: t.amount,
    balance: t.balance,
    description: t.description,
    date: t.date,
    type: t.type,
  }));
};

module.exports = {
  addTransaction,
  getTransactions,
};
