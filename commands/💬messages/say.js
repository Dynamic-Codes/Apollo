module.exports = {
	name: 'say',
    description: 'send messages through the bot! Including embeds.',
    args: true,
    usage: '<message> or embed <message>',
    guildOnly: true,
	execute(message, args) {
        const Discord = require('discord.js');
        const amount = (args[0]);
		if (amount.toLowerCase() === "embed") {
            message.channel.bulkDelete(1);
            mentionMessage1 = message.content.slice(12);
            const randomBetween = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

            const color = [
                randomBetween(0, 255),
                randomBetween(0, 255),
                randomBetween(0, 255),
            ];
            const sayEmbed = new Discord.MessageEmbed()
            .setDescription(mentionMessage1)
            .setColor(color)
            return message.channel.send(sayEmbed)
        }
        message.channel.bulkDelete(1);
        mentionMessage1 = message.content.slice(6);
        message.channel.send(mentionMessage1);
        mentionchannel = message.channel.name            
        console.log('Message Sent on ' + mentionchannel + ' by ' + message.author.username)
	},
};