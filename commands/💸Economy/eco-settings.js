module.exports = {
        name: 'eco-settings',
        description: 'Settings for the Economy Section!',
        usage: '<setting> <Toggle State>',
        guildOnly: true,
        cooldown: 3,
        aliases: ['ecos'],
        async execute(message, args, client) {
                //Code here
                const Eco = require('../../models/ecoSchema');
                const Guild = require('../../models/guildSchema')
                const mongoose = require('mongoose');
                const Discord = require('discord.js')

                message.delete()

                if (!message.member.permissions.has("MANAGE_GUILD")) {
                    const PermErrorEmbed = new Discord.MessageEmbed()
                        .setTitle('Missing Permission!')
                        .setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
                        .addFields({
                            name: '__User:__',
                            value: `\`${message.author.username}\``,
                            inline: true
                        }, {
                            name: '__Permission:__',
                            value: '`MANAGE GUILD`',
                            inline: true
                        }, )
                        .setColor(5158332)
                        .setFooter('Fact: The sun will engulf Earth in the far future!')
                    return message.reply(PermErrorEmbed)
                }

                EcoProfile = await Eco.findOne({
                        guildID: message.guild.id
                });

                if (!EcoProfile) {
                    EcoProfile = await new Eco({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        lastEdited: Date.now(),
                    });
                    await EcoProfile.save().catch(err => console.log(err));
                }

                if (!args[0]) {
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`💸 Economy Settings | ⚙`)
                        .setDescription('Welcome to Ecos! I am Ara. This is currently your server economy setup shown below. You can see how to change these settings by using `a!ecos helper`!')
                        .setFooter('🚀 Apollo Economy')
                        .setColor('ORANGE')

                        const robCheck = (EcoProfile.rob === 'OFF') ? embed.addField('⚔ Rob | Steal', `\`🔒\` Disabled`) : embed.addField('⚔ Rob | Steal', `\`🔓\` Enabled`)
                        const heistCheck = (EcoProfile.heist === 'OFF') ? embed.addField('🏛 Bankrob | Heist', `\`🔒\` Disabled`) : embed.addField('🏛 Bankrob | Heist', `\`🔓\` Enabled`)

                        return message.channel.send(embed)

                }

                if (args[0] === 'helper') {
                        let embed = new Discord.MessageEmbed()
                        .setTitle('💸 Ecos Helper')
                        .setDescription(`Nice to see you again ${message.author.username}! Below are all the settings and parameter types. You can use \`a!ecos <settings> <Toggle State>\` to change any setting!`)
                        .addField('⚙ Setting and parameters' , '`rob`: on / off\n`heist`: on / off')
                        .setColor('ORANGE')
                        .setFooter('🚀 Apollo Economy')

                        return message.channel.send(embed)
                }

                // setting manager

                let setParseText = (args[1].toUpperCase())
                let setEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('💸| Setting Updated!')

                const errE = new Discord.MessageEmbed()
                .setTitle('🔬 | I don\'t think thats a valid argument..')
                .setColor('BLUE')

                if (!["on", "off", "ON", "OFF"].includes(args[1])) return message.channel.send(errE)

                if (args[0] === 'rob') {
                        await Eco.findOneAndUpdate({ guildID: message.guild.id }, { rob: setParseText, lastEdited: Date.now() });
                        return message.channel.send(setEmbed)

                }

                if (args[0] === 'heist') {
                        await Eco.findOneAndUpdate({ guildID: message.guild.id }, { heist: setParseText, lastEdited: Date.now() });
                        return message.channel.send(setEmbed)

                }

                message.channel.send(errE)
        }
};