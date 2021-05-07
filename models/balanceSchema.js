const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    guildID: String,
    lastEdited: String,
    balance: { type: Number, default: 0 },
})

module.exports = mongoose.model("Balance", balanceSchema, 'balances')