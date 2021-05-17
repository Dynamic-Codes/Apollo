const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    lastEdited: String,
    balance: { type: Number, default: 0 },
    bank: { type: Number, default: 5000 },
    bankLimit: { type: Number, default: 10000 },
    dailyCool: {type: Number, default: 0},
    job: { type: String, default: 'not-set'},
    workStreak: { type: Number, default: 0},
    workCool: {type: Number, default: 0},
    pfpDescrip: {type: String, default: 'User has not set there description.\nUse \`a!pf descrip <description>\` to set.'},
})

module.exports = mongoose.model("Balance", balanceSchema, 'balances')