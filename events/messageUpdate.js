module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage, client) {
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: oldMessage.guild.id
        });

        let chx = guildProfile.auditLogID;

        if(!guildProfile.auditLogID) return;

        const Discord = require('discord.js')
        client.channels.cache.get(chx).send(
            new Discord.MessageEmbed()
                .setDescription(
                    `**Author:** ${oldMessage.author.username}#${oldMessage.author.discriminator}
                    **Channel:** ${oldMessage.channel}
                    **Before:** \`\`\`${oldMessage.content}\`\`\`
                    **After** \`\`\`${newMessage.content}\`\`\``
                )
                .setColor('YELLOW')
                .setFooter('Message Edited', oldMessage.author.displayAvatarURL({ dynamic: true }))
        )
	},
};