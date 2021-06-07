const mongoose = require('mongoose')

const PremiumSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Free: { type: String, default: 'yes'},
    Code: String,
    Type: String,
    userID: String,
    DateRedeem: Number,
    RedeemEnd: Number,
})

module.exports = mongoose.model("Premium", PremiumSchema, 'Premium')