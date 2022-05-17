const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const Wallet = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Decimal128,
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
