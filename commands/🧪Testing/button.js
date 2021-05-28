module.exports = {
        name: 'button',
        description: 'A test command to check out the new button feature!',
        guildOnly: true,
        cooldown: 5,
        async execute(message, args, client) {
                const Discord = require('discord.js')
                const { MessageButton } = require('discord-buttons')

                const embed = new Discord.MessageEmbed()
                        .setTitle('Discord Buttons!')
                        .setDescription('🤩 Click the buttons below and test them out!')
                        .setColor('ORANGE')

                const b1 = new MessageButton()
                        .setStyle('blurple')
                        .setLabel('Ping!')
                        .setID('ping')

                const b2 = new MessageButton()
                        .setStyle('green')
                        .setLabel('Cool?')
                        .setID('cool')

                const b3 = new MessageButton()
                        .setStyle('grey')
                        .setLabel('More?')
                        .setID('more')

                message.channel.send('🚀 GALACTASTIC!', {
                        buttons: [b1, b2, b3],
                        embed: embed
                })
        }
};