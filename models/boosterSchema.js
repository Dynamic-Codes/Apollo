const mongoose = require('mongoose')

const boosterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    roleID: { type: String, required: false, default: '`NOT SETUP`'},
    ParentSection: { type: String, required: false, default: '`NOT SETUP`'},
    JoinID: { type: String, required: false, default: '`NOT SETUP`'},
})

module.exports = mongoose.model("Booster", boosterSchema, 'boosters')