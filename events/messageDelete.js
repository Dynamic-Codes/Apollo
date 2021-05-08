module.exports = {
	name: 'messageDelete',
	execute(message, client) {
        message.channel.send(
            new MessageEmbed()
                .setColour('RED')
                .SetAuthor('Message Delete', executor.avatarURL())
                .setDescription(
                    `**Author:** ${message.author.username}#${message.author.discriminator}
                    **Channel:** ${message.channel}
                    **Content:** \`\`\`${message.content}\`\`\``
                )
        )
	},
};