const WalletModel = require('../models/Wallet');
const TransactionModel = require('../models/Transaction');
const { DataNotFoundException } = require('../utils/exceptions');
const { roundDecimal, generateUuid } = require('../utils/common');

const setupWallet = async (body) => {
  const wallet = await WalletModel.create({
    walletId: generateUuid(),
    name: body.name,
    balance: roundDecimal(body.balance),
    date: new Date(),
  });

  const { walletId, name, balance, date } = wallet;

  const { transactionId } = await TransactionModel.create({
    walletId,
    transactionId: generateUuid(),
    balance,
    description: 'Setup',
    amount: roundDecimal(balance),
    type: 'CREDIT',
    date: new Date(),
  });

  return {
    id: walletId,
    balance,
    transactionId,
    name,
    date,
  };
};

const getWalletDetails = async ({ id }) => {
  const wallet = await WalletModel.readOneByKey({ walletId: id });
  if (!wallet) throw new DataNotFoundException('Wallet Not Found');

  const { walletId, balance, name, date } = wallet;
  return {
    id: walletId,
    balance,
    name,
    date,
  };
};

module.exports = {
  setupWallet,
  getWalletDetails,
};
