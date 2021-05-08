module.exports = {
	name: 'userUpdate',
	async execute(oldUser, newUser, client) {
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
                    `**User Before** ${oldUser.username}#${oldUser.discriminator}
                    **User After** ${newUser.usename}#${newUser.discriminator}`
                )
                .setColor('PURPLE')
                .setFooter('User Updated', oldMessage.author.displayAvatarURL({ dynamic: true }))
        )
	},
};