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

        let timeout = 86400000;

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

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let totalSecondsRAW = ms(timeout - (Date.now() - daily));
            let duration = ms(totalSecondsRAW)

            const seconds = Math.floor((duration / 1000));
            const minutes = Math.floor((duration / 60000));
            const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            let uptime = `${hours}h ${minutes}m ${seconds}s`;
            console.log(`Uptime Val: ${uptime}`);

            let timeEmbed = new Discord.MessageEmbed()
                .setTitle(`ApolloUtility | Cooldown`)
                .setDescription('Testing cooldown data info remain while bot restarts..')
                .addField('Try again in:', `${uptime}`)
                .setTimestamp()
                .setFooter(`ApolloProject | Owner Only 🚀`)
            message.channel.send(timeEmbed)
        } else {
            await Balance.findOneAndUpdate({ userID: message.author.id}, { dailyCool: balanceProfile.dailyCool = Date.now(), lastEdited: Date.now() });
            message.channel.send('\`APOLLOPROJECT\` | Utility Test Mode\n\nCommand started..')
        }

    }
};