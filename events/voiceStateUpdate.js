module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState, client) {
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: oldState.guild.id
        });

        let chx = guildProfile.auditLogID;

        if(!guildProfile.auditLogID) return;

        const Discord = require('discord.js')

        let user = client.users.cache.get(newState.id)
        let oldVoice = client.channels.cache.get(oldState.channelID)
        let newVoice = client.channels.cache.get(newState.channelID)

        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}`)
        .setColor('BLUE')
        .setFooter('Voice Activity', user.displayAvatarURL({ dynamic: true }))

        if (newVoice) embed.setDescription(`📥 | Has joined \`${newVoice.name}\``)
        if (oldVoice && !newVoice) embed.setDescription(`📤 | Has left \`${oldVoice.name}\``)

        client.channels.cache.get(chx).send(embed)
	},
};