module.exports = {
    name: 'delwarn',
    description: 'Deletes a warning from the user.',
    args: true,
    usage: '<@user> <warning-number>',
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
				{name: '__Permission:__' , value: '`MANAGE MESSAGES`',inline: true},
			)
			.setColor(5158332)
			.setFooter('Fact: Jupiter has saved Earth from many large objects in space!')
			return message.reply(PermErrorEmbed)
        }

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildID : message.guild.id, userID: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('deleted the warn')
                data.save()
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
    }
};