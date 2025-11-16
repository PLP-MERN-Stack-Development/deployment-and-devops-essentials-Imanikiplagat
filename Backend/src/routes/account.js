const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); // Middleware to protect routes
const Account = require('../models/Account');

// Get all accounts for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new account
router.post('/', auth, async (req, res) => {
  try {
    const { accountName, accountType, balance } = req.body;
    const newAccount = new Account({
      user: req.user.id,
      accountName,
      accountType,
      balance,
    });
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
