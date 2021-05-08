module.exports = {
	name: 'messageDelete',
	execute(message) {
        const Discord = require('discord.js')
        message.channel.send(
            new Discord.MessageEmbed()
                .setDescription(
                    `**Author:** ${message.author.username}#${message.author.discriminator}
                    **Channel:** ${message.channel}
                    **Content:** \`\`\`${message.content}\`\`\``
                )
                .setColor('RED')
                .setFooter('Message Delete', message.author.displayAvatarURL({ dynamic: true }))
        )
	},
};