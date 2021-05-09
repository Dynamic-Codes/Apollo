module.exports = {
    name: 'beg',
    description: 'Gain some free credits or get rejected by space and time',
    cooldown: 30,
    guildOnly: true,
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js');

        const chance = Math.floor(Math.random() * 10) + 1;
        if(chance >= 1 && chance <= 5) {
            const array = [
                'Apollo has kindly given you some',
                'This star only had this much..',
                'Earthlings have donated..',
                'This satelite stored a few credits',
                'HOLY MILKYWAY! The white hole shot credits!!',
                '#BegNation threw some at you..',
                'You begged Meteor and it blessed you with',
                'Why? I- How?! You used a wormhole and got',
                'Jupiter gave you some for #BegProject..'
            ];

            const coinsToGive = Math.floor(Math.random() * 150) + 3; 
            message.channel.send(`${array[Math.floor(Math.random() * 8)]} :coin: ${coinsToGive} credits `)

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
                'This star burnt there credits! Yikes...',
                'Space Pirates don\'t donate to beggers!',
                'Mars only gives red Credits tho?',
                'Looks like this satelight is orbiting way to fast..',
                'HOLY MILKYWAY! Oh wait.. nvm- you found no one to beg to.',
                '#BegNation ran out of there daily stonks.',
                'You begged Meteor and got slammed in the face! Try not to do it again XD',
                'Wormholes are great but are unreliable!',
                '#BegProject fundings got sucked into a blackhole..',
                'Pika gave you 25 fake credits, sliced them up in your face, and sliced you too. Might not wanna ask her again! 👀'
            ];

            message.channel.send(array[Math.floor(Math.random() * 9)]);
        }
    },
};