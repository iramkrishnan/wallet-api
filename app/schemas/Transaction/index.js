const mongoose = require('mongoose');

const Transaction = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
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
