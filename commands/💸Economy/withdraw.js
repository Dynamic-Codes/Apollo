module.exports = {
    name: 'withdraw',
    description: 'From Halo\'s vault to your wallet!',
    usage: '<amount>',
    guildOnly: true,
    aliases: ['with'],
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const GBars = '<:GalacticBars:840313364278280202>'

        const withMoney = args[0]

        if (isNaN(withMoney)) return message.channel.send(`꒰ℹ꒱ ꒦ What type of amount is ${withMoney}? ꒷`)

        let balanceProfile = await Balance.findOne({ userID: message.author.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (balanceProfile.bank < withMoney) return message.channel.send(`꒰⚠꒱ ꒦ Mama Galactic! You don't have that much in your bank! ꒷`); // when u don't have enough money

        await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + withMoney, bank: balanceProfile.bank - withMoney, lastEdited: Date.now() });

        const BalEmbed = new Discord.MessageEmbed()
            .setTitle(`Withdrawed ${GBars}${withMoney} Galactic Bars!`)
            .setColor('#5234d9')
            .setTimestamp()
            .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(BalEmbed)
    }
};