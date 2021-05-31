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

        if(!message.member.permissions.has("MANAGE_MESSAGES")){
			const PermErrorEmbed = new Discord.MessageEmbed()
			.setTitle('Missing Permission!')
			.setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
			.addFields(
				{name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
				{name: '__Permission:__' , value: '`MANAGE MESSAGES`',inline: true},
			)
			.setColor(5158332)
			.setFooter('Fact: There is a galaxy called Fireworks in our universe!')
			return message.reply(PermErrorEmbed)
        }

        const guildRole = guildProfile.muteRoleID
        if (!guildRole) return message.channel.send(`꒰⚠꒱ ꒦ Please set up a mute role! use \`${guildProfile.prefix}settings muteRoleID <role-ID>\` ꒷`)

        const muteRole = message.guild.roles.cache.get(guildRole);

        const mentionMember = message.mentions.members.first() || message.guild.cache.get(args[0])
        const member = message.guild.members.resolve(mentionMember);
        let time = args[1]
        let reason = args.slice(2).join(" ")

        const muteEmbed = new MessageEmbed()
            .setTitle(`You have been muted in ${message.guild.name}`)
            .addField(`Duration: ${time}`, `Reason: ${reason}`)
            .setColor('#ff00ff')
            .setTimestamp()
        
        const ChannelMute = new MessageEmbed()
            .setTitle(`꒰🔇꒱ ꒦ Muted User ꒷`)
            .setColor('#ff00ff')
            .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        
        if (!mentionMember) return message.channel.send('꒰ℹ꒱ ꒦ The member is not in this server. ꒷')
        if (mentionMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('꒰⚠꒱ ꒦ You can not mute this member! ꒷')
        if (!time) return message.channel.send(`꒰ℹ꒱ ꒦ You must state duration! Format: \`${guildProfile.prefix}mute @user 1m reason\` ꒷`)
        if (!reason) reason = 'No reason given.'

        await mentionMember.roles.add(muteRole).catch(err => console.log(err))
        await mentionMember.send(muteEmbed).catch(err => console.log(err))
        message.channel.send(ChannelMute)

        setTimeout(async function () {
            await mentionMember.roles.remove(muteRole).catch(err => console.log(err))
            await mentionMember.send(`꒰⭐꒱ ꒦ You are no longer muted in ${message.guild.name}! ꒷`).catch(err => console.log(err))
        },ms(time));

    }
};