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

        let mentionMember = message.member;
        const depMoney = args[0]

        if (!isNaN(depMoney)) return message.channel.send(`꒰ℹ꒱ ꒦ What type of amount is ${depMoney}? ꒷`)

        message.channel.send(`You said ${depMoney}`)

        // let balanceProfile = await Balance.findOne({ userID: mentionMember.id});
        // if (!balanceProfile) {
        //     balanceProfile = await new Balance({
        //         _id: mongoose.Types.ObjectId(),
        //         userID: mentionMember.id,
        //         lastEdited: Date.now(),
        //     });
        //     await balanceProfile.save().catch(err => console.log(err));
        // }

        // await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + coinsToGive, lastEdited: Date.now() });

        // const BalEmbed = new Discord.MessageEmbed()
        //     .setTitle(`${mentionMember.user.tag}'s Balance`)
        //     .addField(`Space Credits`, `${GCoins}${balanceProfile.balance}`)
        //     .addField(`Bank Balance`, `${GBars}${balanceProfile.bank} / \`${balanceProfile.bankLimit}\`` )
        //     .setColor('#5234d9')
        //     .setTimestamp()
        //     .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        // message.channel.send(BalEmbed)
    }
};