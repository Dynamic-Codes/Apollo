module.exports = {
    name: 'mute',
    description: 'Mute a member for a certain period of time.',
    args: true,
    usage: '<@user> <time> [reason]',
    guildOnly: true,
    aliases: ['tempmute'],
    async execute(message, args, client) {
        const Discord = require('discord.js')
        const ms = require('ms')
        const { MessageEmbed } = require('discord.js')

        const Guild = require('../../models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });

        const guildRole = guildProfile.muteRoleID
        if (!guildRole) return message.channel.send(`꒰⚠꒱ ꒦ Please set up a mute role! use \`${guildProfile.prefix}settings muteRoleID <role-ID>\` ꒷`)

        const muteRole = message.guild.roles.cache.get(guildRole);

        const mentionMember = message.mentions.members.first() || message.guild.cache.get(args[0])
        let time = args[1]
        let reason = args.slice(2).join(" ")

        const muteEmbed = new MessageEmbed()
            .setTitle(`You have been muted in ${message.guild.id}`)
            .addField(`Duration: ${time}`, `Reason: ${reason}`)
            .setTimestamp()
        
        if (!mentionMember) return message.channel.send('꒰ℹ꒱ ꒦ The member is not in this server. ꒷')
        if (!mentionMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('꒰⚠꒱ ꒦ You can not mute this member! ꒷')
        if (!time) return message.channel.send(`꒰ℹ꒱ ꒦ You must state duration! Format: \`${guildProfile.prefix}mute @user 1m reason\` ꒷`)
        if (!reason) reason = 'No reason given.'

        await mentionMember.roles.add(muteRole).catch(err => console.log(err))
        await mentionMember.send(muteEmbed).catch(err => console.log(err))

        setTimeout(async function () {
            await mentionMember.roles.remove(muteRole).catch(err => console.log(err))
            await mentionMember.send(`꒰⭐꒱ ꒦ You are no longer muted in ${message.guild.name}! ꒷`).catch(err => console.log(err))
        },ms(time));

    }
};