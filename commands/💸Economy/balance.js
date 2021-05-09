module.exports = {
    name: 'balance',
    description: 'Check your balance and flex!',
    usage: '<@user>',
    guildOnly: true,
    aliases: ['bal'],
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const GBars = '<:GalacticBars:840313364278280202>'

        let mentionMember = message.member;

        let balanceProfile = await Balance.findOne({ userID: mentionMember.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionMember.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        const BalEmbed = new Discord.MessageEmbed()
            .setTitle(`${mentionMember.user.tag}'s Balance`)
            .addField(`Space Credits`, `${GCoins}${balanceProfile.balance}`)
            .addField(`Bank Balance`, `${GBars}${balanceProfile.bank} / \`${balanceProfile.bankLimit}\`` )
            .setColor('#5234d9')
            .setTimestamp()
            .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(BalEmbed)
    }
};