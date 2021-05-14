module.exports = {
    name: 'timeout',
    description: 'Get you on cooldown and restart bot and see if you still on cooldown',
    guildOnly: true,
    ownerOnly: true,
    async execute(message, args, client) {
        //Code here
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const ms = require("ms");

        let balanceProfile = await Balance.findOne({ userID: message.author.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        let daily = balanceProfile.dailyCool

        let timeout =  120000; //86400000;
        let currentDate = Date.now()

        if (!daily <= currentDate) {
            let totalSecondsRAW = ms(timeout - (Date.now() - daily));
            let timeRemain = ms(totalSecondsRAW)
            console.log(`Uptime Val: ${timeRemain}`);

            let timeEmbed = new Discord.MessageEmbed()
                .setTitle(`ApolloUtility | Cooldown`)
                .setDescription('Testing cooldown data info remain while bot restarts..')
                .addField('Try again in:', `${timeRemain}`)
                .setTimestamp()
                .setFooter(`ApolloProject | Owner Only 🚀`)
            message.channel.send(timeEmbed)
        } else {
            await Balance.findOneAndUpdate({ userID: message.author.id}, { dailyCool: balanceProfile.dailyCool = (currentDate + timeout), lastEdited: Date.now() });
            message.channel.send('\`APOLLOPROJECT\` | Utility Test Mode\n\nCommand started..')
        }

    }
};