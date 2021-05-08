const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    lastEdited: String,
    prefix: { type: String, default: "a!" },
    suggestionChannel: { type: String, required: false },
    muteRoleID: { type: String, required: false},
    auditLogID: { type: String, required: false}
})

module.exports = mongoose.model("Guild", guildSchema, 'guilds')