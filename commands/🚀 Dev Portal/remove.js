const add = require('./add');

module.exports = {
    name: 'remove',
    description: 'remove balance from user.',
    usage: '<@user> <amount>',
    guildOnly: true,
    args: true,
    ownerOnly: true,
    aliases: ['bal'],
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const GBars = '<:GalacticBars:840313364278280202>'
        LoadMoji = '<a:DinoBeeLoading:790303052913049630>'

        let mentionMember = message.mentions.users.first()
        let addAmount = Number((args[1]))

        let balanceProfile = await Balance.findOne({ userID: mentionMember.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionMember.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (balanceProfile.balance < addAmount) return message.reply('They don\'t even have that much!')

        await Balance.findOneAndUpdate({ userID: mentionMember.id }, { balance: balanceProfile.balance - addAmount, lastEdited: Date.now() });

        const BotEmbed = new Discord.MessageEmbed()
            .setDescription(`${LoadMoji} removing amount...`)
            .setColor('ORANGE')
            .setFooter('ApolloUtils 🚀')
        
        const msg = await message.channel.send(BotEmbed)

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1500) //1.5

        const BalEmbed = new Discord.MessageEmbed()
            .setTitle(`${mentionMember.tag}'s Balance`)
            .addField(`Space Credits`, `${GCoins}${balanceProfile.balance - addAmount}`)
            .addField(`Bank Balance`, `${GBars}${balanceProfile.bank} / \`${balanceProfile.bankLimit}\`` )
            .setColor('#5234d9')
            .setTimestamp()
            .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        msg.edit(BalEmbed)
    }
};