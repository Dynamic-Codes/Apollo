module.exports = {
	name: 'clickButton',
	async execute(button, client) {
        const Discord = require('discord.js')
        const { MessageButton } = require('discord-buttons')
        
        if (button.id === 'ping') {
            button.defer()
            button.channel.send('Pong!');
        }

        if (button.id === 'cool') {
            button.defer()

            const embed = new Discord.MessageEmbed()
                .setTitle('Yes indeed!')
                .setDescription('🤩 Having fun? Click some more!')
                .setColor('GREEN')

            const b3 = new MessageButton()
                .setStyle('gray')
                .setLabel('More?')
                .setID('more')

            button.message.edit({button: b3, embed: embed})

        }

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
	},
};