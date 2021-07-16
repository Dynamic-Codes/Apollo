module.exports = {
        name: 'count',
        description: 'Count to infinity and beyond!',
        guildOnly: true,
        cooldown: 5,
        async execute(message, args, client) {
                message.delete()
                const Count = require('../../models/countSchema');
                const mongoose = require('mongoose');
                const Discord = require('discord.js');
                const ms = require("ms");

                let countProfile = await Count.findOne({ guildID: message.guild.id});
                if (!countProfile) {
                    countProfile = await new Count({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                    });
                    await countProfile.save().catch(err => console.log(err));
                }

                let chx = client.channels.cache.get(countProfile.channelID)
                let lcu = client.users.cache.get(countProfile.LastAuth)

                if(!message.member.permissions.has("MANAGE_GUILD")){
                        //
                        if (!chx) {
                                return message.reply('Sadly this server did not setup counting yet! 😕')
                        }

                        const CE = new Discord.MessageEmbed()
                        .setTitle('🧮 Counter')
                        .addField('Channel', `${chx}`)
                        .addField('Current Number', `${countProfile.CountNum}`)
                        .addField('Last Counter', `${lcu}`)
                        .setColor('BLUE')

                        return message.channel.send(CE)
                } else {
                        //
                        if (args[0] === 'set'){
                                await Count.findOneAndUpdate({ guildID: message.guild.id}, { channelID: args[1] })
                                const embed = new Discord.MessageEmbed()
                                .setTitle('🧮 | Setup')
                                .setDescription(`✅ | Updated count channel to \`${args[1]}\``)
                                .setColor('#ffbe7d')

                                //create webhook for that channel
                                let Wchx = client.channels.cache.get(args[1])
                                console.log(Wchx)
                                const webhooks = await Wchx.fetchWebhooks();
                                const webhook = webhooks.first();
                                if (!webhook) {
                                        await Wchx.createWebhook('Apollo-Count', {
                                            avatar: 'https://cdn.discordapp.com/avatars/833353624762581023/07c7c7803e89d942d6b1a91845f07cc4.webp',
                                        })
                                        .then(webhook => console.log(`Created webhook ${webhook}`))
                                        .catch(console.error);
                                }

                                return message.channel.send(embed)
                        }
                        if (!chx) {
                                const CE = new Discord.MessageEmbed()
                                .setDescription('You can set up counting by doing `a!count set <channel-ID>`!')
                                .setTitle('🧮 Counter')
                                .addField('Channel', `${countProfile.channelID}`)
                                .addField('Current Number', `${countProfile.CountNum}`)
                                .addField('Last Counter', `${lcu}`)
                                .setColor('RED')

                                return message.channel.send(CE)
                        }

                        const CE = new Discord.MessageEmbed()
                        .setTitle('🧮 Counter')
                        .addField('Channel', `${chx}`)
                        .addField('Current Number', `${countProfile.CountNum}`)
                        .addField('Last Counter', `${lcu}`)
                        .setColor('BLUE')

                        return message.channel.send(CE)
                }
        }
};