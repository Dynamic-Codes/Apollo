module.exports = {
        name: 'warns',
        description: 'Show the warnings of a user',
        args: true,
        usage: '<@user>',
        guildOnly: true,
        cooldown: 10,
        execute(message, args, client) {
                const db = require('../../models/warnSchema')
                const mongoose = require('mongoose');
                const { MessageEmbed } = require('discord.js')
                const Discord = require('discord.js')

                if(!message.member.permissions.has("MANAGE_MESSAGES")){
                    const PermErrorEmbed = new Discord.MessageEmbed()
                    .setTitle('Missing Permission!')
                    .setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
                    .addFields(
                        {name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
                        {name: '__Permission:__' , value: '`MANAGEGUILD`',inline: true},
                    )
                    .setColor(5158332)
                    .setFooter('Fact: Our closest star system has 3 stars, one of its planets is called Proxima B!')
                    return message.reply(PermErrorEmbed)
                }

                const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                if(!user) return message.channel.send('꒰⚠꒱ ꒦ Please mention a valid user! ꒷')
                const reason = args.slice(1).join(" ")
                db.findOne({ guildID: message.guild.id, userID: user.user.id}, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        message.channel.send(new MessageEmbed()
                            .setTitle(`${user.user.tag}'s warns`)
                            .setDescription(
                                data.content.map(
                                    (w, i) => 
                                    `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                                )
                            )
                            .setColor("BLUE")
                        )
                    } else {
                        message.channel.send('꒰ℹ꒱ ꒦ No warning data found for user! ꒷')
                    }

                })
        }
};