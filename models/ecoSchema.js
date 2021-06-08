const mongoose = require('mongoose')

const ecoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    lastEdited: String,
    rob: { type: String, default: "OFF" },
    heist: { type: String, default: "OFF" },
})

module.exports = mongoose.model("Eco", ecoSchema, 'ecos')