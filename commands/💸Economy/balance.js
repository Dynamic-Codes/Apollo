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

        let mentionMember = message.member;

        let balanceProfile = await Balance.findOne({ userID: mentionMember.id, guildID: message.guild.id });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionMember.id,
                guildID: message.guild.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        const BalEmbed = new Discord.MessageEmbed()
            .setTitle(`${mentionMember.user.tag}'s Balance`)
            .addField(`Space Credits`, `:coin: ${balanceProfile.balance}`)
            .setColor('#5234d9')
            .setTimestamp()
            .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(BalEmbed)
    }
};