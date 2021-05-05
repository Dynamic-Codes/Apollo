const mongoose = require('mongoose')

const afkSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    reason: String,
    messagesLeft: {type: Number, default: 3}
})

module.exports = mongoose.model("Afk", afkSchema, 'afks')