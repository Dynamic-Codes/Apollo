module.exports = {
        name: 'warn',
        description: 'Warn a user!',
        args: true,
        usage: '<@user> <reason>',
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
                        {name: '__Permission:__' , value: '`MANAGE_MESSAGES`',inline: true},
                    )
                    .setColor(5158332)
                    .setFooter('Fact: The whole visible universe is slowly moving away! Scary..')
                    return message.reply(PermErrorEmbed)
                }

                const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                if(!user) return message.channel.send('User not found.')
                const reason = args.slice(1).join(" ")
                db.findOne({ guildID: message.guild.id, userID: user.user.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) {
                        data = new db({
                            _id: mongoose.Types.ObjectId(),
                            guildID: message.guild.id,
                            userID: user.user.id,
                            content: [
                                {
                                    moderator : message.author.id,
                                    reason : reason
                                }
                            ]
                        })
                    } else {
                        const obj = {
                            moderator: message.author.id,
                            reason : reason
                        }
                        data.content.push(obj)
                    }
                    data.save()
                });
                user.send(new MessageEmbed()
                    .setDescription(`You have been warned for ${reason}`)
                    .setColor("RED")
                )
                message.channel.send(new MessageEmbed()
                    .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
                )
        }
};