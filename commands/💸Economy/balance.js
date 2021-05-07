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

        let mentionMember = message.mentions.members.first() || await  message.guild.members.fetch(args[0])

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
            .setTitle(`${mentionMember}'s Balance`)
            .addField(`Space Credits`, `:coin: ${balanceProfile.balance}`)
            .setColor('#5234d9')
            .setTimestamp()
            .setFooter(message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(BalEmbed)
    }
};