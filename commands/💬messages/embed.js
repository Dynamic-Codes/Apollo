module.exports = {
	name: 'embed',
    description: 'Make a neat Embed Posts for your server!',
    usage: '<#channel>',
    args: true,
    guildOnly: true,
    aliases: ['emb'],
	async execute(message) {
        message.channel.bulkDelete(1)
        const { MessageCollector } = require("discord.js-collector");
        const Discord = require('discord.js');
        const botMessage = await message.channel.send("```EMBED SETUP: CONFIG 1```\n> 🌠 Enter Embed Title");
        let channel = message.mentions.channels.first();

        const EmbTitle = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```EMBED SETUP: CONFIG 2```\n> 🌠 Enter Embed Main Text")
        message.channel.bulkDelete(1)
        const EmbDescrip = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```EMBED SETUP: CONFIG 3```\n> 🌠 Enter Embed Footer")
        message.channel.bulkDelete(1)
        const EmbFooter = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```EMBED SETUP: CONFIG 4```\n> 🌠 Enter Embed Colour: Hex code only! (Defualt: #979c9f)")
        message.channel.bulkDelete(1)
        const EmbHex = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        const EmbColour = String(EmbHex)
        message.channel.bulkDelete(2)

        const embed = new Discord.MessageEmbed()
            .setTitle(EmbTitle)
            .setDescription(EmbDescrip)
            .setColor(EmbColour)
            .setFooter(EmbFooter)
        channel.send(embed)
        
        const embedCheck = new Discord.MessageEmbed()
            .setTitle('🥳 Embed Created!')
            .setDescription(`Check it out in ${channel}!`)
            .setColor('#00FF00')
            .setFooter('Made by Dynamic :)')
        message.channel.send(embedCheck)
    }
};