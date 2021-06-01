module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState, client) {
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });

        let chx = guildProfile.auditLogID;

        if(!guildProfile.auditLogID) return;

        const Discord = require('discord.js')

        let user = client.user.cache.get(newState.id)
        let oldVoice = client.channels.cache.get(oldState.channel.id)
        let newVoice = client.channels.cache.get(newState.channel.id)

        const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}`)
        .setColor('BLUE')
        .setFooter('Voice Activity', client.author.displayAvatarURL({ dynamic: true }))

        if (newVoice) return embed.setDescription(`📥 | Has joined ${newVoice.name}`)
        if (oldVoice && !newVoice) return embed.setDescription(`📤 | Has left ${oldVoice.name}`)

        client.channels.cache.get(chx).send(embed)
	},
};