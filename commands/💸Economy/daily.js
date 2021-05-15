module.exports = {
    name: 'daily',
    description: 'Collect your daily Galactic Credits!',
    cooldown: 5,
    guildOnly: true,
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js');
        const ms = require("ms");

        const GCoins = '<:GalacticCurrency:840312897187217468>'

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

        let timeout =  86399990;

        if ((Date.now()) < daily) {
            let TimeRemainRAW = ( daily - Date.now() )
            let mili = ms(TimeRemainRAW)

            const embed = new Discord.MessageEmbed()
                .setTitle('✅| Already Claimed!')
                .addField('Come back in', `\`${mili}\` Galactic Time!`)
                .setColor('YELLOW')

            message.channel.send(embed)
        } else {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 5000 ,dailyCool: balanceProfile.dailyCool = CoolOver, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setTitle('🎉| Daily Bonus Claimed')
                .setDescription(`${GCoins}5000 have landed in your account!\n\nYou can get lots more by joining our support server and taking parts in events!\n[Mission Control](https://discord.gg/2NYj5yHAGr) `)
                .addField('Balance Now', `${GCoins}${balanceProfile.balance}`)
                .setColor('PURPLE')

            message.channel.send(embed)
        }

    },
};