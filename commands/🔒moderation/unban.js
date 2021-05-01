module.exports = {
    name: 'unban',
    description: 'Unban a user using there id.',
    args: true,
    usage: '<user-id>',
    guildOnly: true,
    execute(message, args, client) {
        const Discord = require('discord.js')
        const { MessageEmbed } = require('discord.js')

        if(!message.member.permissions.has("BAN_MEMBERS")){
			const PermErrorEmbed = new Discord.MessageEmbed()
			.setTitle('Missing Permission!')
			.setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
			.addFields(
				{name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
				{name: '__Permission:__' , value: '`BAN MEMBERS`',inline: true},
			)
			.setColor(5158332)
			.setFooter('Fact: The word Dinosaur comes from the Greek Language and means \'terrible lizard\'!')
			return message.reply(PermErrorEmbed)
        }

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send('Not a valid user!').then(m => m.delete({ timeout: 5000 }));
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {
                embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
                    .setColor('#00ff00')
                    .addField('User ID', user.user.id, true)
                    .addField('user Tag', user.user.tag, true)
                    .addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
                    .addField('Unbanned Reason', reason)
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`User ${member.tag} isn't banned!`)
                    .setColor('#ff0000')
                message.channel.send(embed)
            }

        }).catch(e => {
            console.log(e)
            message.channel.send('An error has occurred!')
        });

    }
};