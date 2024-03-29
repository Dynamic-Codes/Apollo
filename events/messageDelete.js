module.exports = {
	name: 'messageDelete',
	async execute(message, client) {

        if (message.author.bot) return
        const Guild = require('../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });

        let chx = guildProfile.auditLogID;

        if(!guildProfile.auditLogID) return;

        const Discord = require('discord.js')
        client.channels.cache.get(chx).send(
            new Discord.MessageEmbed()
                .setTitle(`${message.author.username}`)
                .setDescription('🗑 | Messaged deleted.')
                .addField('__Channel__', `${message.channel}`)
                .addField('__Content__', `${message.content}`)
                .setColor('RED')
                .setFooter('Message Delete', message.author.displayAvatarURL({ dynamic: true }))
        )
	},
};