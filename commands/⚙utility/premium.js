module.exports = {
        name: 'premium',
        description: 'Get Apollo Premium or check if your premium subscription is active.',
        guildOnly: true,
        cooldown: 30,
        async execute(message, args, client) {
                const Premium = require('../../models/premiumSchema');
                const mongoose = require('mongoose');
                const Discord = require('discord.js')

                message.delete()

                let premiumProfile = await Premium.findOne({ userID: message.author.id});

                if (!premiumProfile) {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('🌟 Apollo Premium')
                        .setDescription(`Awwh! Looks like your not a Premium member ${message.author.username}. Even though Apollo Premium is not paid you will have to earn it!`)
                        .addField('💎 How to be Premium?' , 'You can join our [Support Server](https://discord.gg/2NYj5yHAGr) and look out for the Premium giveaways! There are lots of winners daily!')
                        .addField('🎁 What are the benefits?', 'Apollo Premium lets you enjoy full access to every single command (not including moderation permissions) and even get bonus galactic credits!')
                        .addField('🔖 Got an Apollo Premium Code?', 'You can redeem your code by using the `a!redeem` command followed by the code.')
                        .setColor('#fc03b1')
                        .setFooter('Apollo Premium' , 'https://i.imgur.com/Ez0dBC4.png')

                        return message.channel.send(embed)
                }

                if (premiumProfile) {
                        var date = new Date(premiumProfile.DateRedeem);

                        const embed = new Discord.MessageEmbed()
                        .setTitle('🌟 Apollo Premium')
                        .setThumbnail('https://i.imgur.com/Ez0dBC4.png')
                        .setDescription(`Amazing! Looks like your part of the club! All of your perks are active 🎉`)
                        .addField('📆 Premium Since:' , `${date.toString()}`)
                        .addField('🎁 Plan Type', `${premiumProfile.Type}`)
                        .setColor('#fc03b1')
                        return message.channel.send(embed)
                }
        }
};