const mongoose = require('mongoose')

const warnSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    userID: String,
    content: Array
})

module.exports = mongoose.model("Warn", warnSchema, 'warns')