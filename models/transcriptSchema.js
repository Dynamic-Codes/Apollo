const mongoose = require("mongoose")

const TranscriptSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Channel: String,
    Content: { type: Array, required: false },
})

module.exports = mongoose.model("Transcript", TranscriptSchema, "Transcripts")