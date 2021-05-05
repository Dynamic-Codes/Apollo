module.exports = {
    name: 'setchannel',
    description: 'Server settings for comamnd channels',
    args: true,
    usage: '<setting> <#channel> | Settings: `suggestion` + more comming soon!',
    guildOnly: true,
    aliases: ['sChannel', 'sc'],
    execute(message, args, client) {
        const db = require('quick.db')
        const Discord = require('discord.js')

        message.channel.bulkDelete(1)

        if(!message.member.permissions.has("MANAGE_GUILD")){
			const PermErrorEmbed = new Discord.MessageEmbed()
			.setTitle('Missing Permission!')
			.setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
			.addFields(
				{name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
				{name: '__Permission:__' , value: '`MANAGEGUILD`',inline: true},
			)
			.setColor(5158332)
			.setFooter('Fact: Apollo was first named after a poll command!')
			return message.reply(PermErrorEmbed)
        }

        let channel = message.mentions.channels.first()

        if(!channel){
            return message.channel.send('⚠ | Please mention a channel next time!')
        }

        if(args[0] === 'suggestion') {
            db.set(`sugchannel_${message.guild.id}`, channel.id)
            return message.channel.send(`✅| Suggestion channel set to ${channel}!`)
        } else {
            message.reply('⚠ | No setting found or an error occured!')
        }

    }
};