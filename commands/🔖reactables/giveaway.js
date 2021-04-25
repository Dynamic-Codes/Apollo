module.exports = {
    name: 'giveaway',
    description: 'make awesome and neat giveaways!',
    args: true,
    usage: '<roleID - to ping>',
    guildOnly: true,
    aliases: ['ga'],
    async execute(message, args, client) {
        message.channel.bulkDelete(1)
        const { MessageCollector } = require("discord.js-collector");
        const { GiveawaysManager } = require('discord-giveaways');
        const ms = require('ms')
        const Discord = require('discord.js');
        // Starts updating currents giveaways
        const manager = new GiveawaysManager(client, {
            storage: './giveaways.json',
            updateCountdownEvery: 5000,
            hasGuildMembersIntent: false,
            default: {
                botsCanWin: false,
                embedColor: '#add8e6',
                reaction: '🎉'
            }
        });
        client.giveawaysManager = manager;
        // We now have a giveawaysManager property to access the manager everywhere!
        

        const role = args[0]

        console.log(role)

        if(pingrole === 'update') {
            return message.channel.send('updating now...')
        }
        
        const botMessage = await message.channel.send("```GIVEAWAY SETUP: Preloading...```\n> 🌠 Please wait!");

        botMessage.edit("```GIVEAWAY SETUP: 1```\n> 🌠 Enter giveaway time [(number)s/m/d]");
        const time = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```GIVEAWAY SETUP: 2```\n> 🌠 Enter giveaway winners [number]");
        message.channel.bulkDelete(1)
        const winner = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```GIVEAWAY SETUP: 3```\n> 🌠 Enter prize details!");
        message.channel.bulkDelete(1)
        const prize = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```GIVEAWAY SETUP: 4```\n> 🌠 Required giveaway? [to skip this type `no`]");
        message.channel.bulkDelete(1)
        const req = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        botMessage.edit("```GIVEAWAY SETUP: 5```\n> 🌠 Starting giveaway!");
        message.channel.bulkDelete(2)

        const time1 = String(time)
        const winner1 = String(winner)
        const prize1 = String(prize)
        

        //Giveaway stuff
        message.channel.send(role)
        client.giveawaysManager.start(message.channel, {
            time: ms(time1),
            prize: prize1,
            winnerCount: parseInt(winner1)
        }).then((gData) => {
            console.log(gData); // {...} (messageid, end date and more)
        });

        if (String(req) === 'no') {
            console.log('no req giveaway!')
        } else {
            const embed = new Discord.MessageEmbed()
            .setDescription(`Required: ${req}`)
            message.channel.send(embed)
        }
    }
};