const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Transaction = require('../models/Transaction');

// Get all transactions for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { account, type, amount, description } = req.body;
    const newTransaction = new Transaction({
      user: req.user.id,
      account,
      type,
      amount,
      description,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
