module.exports = {
    name: 'withdraw',
    description: 'Take your Bars from Halo\'s Vault to your wallet!',
    usage: '<amount>',
    guildOnly: true,
    ownerOnly: true,
    aliases: ['with'],
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const GBars = '<:GalacticBars:840313364278280202>'

        const depMoney = args[0]

        if (isNaN(depMoney)) return message.channel.send(`꒰ℹ꒱ ꒦ What type of amount is ${depMoney}? ꒷`)
        const takeMoney = Number(depMoney)

        let balanceProfile = await Balance.findOne({ userID: message.author.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (depMoney > balanceProfile.bank) return message.channel.send(`꒰⚠꒱ ꒦ Mama Moons! You don't have that much in your bank! ꒷`); // when u don't have enough money in bank

        await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + takeMoney, bank: balanceProfile.bank - depMoney, lastEdited: Date.now() });

        const BalEmbed = new Discord.MessageEmbed()
            .setTitle(`Withdrawed ${GBars}${depMoney} Galactic Bars!`)
            .setColor('#5234d9')
            .setTimestamp()
            .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(BalEmbed)
    }
};