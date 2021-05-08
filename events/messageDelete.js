module.exports = {
	name: 'messageDelete',
	execute(message, client) {
		const LOG = getLog.entries.first()
        if (!LOG) return;

        const { executor } = LOG;

        message.channel.send(
            new MessageEmbed()
                .setColour('RED')
                .SetAuthor('Message Delete', executor.avatarURL())
                .setDescription(
                    `**Deleted by:** ${executor.username}#${executor.discriminator}
                    **Author:** ${message.author.username}#${message.author.discriminator}
                    **Channel:** ${message.channel}
                    **Content:** \`\`\`${message.content}\`\`\``
                )
        )
	},
};