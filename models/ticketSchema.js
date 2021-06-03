const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    lastEdited: String,
    ParentSection: { type: String, required: false, default: '`NOT SETUP`'},
    TicketRole: { type: String, required: false, default: '`NOT SETUP`'},
    TicketTitle: { type: String, required: false, default: 'Support Tickets' },
    TicketDescription: { type: String, required: false, default: 'Click the button below to open a ticket!' },
    TickChannelMSG: { type: String, required: false, default: 'Thanks for opening a ticket! Staff will be with you shortly.' },
})

module.exports = mongoose.model("Ticket", ticketSchema, 'tickets')