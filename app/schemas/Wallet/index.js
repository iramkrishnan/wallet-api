const mongoose = require('mongoose');

const Wallet = new mongoose.Schema(
  {
    walletId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0.0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model('wallets', Wallet);
