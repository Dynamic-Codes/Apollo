module.exports = {
	name: 'messageDelete',
	execute(message, client) {
        const Discord = require('discord.js')
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('RED')
                .SetAuthor('Message Delete', message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(
                    `**Author:** ${message.author.username}#${message.author.discriminator}
                    **Channel:** ${message.channel}
                    **Content:** \`\`\`${message.content}\`\`\``
                )
        )
	},
};