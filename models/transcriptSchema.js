const mongoose = require("mongoose")

const TranscriptSchema = new mongoose.Schema({
    guildID: { type: String },
    Channel: { type: String, required: false },
    Content: { type: Array, required: false },
})

module.exports = mongoose.model("Transcript", TranscriptSchema, "Transcripts")