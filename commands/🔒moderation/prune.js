module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	args: true,
	usage: '<number>',
	guildOnly: true,
	cooldown: 1,
	aliases: ['purge', 'delete','clear', 'clean', 'cls'],
	execute(message, args) {
		const Discord = require('discord.js');
		const amount = parseInt(args[0]) + 1;

		if(!message.member.permissions.has("MANAGE_MESSAGES")){
			const PermErrorEmbed = new Discord.MessageEmbed()
			.setTitle('Missing Permission!')
			.setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
			.addFields(
				{name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
				{name: '__Permission:__' , value: '`MANAGE MESSAGES`',inline: true},
			)
			.setColor(5158332)
			.setFooter('Fact:')
			return message.reply(PermErrorEmbed)
		}

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};