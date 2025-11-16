const mongoose = require('mongoose');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

const transfer = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    
    if (amount <= 0) throw new Error('Invalid amount');

    const from = await Account.findById(fromAccountId).session(session);
    if (!from) throw new Error('Sender account not found');

    if (from.balance < amount) throw new Error('Insufficient funds');

    const to = await Account.findById(toAccountId).session(session);
    if (!to) throw new Error('Receiver account not found');

    // Update balances
    from.balance -= amount;
    to.balance += amount;

    await from.save({ session });
    await to.save({ session });

    const txn = await Transaction.create([{
      fromAccount: from._id,
      toAccount: to._id,
      amount,
      type: 'transfer',
      status: 'completed'
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ transaction: txn[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

module.exports = { transfer };
