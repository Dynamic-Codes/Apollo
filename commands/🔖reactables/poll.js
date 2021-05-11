module.exports = {
	name: 'poll',
    description: 'Make a neat poll for your server!',
    usage: '<#channel>',
    args: true,
    guildOnly: true,
	async execute(message) {
        message.channel.bulkDelete(1)
        const { MessageCollector } = require("discord.js-collector");
        const Discord = require('discord.js');
        const botMessage = await message.channel.send("```POLL SETUP: CONFIG 1```\n> 🌠 Enter Poll Title");
        let channel = message.mentions.channels.first();

        const pollTitle = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```POLL SETUP: CONFIG 2```\n> 🌠 Enter Poll Footer")
        message.channel.bulkDelete(1)
        const pollFooter = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```POLL SETUP: CONFIG 3```\n> 🌠 Enter Options! Example: \"Pizza\" \"Burger\" \"Tacos\"")
        message.channel.bulkDelete(1)
        const poll = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```POLL SETUP: CONFIG 4```\n> 🌠 Enter Embed Colour: Hex code only! (Defualt: #979c9f)")
        message.channel.bulkDelete(1)
        const EmbHex = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        const EmbColour = String(EmbHex)
        message.channel.bulkDelete(2)
        const polls = String(poll)
        const regex = polls.match(/"[^"]+"|[\\S]+"[^"]+/g)

        if(regex.length > 9) {
            return message.reply('You can only have 9 poll options at max!')
        }

        let str = ''
        let emojis = [
            '🌍',
            '🌙',
            '🪐',
            '⭐',
            '☀',
            '🌌',
            '🚀',
            '🛰',
            '👩‍🚀'
        ]

        let i = 0

        for(const poll of regex) {
            str = str + `${emojis[i]} ${poll}\n\n`
            i++
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(pollTitle)
            .setDescription(str.replace(/"/g, ''))
            .setThumbnail('https://media.discordapp.net/attachments/834833274265272320/835225433888784384/pollimg.png')
            .setColor(EmbColour)
            .setFooter(pollFooter)
        const msg = await channel.send(embed)
        channel.send({
            files: ['./assets/divrainbow.gif']
        });

        const embedCheck = new Discord.MessageEmbed()
            .setTitle('🥳 Poll Created!!')
            .setDescription(`Check it out in ${channel}!`)
            .setColor('#00FF00')
            .setFooter('Made by Dynamic :)')
        message.channel.send(embedCheck)

        for(let i = 0; i < regex.length; i++) {
            msg.react(emojis[i])
        }

    }
};