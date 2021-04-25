module.exports = {
	name: 'ban',
    description: 'Ban a member of the server.',
    args: true,
    usage: '<@user> <reason>',
    guildOnly: true,
	execute(message, args) {
        const Discord = require('discord.js');


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
        
        const reason = args.slice(1).join(' ');
        const user = message.mentions.users.first();
        if (user) {
        const member = message.guild.member(user);
        if (member) {
                member
                .ban({
                    reason: `${reason}`,
                })
                .then(() => {
                    message.reply(`Successfully banned ${user.tag}`);
                })
                .catch(err => {
                    message.reply('I was unable to ban the member');
                    console.error(err);
                });
            } else {
                message.reply("That user isn't in this guild!");
            }
            } else {
            message.reply("You didn't mention the user to ban!");
            }
        }
};