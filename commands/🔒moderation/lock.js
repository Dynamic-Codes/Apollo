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
                    channel.send(LockEmb)
                })
            })
            return message.channel.send('locked all channels');
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                        channel.send(UnlockEmb)
                    }
                )
            })
            return message.channel.send('unlocked all channels')
        }
    }
};

