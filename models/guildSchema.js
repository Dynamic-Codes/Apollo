const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    suggestionChannel: { type: String, required: false },
    muteRoleID: { type: String, required: false}
})

module.exports = mongoose.model("Guild", guildSchema, 'guilds')