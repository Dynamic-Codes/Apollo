const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    channelID: { type: String, required: false, default: '`NOT SETUP`'},
    CountNum: { type: Number, required: false, default: 0 },
    LastAuth: { type: String, required: false, default: '833353624762581023'},
})

module.exports = mongoose.model("Counter", counterSchema, 'counter')