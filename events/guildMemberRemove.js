module.exports = {
	name: 'guildMemberRemove',
	async execute(member, client) {
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: member.guild.id
        });

        let chx = guildProfile.auditLogID;

        if(!guildProfile.auditLogID) return;

        let user1 = client.users.cache.get(member.id)

        const Discord = require('discord.js')
        client.channels.cache.get(chx).send(
            new Discord.MessageEmbed()
                .setTitle(`${user1.username}`)
                .setDescription(`👋 | Has left the server`)
                .setColor('RED')
                .setFooter('Member Left', user1.displayAvatarURL({ dynamic: true }))
        )
	},
};