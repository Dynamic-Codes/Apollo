module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client) {
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: member.guild.id
        });

        let chx = guildProfile.auditLogID;

        let role = guildProfile.joinRoleID;

        if(!guildProfile.auditLogID) return;

        let welcomeRole = member.guild.roles.cache.get(role);
 
        member.roles.add(welcomeRole);

        const Discord = require('discord.js')
        client.channels.cache.get(chx).send(
            new Discord.MessageEmbed()
                .setDescription(
                    `**User:** ${member.username}#${member.discriminator}`
                )
                .setColor('GREEN')
                .setFooter('Member Join')
        )
	},
};