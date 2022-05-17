const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const Transaction = new mongoose.Schema(
  {
    walletId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    walletBalance: {
      type: Decimal128,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Decimal128,
      required: true,
    },
    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      required: true,
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

mongoose.model('transactions', Transaction);
