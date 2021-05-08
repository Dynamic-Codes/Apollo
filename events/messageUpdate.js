module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
        const Discord = require('discord.js')
        oldMessage.channel.send(
            new Discord.MessageEmbed()
                .setDescription(
                    `**Author:** ${oldMessage.author.username}#${oldMessage.author.discriminator}
                    **Channel:** ${oldMessage.channel}
                    **Before:** \`\`\`${oldMessage.content}\`\`\`
                    **After** \`\`\`${newMessage.content}\`\`\``
                )
                .setColor('YELLOW')
                .setFooter('Message Delete', message.author.displayAvatarURL({ dynamic: true }))
        )
	},
};