const router = require('express').Router();
const walletController = require('../controllers/wallet');
const transactionController = require('../controllers/transaction');
const {
  validateSetupWallet,
  validateAddTransaction,
  validateGetTransactions,
  validateGetWalletDetails,
  checkForError,
} = require('../validations');

router.post(
  '/setup',
  validateSetupWallet,
  checkForError,
  walletController.setupWallet
);
router.post(
  '/transact/:walletId',
  validateAddTransaction,
  checkForError,
  transactionController.addTransaction
);
router.get(
  '/transactions',
  validateGetTransactions,
  checkForError,
  transactionController.getTransactions
);
router.get(
  '/wallet/:id',
  validateGetWalletDetails,
  checkForError,
  walletController.getWalletDetails
);

module.exports = router;
