const { INTEGER } = require('sequelize');

module.exports = {
    name: 'deposite',
    description: 'Send your galactic credits to Halo\'s Vault!',
    usage: '<amont>',
    guildOnly: true,
    aliases: ['dep'],
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const GBars = '<:GalacticBars:840313364278280202>'

        const depMoney = args[0]

        if (isNaN(depMoney)) return message.channel.send(`꒰ℹ꒱ ꒦ What type of amount is ${depMoney}? ꒷`)

        let balanceProfile = await Balance.findOne({ userID: message.author.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (depMoney > balanceProfile.balance) return message.channel.send(`꒰⚠꒱ ꒦ Where in the solar system did you get that much money?! ꒷`) // when u don't have enough money
        if ((balanceProfile.bankLimit - balanceProfile.bank) > depMoney) return(`꒰ℹ꒱ ꒦ Halo's vault doesn't have that much storage! ꒷`) // When you don't have enough space

        await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - depMoney, bank: balanceProfile.bank + depMoney , lastEdited: Date.now() });

        const BalEmbed = new Discord.MessageEmbed()
            .setTitle(`Deposited ${depMoney}!`)
            .setColor('#5234d9')
            .setTimestamp()
            .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(BalEmbed)
    }
};