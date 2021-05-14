module.exports = {
    name: 'search',
    description: 'Explore the universe for free galactic credits!',
    cooldown: 60,
    guildOnly: true,
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js');
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const { MessageCollector } = require("discord.js-collector");

        //Custom Search Locations

        const P = [
            'earth',
            'mars',
            'venus',
            'neptune',
            'uranus',
            'saturn',
            'jupiter',
            'mercury',
            'haumea',
            'pluto',
        ];

        const M = [
            'moon',
            'delmos',
            'pandora',
            'galatea',
            'puck',
            'atlas',
            'callisto',
            'mercury',
            'europa',
            'pandia',
        ];

        const G = [
            'Milkyway',
            'Fireworks',
            'Whirlpool',
            'Tadpole',
            'cosmos7',
            'andromeda',
            'dragonfly44',
            'centaurus',
            'sombrero',
            'hoag',
        ];

        let planet = P[Math.floor(Math.random() * 9)]
        let moon = M[Math.floor(Math.random() * 9)]
        let galaxy = G[Math.floor(Math.random() * 9)]

        // Search Selector

        const embed = new Discord.MessageEmbed()
            .setTitle(`🔎 Search time!`)
            .setDescription('Where would you like to search?')
            .addField(`🌌 Locations`, `Planet: \`${planet}\`\nMoon: \`${moon}\`\nGalaxy: \`${galaxy}\``)
            .setColor('#d752ff')

        const botMessage = await message.channel.send(embed)

        const choiceSelect = await MessageCollector.asyncQuestion({
            botMessage,
            user: message.author.id,
        });
        let choice = String(choiceSelect)


        if(![`${planet}`, `${moon}`, `${galaxy}`].includes(choice)) return message.channel.send('꒰🤨꒱ ꒦ Where in the universe is that?! ꒷')

        const chance = Math.floor(Math.random() * 10) + 1;
        if(chance >= 1 && chance <= 8) {
            const coinsToGive = Math.floor(Math.random() * 600) + 3; 
            message.channel.send(`You searched ${choice} & found ${GCoins}${coinsToGive} credits `)

            let balanceProfile = await Balance.findOne({ userID: message.author.id});
            if (!balanceProfile) {
                balanceProfile = await new Balance({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    lastEdited: Date.now(),
                });
                await balanceProfile.save().catch(err => console.log(err));
            }
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + coinsToGive, lastEdited: Date.now() });
        } else {
            const array = [
                'Your tried your best but could not find it!',
                'Yikes! Looks like we ran out of fuel..',
                'Nothing here I guess?',
                'Not the place we are looking for..',
                'AHAH!! Welp, we got sucked into a blackhole.',
                'You used warp drive but got lost.. 😂',
                'You found some credits but lost them on the way.. #Oof',
                'Hello? *gets punched* Meeting space pirates ain\'t great..',
                'You met some friendly aliens and had a chat! :D',
                'This location was so far that you went RIP in space.. #YIKES',
                'Is it me or are we not slowing down... *you did not make it*',
            ];

            message.channel.send(array[Math.floor(Math.random() * 10)]);
        }
    },
};