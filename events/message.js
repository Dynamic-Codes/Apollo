module.exports = {
	name: 'message',
	async execute(message, client) {

        const mongoose = require("mongoose")
        const fs = require("fs")
		
        //ticket transcript

        const Ticket = require('../models/ticketSchema')

        let TicketProfile = await Ticket.findOne({
            guildID: message.guild.id
        });

        if (!TicketProfile) return;

        if(message.channel.parentID !== (TicketProfile.ParentSection)) return;

        const Transcript = require('../models/transcriptSchema')

        let TranscriptProfile = await Transcript.findOne({
            guildID: message.guild.id
        });

        if (!TranscriptProfile) {
            TranscriptProfile = await new Transcript({
                guildID: message.guild.id,
                Channel: message.channel.id,
            });
            await TranscriptProfile.save().catch(err => console.log(err));
        }

        Transcript.findOne({ Channel : message.channel.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               console.log('there is data')
               data.Content.push(`${message.author.tag} : ${message.content}`) 
            } else {
                console.log('there is no data')
                data = new Transcript({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
            }
            await data.save()
                .catch(err =>  console.log(err))
            console.log('data is saved ')
        })

	},
};