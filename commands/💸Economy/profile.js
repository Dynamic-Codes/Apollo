module.exports = {
    name: 'profile',
    description: 'Show your Apollotastic Stats!',
    guildOnly: true,
    cooldown: 1,
    aliases: ['pf'],
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js');
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const GBars = '<:GalacticBars:840313364278280202>'

        let balanceProfile = await Balance.findOne({ userID: message.author.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (args[0] === 'descrip') {
            const descripRAW = args.slice(1).join(' ')
            const descrip = String(descripRAW)
            console.log(descrip)
            console.log(descrip.length)
            if ((descrip.length) < 30) {
                //
                await Balance.findOneAndUpdate({ userID: message.author.id}, { pfpDescrip: balanceProfile.pfpDescrip = descrip, lastEdited: Date.now() });
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🗂| Profile Changes Saved!`)
                    .setDescription(`Set your Profile description to:\n${descrip}`)
                    .setColor('BLUE')
                return message.channel.send(embed)
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🗂| Profile Changes Error!`)
                    .setDescription(`Your description exceed 30 characters max limit!`)
                    .setColor('RED')
                return message.channel.send(embed)
            }
        }

        /*
        make embed with user name & avatar
        make it display user balance
        make it display user bank
        make it display total balance ( bal + bank )
        make it display expirience ( make a progress bar to next job -- check love command for idea ) ✅
        make it display currently working as
        and more!
        */

        //progress bar stuff
        let barJob = 20

        if(balanceProfile.workStreak >= 20) barJob = 30
        if(balanceProfile.workStreak >= 30) barJob = 40
        if(balanceProfile.workStreak >= 40) barJob = 50
        if(balanceProfile.workStreak >= 50) barJob = 60
        if(balanceProfile.workStreak >= 60) barJob = 70
        if(balanceProfile.workStreak >= 70) barJob = 80
        if(balanceProfile.workStreak >= 80) barJob = 90
        if(balanceProfile.workStreak >= 90) barJob = 90

        let percent = ((balanceProfile.workStreak / barJob) * 100)
        const WorkIndex = Math.floor(percent / 10);
        const WorkLevel = ":cyclone:".repeat(WorkIndex) + ":wavy_dash:".repeat(10 - WorkIndex);

        //Embed

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}'s Profile`)
            .setThumbnail(message.author.avatarURL())
            .setDescription(balanceProfile.pfpDescrip)
            .addField('Wallet', `${GCoins}${balanceProfile.balance}`)
            .addField('Bank', `${GBars}${balanceProfile.bank}`)
            .addField('Job Progress', `{ ${WorkLevel} } | ${percent}%`)
        
        message.channel.send(embed)
    }
};