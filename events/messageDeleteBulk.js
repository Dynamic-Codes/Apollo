module.exports = {
	name: 'messageDeleteBulk',
	async execute(messages) {
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });

        let chx = guildProfile.auditLogID;

        if(!guildProfile.auditLogID) return;

        const Discord = require('discord.js')
        client.channels.cache.get(chx).send(
            new Discord.MessageEmbed()
                .setDescription(
                    `**Channel:** ${messages.channel}
                    **Content:** \`\`\`${message.content}\`\`\``
                )
                .setColor('ORANGE')
                .setFooter('Message Bulk Delete')
        )
	},
};