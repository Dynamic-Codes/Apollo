module.exports = {
        name: 'colour',
        description: 'Get a random colour with Hex code!',
        guildOnly: true,
        ownerOnly: true,
        cooldown: 5,
        aliases: ['color'],
        async execute(message, args, client) {
                const Discord = require('discord.js')
                const { MessageButton } = require('discord-buttons')

                var randomColor = Math.floor(Math.random()*16777215).toString(16);
                var HexColor = "#" + randomColor

                const embed = new Discord.MessageEmbed()
                        .setTitle(HexColor)
                        .setColor(HexColor)

                const b1 = new MessageButton()
                        .setStyle('blurple')
                        .setLabel('More!')
                        .setID('ColorBtn')

                message.channel.send({
                        buttons: [b1],
                        embed: embed
                })

        }
};