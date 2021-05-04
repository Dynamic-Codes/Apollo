const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema({
    guildId: reqString,
    userId: reqString
})

module.exports = mongoose.model("AFK Members", schema)