module.exports = {
    name: 'lock',
    description: 'Lock and Unlock channels!',
    args: true,
    usage: '<on/off>',
    guildOnly: true,
    aliases: ['ex', 'eg'],
    execute(message, args, client) {
        const Discord = require('discord.js')
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');

        if(!message.member.permissions.has("MANAGE_GUILD")){
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

        const LockEmb = new Discord.MessageEmbed()
        .setTitle('🔒 LOCKDOWN ACTIVE')

        const UnlockEmb = new Discord.MessageEmbed()
        .setTitle('🔓 LOCKDOWN DISABLED')

        
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send(LockEmb)
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send(UnlockEmb)
        }
    }
};

