const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    lastEdited: String,
    balance: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    bankLimit: { type: Number, default: 500 }
})

module.exports = mongoose.model("Balance", balanceSchema, 'balances')