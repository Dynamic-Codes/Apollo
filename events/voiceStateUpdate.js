module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState, client) {
        const Guild = require('../models/guildSchema')
        const Booster = require('../models/boosterSchema')
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

        // BOOSTER VC

        let boosterProfile = await Booster.findOne({
            guildID: oldState.guild.id
        });

        if (newState.channelID === boosterProfile.JoinID) {
            const member = oldState.guild.member(user);
            const BVCrole = member.guild.roles.cache.get(boosterProfile.roleID);
            if(member.roles.cache.has(BVCrole)){
                console.log('has role')
            } else if(!member.roles.cache.has(BVCrole.id)){
                member.voice.kick()
                return member.send(`Could not create VC! You need the **${BVCrole.name}** role.`)
            } else {
                console.log('err occured!')
            }
            const channel = await oldState.guild.channels.create(`${user.username} VC`, {
                type: "voice"
            });
            channel.setParent(boosterProfile.ParentSection);
            channel.updateOverwrite(oldState.guild.roles.everyone, {
                CONNECT: false
            });
            channel.updateOverwrite(user.id, {
                MANAGE_CHANNELS: true,
                CONNECT: true
            });

            member.voice.setChannel(channel)
        };

        if (oldVoice.parentID === boosterProfile.ParentSection){
            if (oldVoice.id !== boosterProfile.JoinID){
                if(oldVoice.members.size === 0){
                    oldVoice.delete('Booster VC Owner left.')
                }
            }
        }


	},
};