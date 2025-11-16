const mongoose =require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    toAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    amount:{ type: Number, required: true},
    currency:{ type: String, default: 'KES'},
    type: { type: String, enum: ['deposit','withdrawal','transfer'], required: true },
    status: { type: String, enum: ['pending','completed','failed'], default: 'completed' },
    createdAt: { type: Date, default: Date.now },
     metadata: { type: Object }

});

module.exports = mongoose.model('Transaction',transactionSchema);