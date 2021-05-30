module.exports = {
	name: 'love',
    description: 'See how much you love someone!',
    args: true,
    usage: '<Person 1> <persone 2>',
	execute(message, args) {
        const Discord = require('discord.js');
        const client = new Discord.Client();
 
        const person1 = (args[0])
        let person2 = (args[1])


        // love is the percentage
        // loveIndex is a number from 0 to 10, based on that love variable
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        if (person1 === "dynamic" && person2 === "honey"){
            const love = 100
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
            const embed = new Discord.MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person1}** loves **${person2}** this much:`, `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

            return message.reply(embed);
        }

        if (person1 === "cacti" && person2 === "dynamic"){
            const love = 100
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
            const embed = new Discord.MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person1}** loves **${person2}** this much:`, `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

            return message.reply(embed);
        }

        const embed = new Discord.MessageEmbed()
        .setColor("#ffb6c1")
        .addField(`☁ **${person1}** loves **${person2}** this much:`, `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    }

};