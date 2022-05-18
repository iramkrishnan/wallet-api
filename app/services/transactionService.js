const WalletModel = require('../models/Wallet');
const TransactionModel = require('../models/Transaction');
const { DataNotFoundException, Unauthorized } = require('../utils/exceptions');
const { roundDecimal, generateUuid } = require('../utils/common');

const addTransaction = async ({ amount, description, walletId }) => {
  const wallet = await WalletModel.readOneByKey({ walletId });
  if (!wallet) throw new DataNotFoundException('Wallet Not Found');
  if (amount < 0 && wallet.balance < Math.abs(amount))
    throw new Unauthorized('Insufficent Balance');

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

const getTransactions = async ({
  walletId,
  skip,
  limit,
  sortBy = 'date',
  sortDirection = -1,
}) => {
  const transactions = await TransactionModel.lazyRead(
    {
      walletId,
    },
    skip,
    limit,
    { [sortBy]: sortDirection }
  );

  const totalCount = await TransactionModel.countDocuments({
    walletId,
  });

  return {
    transactions: transactions.map((t) => ({
      id: t.transactionId,
      walletId: t.walletId,
      amount: t.amount,
      balance: t.balance,
      description: t.description,
      date: t.date,
      type: t.type,
    })),
    totalCount,
  };
};

module.exports = {
  addTransaction,
  getTransactions,
};
