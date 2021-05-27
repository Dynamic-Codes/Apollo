module.exports = {
        name: 'cooldown',
        description: 'Check your cooldowns for currency commands!',
        guildOnly: true,
        cooldown: 5,
        aliases: ['cd', 'cool', 'cools'],
        async execute(message, args, client) {
                //Code here
                const Discord = require('discordjs')

                const Balance = require('../../models/balanceSchema');
                const mongoose = require('mongoose');
                const Discord = require('discord.js');
                const ms = require('ms')

                let balanceProfile = await Balance.findOne({ userID: message.author.id});
                if (!balanceProfile) {
                    balanceProfile = await new Balance({
                        _id: mongoose.Types.ObjectId(),
                        userID: message.author.id,
                        lastEdited: Date.now(),
                    });
                    await balanceProfile.save().catch(err => console.log(err));
                }

                let workTime = balanceProfile.workCool
                let dailyTime = balanceProfile.dailyCool

                const embed = new Discord.MessageEmbed()
                        .setTitle('⏱ Cooldowns')
                        .setFooter('🚀 ApolloProject')

                if ((Date.now()) < workTime) {
                    let TimeRemainRAW = ( workTime - Date.now() )
                    let mili = ms(TimeRemainRAW)
                    embed.addField('Work', `${mili} ❌`)
                } else {
                        embed.addField('Work', 'Use now! ✅')
                }

                if ((Date.now()) < dailyTime) {
                    let TimeRemainRAW = ( dailyTime - Date.now() )
                    let mili = ms(TimeRemainRAW)
                    embed.addField('Daily', `${mili} ❌`)
                } else {
                        embed.addField('Daily', 'Use now! ✅')
                }

                message.channel.send(embed)

        }
};