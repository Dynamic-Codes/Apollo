module.exports = {
	name: 'clickButton',
	async execute(button, client) {
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
	},
};