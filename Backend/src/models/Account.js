const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true, index:true},
    accountNumber : { type: String, required: true ,unique:true},
    type: {type: String, enum: ['savings','current'],default: 'savings'},
    balance: {type: Number, default: 0},
    currency: {type: String, dafault:'KES'},
    createAt: {type: Date, default: Date.now}
});

module.exports =mongoose.model('Account', accountSchema) ;