module.exports = {
	name: 'clickButton',
	async execute(button, client) {
        const Discord = require('discord.js')
        if (button.id === 'ping') {
            button.defer()
            button.setDisabled()
            button.channel.send('Pong!');
        }

        if (button.id === 'cool') {
            button.defer()
            button.setDisabled()

            const embed = new Discord.MessageEmbed()
                .setTitle('Yes indeed!')
                .setDescription('🤩 Having fun? Click some more!')
                .setColor('GREEN')

            const b3 = new MessageButton()
                .setStyle('gray')
                .setLabel('More?')
                .setID('more')

            button.message.edit(button: b3, embed: embed)

        }
	},
};