module.exports = {
        name: 'boostvc',
        description: 'Setup booster only / private VCs! use `a!bvc help`',
        guildOnly: true,
        cooldown: 3,
        aliases: ['bvc'],
        async execute(message, args, client) {
                message.delete()
                const Booster = require('../../models/boosterSchema');
                const mongoose = require('mongoose');
                const Discord = require('discord.js');
                const ms = require("ms");

                if(!message.member.permissions.has("MANAGE_GUILD")){
                        const PermErrorEmbed = new Discord.MessageEmbed()
                        .setTitle('Missing Permission!')
                        .setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
                        .addFields(
                                {name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
                                {name: '__Permission:__' , value: '`MANAGEGUILD`',inline: true},
                        )
                        .setColor(5158332)
                        .setFooter('Fact: Gamma rays are shot out when Blackholes are born!')
                        return message.reply(PermErrorEmbed)
                }

                //Profiles
                let boosterProfile = await Booster.findOne({ guildID: message.guild.id});
                if (!boosterProfile) {
                    boosterProfile = await new Booster({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                    });
                    await boosterProfile.save().catch(err => console.log(err));
                }

                if (!args[0]) {
                    const Embed = new Discord.MessageEmbed()
                    .setTitle('🎶 | Booster VC Setup')
                    .setDescription('This is the current Booster Voice Channel setup for this server. If you see `NOT SETUP` in any of the sections please set them up otherwise Booster VC will be disabled.')
                    .addField('Booster Role ID', `${boosterProfile.roleID}`)
                    .addField('Join Channel ID', `${boosterProfile.JoinID}`)
                    .addField('Section ID', `${boosterProfile.ParentSection}`)
                    .setColor('#ffbe7d')
                    .setFooter('🚀 ApolloProject | Booster VC')

                    message.channel.send(Embed)
                    message.channel.send('꒰ℹ꒱ ꒦ use `a!bvc help` for more info! ꒷')
                }

                //SETUP SETTINGS FOR USER

                if (args[0] === 'help') {
                    const HelpEmbed = new Discord.MessageEmbed()
                    .setTitle('🎶 | Booster VC Embed')
                    .setDescription('To setup Booster Voice Channels in your server you will need to do a few things first.')
                    .addField('Step 1', 'Make a new category where all your VCs will be created. You can name this anything you like.')
                    .addField('Step 2', 'Setup your server config by running `a!bvc setup <params> <input>` you can see more detailed info below.')
                    .addField('Setup Parameters', '`sectionID`: The category ID.\n`joinID`: The join voice channel ID used for creation.\n`roleID`: The booster role ID.')
                    .addField('Step 3', 'Run the `a!boostvc` command again and make sure there are no errors.')
                    .addField('Step 4', 'Once done finally run `a!bvc start` to enable Booster Voice Channels! 🥳')
                    .setColor('ORANGE')
                    return message.channel.send(HelpEmbed) 
                }

                if (args[0] === 'setup') {
                    const embed = new Discord.MessageEmbed()
                    .setTitle('🎶 | Setup')
                    .setColor('#ffbe7d')
                    if (args[1] === 'roleID') {
                        await Booster.findOneAndUpdate({ guildID: message.guild.id}, { roleID: args[2] }), embed.setDescription(`✅ | Updated Role to \`${args[2]}\``)
                        return message.channel.send(embed)
                        
                    }

                    if (args[1] === 'joinID') {
                        await Booster.findOneAndUpdate({ guildID: message.guild.id}, { JoinID: args[2] }), embed.setDescription(`✅ | Updated Join channel to \`${args[2]}\``)
                        return message.channel.send(embed)
                        
                    }

                    if (args[1] === 'sectionID') {
                        await Booster.findOneAndUpdate({ guildID: message.guild.id}, { ParentSection: args[2] }), embed.setDescription(`✅ | Updated Section to \`${args[2]}\``)
                        return message.channel.send(embed)
                    }

                }
        }
};