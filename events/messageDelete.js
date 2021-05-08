module.exports = {
	name: 'messageDelete',
	execute(message, client) {
        const Discord = require('discord.js')
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Apollo Log | DELETE')
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