module.exports = {
    name: 'ticket',
    description: 'Setup and run support tickets in your server! use `a!ticket help`.',
    guildOnly: true,
    cooldown: 5,
    async execute(message, args, client) {

        const Ticket = require('../../models/ticketSchema');
        const Guild = require('../../models/guildSchema')
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const { MessageButton } = require('discord-buttons')

        if(!message.member.permissions.has("MANAGE_GUILD")){
			const PermErrorEmbed = new Discord.MessageEmbed()
			.setTitle('Missing Permission!')
			.setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
			.addFields(
				{name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
				{name: '__Permission:__' , value: '`MANAGEGUILD`',inline: true},
			)
			.setColor(5158332)
			.setFooter('Fact: The largest know star is Stephenson 2-18 at 2150 solar radii!')
			return message.reply(PermErrorEmbed)
        }

        //Profiles
        let ticketProfile = await Ticket.findOne({ guildID: message.guild.id});
        if (!ticketProfile) {
            ticketProfile = await new Ticket({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                lastEdited: Date.now(),
            });
            await ticketProfile.save().catch(err => console.log(err));
        }
        
        if (!args[0]) {
            const Embed = new Discord.MessageEmbed()
            .setTitle('🎫 | Server Ticket Setup')
            .setDescription('This is the current ticket setup for this server. If you see `NOT SETUP` in any of the sections please set them up otherwise tickets will be disabled.')
            .addField('Section ID', `${ticketProfile.ParentSection}`)
            .addField('Ticket Staff Role ID', `${ticketProfile.TicketRole}`)
            .addField('Ticket Title', `${ticketProfile.TicketTitle}`)
            .addField('Ticket Description', `${ticketProfile.TicketDescription}`)
            .addField('Ticket Message', `${ticketProfile.TickChannelMSG}`)
            .setColor('#ffbe7d')
            .setFooter('🚀 ApolloProject | Tickets')

            message.channel.send(Embed)
            message.channel.send('꒰ℹ꒱ ꒦ use `a!ticket help` for more info! ꒷')
        }

        if (args[0] === 'help') {
            const HelpEmbed = new Discord.MessageEmbed()
            .setTitle('🎫 | Support Embed')
            .setDescription('To setup tickets in your server you will need to do a few things first.')
            .addField('Step 1', 'Make a new category where all your tickets will be stored. You can name this anything you like.')
            .addField('Step 2', 'Setup your server config by running `a!ticket setup <params> <input>` you can see more detailed info below.')
            .addField('Setup Parameters', '`section`: The category ID\n`staff`: The ticket Staff role ID\n`title`: The title of your start ticket embed\n`description`: The descrip of the start ticket embed\n`message`: The message when a ticket is opened.')
            .addField('Step 3', 'Run the `a!ticket` command again and make sure there are no errors.')
            .addField('Step 4', 'Once done finally run `a!ticket start` to enable tickets! 🥳')
            .setColor('ORANGE')
            return message.channel.send(HelpEmbed) 
        }

        if (args[0] === 'setup') {
            const embed = new Discord.MessageEmbed()
            .setTitle('🎫| Setup')
            .setColor('#ffbe7d')
            if (args[1] === 'section') {
                await Ticket.findOneAndUpdate({ guildID: message.guild.id}, { ParentSection: args[2], lastEdited: Date.now() }), embed.setDescription(`✅ | Updated Section to \`${args[2]}\``)
                return message.channel.send(embed)
                
            }

            if (args[1] === 'staff') {
                await Ticket.findOneAndUpdate({ guildID: message.guild.id}, { TicketRole: args[2], lastEdited: Date.now() }), embed.setDescription(`✅ | Updated Ticket Staff Role to \`${args[2]}\``)
                return message.channel.send(embed)
                
            }

            if (args[1] === 'title') {
                let contentTITLE = args.slice(2).join(' ');
                await Ticket.findOneAndUpdate({ guildID: message.guild.id}, { TicketTitle: contentTITLE, lastEdited: Date.now() }), embed.setDescription(`✅ | Updated Ticket Title to \`${contentTITLE}\``)
                return message.channel.send(embed)
                
            }

            if (args[1] === 'description') {
                let contentDESCRIP = args.slice(2).join(' ');
                await Ticket.findOneAndUpdate({ guildID: message.guild.id}, { TicketDescription: contentDESCRIP, lastEdited: Date.now() }), embed.setDescription(`✅ | Updated Ticket Title to \`${contentDESCRIP}\``)
                return message.channel.send(embed)
                
            }

            if (args[1] === 'message') {
                let contentMSG = args.slice(2).join(' ');
                await Ticket.findOneAndUpdate({ guildID: message.guild.id}, { TickChannelMSG: contentMSG, lastEdited: Date.now() }), embed.setDescription(`✅ | Updated Ticket Title to \`${contentMSG}\``)
                return message.channel.send(embed)
                
            }
        }

        if (args[0] === 'start') {
            const embed = new Discord.MessageEmbed()
            .setTitle(`${ticketProfile.TicketTitle}`)
            .setDescription(`${ticketProfile.TicketDescription}`)
            .setColor('#7affd7')
            .setFooter('ApolloTickets', client.user.displayAvatarURL({ dynamic: true }))

            const channel = await message.guild.channels.create(`🎫Help`);
    
            channel.setParent(ticketProfile.ParentSection);

            channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            });

            const b1 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Open Ticket!')
            .setID('ticketStart')

            channel.send({
                buttons: [b1],
                embed: embed
            })
        }
    }
};