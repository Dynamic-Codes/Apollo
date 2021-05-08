module.exports = {
	name: 'messageDelete',
	execute(message, client) {
        const Guild = require('../../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });

        let chx = guildProfile.auditLogID;

        if(!guildProfile.auditLogID) return;

        const Discord = require('discord.js')
        client.channels.cache.get(chx).send(
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