const router = require('express').Router();
const walletController = require('../controllers/wallet');
const transactionController = require('../controllers/transaction');

router.post('/setup', walletController.setupWallet);
router.post('/transact/:walletId', transactionController.addTransaction);
router.get('/transactions', transactionController.getTransactions);
router.get('/wallet/:id', walletController.getWalletDetails);

module.exports = router;
