module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client) {
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });

        let chx = guildProfile.auditLogID;

        let role = guildProfile.joinRoleID;

        if(!guildProfile.auditLogID) return;

        let welcomeRole = guildMember.guild.roles.cache.get(role);
 
        guildMember.roles.add(welcomeRole);

        const Discord = require('discord.js')
        client.channels.cache.get(chx).send(
            new Discord.MessageEmbed()
                .setDescription(
                    `**User:** ${guildMember.username}#${guildMember.discriminator}`
                )
                .setColor('GREEN')
                .setFooter('Member Join', guildMember.displayAvatarURL({ dynamic: true }))
        )
	},
};