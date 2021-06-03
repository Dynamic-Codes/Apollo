module.exports = {
	name: 'clickButton',
	async execute(button, message, args, client) {
                const Discord = require('discord.js')
                const { MessageButton } = require('discord-buttons')

                if (button.id === 'ColorBtn') {
                await button.defer();

                var randomColor = Math.floor(Math.random()*16777215).toString(16);
                var HexColor = "#" + randomColor

                const embed = new Discord.MessageEmbed()
                        .setTitle(HexColor)
                        .setColor(HexColor)

                const ColorBtn = new MessageButton()
                        .setStyle('blurple')
                        .setLabel('More!')
                        .setID('ColorBtn')

                button.message.edit({button: ColorBtn, embed: embed})
                }

                // DISCORD TICKET AREA ---------------------------------------------

                if (button.id === 'ticketStart') {
                        const Ticket = require('../models/ticketSchema')
                        let ticketProfile = await Ticket.findOne({
                        guildID: button.guild.id
                        });

                        let chx = ticketProfile.ParentSection;

                        await button.defer();

                        const channel = await button.guild.channels.create(`ticket: ${button.clicker.user.username}`);
    
                        channel.setParent(chx);

                        channel.updateOverwrite(button.guild.id, {
                                SEND_MESSAGE: false,
                                VIEW_CHANNEL: false,
                        });
                        channel.updateOverwrite((button.clicker.member), {
                                SEND_MESSAGE: true,
                                VIEW_CHANNEL: true,
                        });

                        let StaffRole = button.clicker.member.guild.roles.cache.get(ticketProfile.TicketRole);
                        channel.updateOverwrite((StaffRole), {
                                SEND_MESSAGE: true,
                                VIEW_CHANNEL: true,
                        });

                        const TicketEmbed = new Discord.MessageEmbed()
                        .setDescription(`${ticketProfile.TickChannelMSG}`)
                        .setColor('#834ede')
                        .setTimestamp()
                        .setFooter('ApolloTickets | ', button.clicker.user.displayAvatarURL({ dynamic: true }))
                        const reactionMessage = await channel.send(TicketEmbed);

                        try {
                                await reactionMessage.react("🔒");
                                await reactionMessage.react("⛔");
                        } catch (err) {
                                channel.send("Error sending emojis!");
                                throw err;
                        }

                        const collector = reactionMessage.createReactionCollector(
                                (reaction, user) => button.guild.members.cache.find((member) => member.id === user.id).roles.cache.has(ticketProfile.TicketRole),
                                { dispose: true }
                        );

                        collector.on("collect", (reaction, user) => {
                                switch (reaction.emoji.name) {
                                        case "🔒":
                                                channel.updateOverwrite(button.clicker.member, { SEND_MESSAGES: false });
                                                break;
                                        case "⛔":
                                                const embed = new Discord.MessageEmbed()
                                                .setDescription('⛔ | This ticket will be closed and deleted!')
                                                .setColor('RED')
                                                channel.send(embed)
                                                setTimeout(() => channel.delete(), 5000);
                                                break;
                                }
                        });

                        button.channel
                        .send(`We will be right with you! ${channel}`)
                        .then((msg) => {
                                setTimeout(() => msg.delete(), 7000);
                        })
                        .catch((err) => {
                                throw err;
                        });
                }

                // DISCORD TICKET AREA END -----------
	},
};