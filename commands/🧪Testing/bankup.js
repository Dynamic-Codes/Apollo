module.exports = {
    name: 'bankup',
    description: 'Upgrade Halo\'s Vault and store your Galactic riches!',
    usage: '<amount>',
    guildOnly: true,
    ownerOnly: true,
    aliases: ['bank'],
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const Guild = require('../../models/guildSchema')
        const mongoose = require('mongoose');
        const Discord = require('discord.js')
        const GCoins = '<:GalacticCurrency:840312897187217468>'
        const GBars = '<:GalacticBars:840313364278280202>'

        const bankType = args[0]

        //Profiles
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });

        let balanceProfile = await Balance.findOne({ userID: message.author.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (!bankType) {
            const BankBed = new Discord.MessageEmbed()
                .setTitle('💸 Halo\s Vault Upgrades')
                .setDescription(`Welcome to the Halo's Vault! Thanks for picking us as your bank ${message.author.username}.\n here you can upgrade your Vault's storage. Just choose a deal below!`)
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: '💰 Elea Upgrade', value: `Storage: ${GBars}\`1,000\`\nID: \`HV-ELEA\``, inline: true },
                    { name: '💵 Eophus Upgrade', value: `Storage: ${GBars}\`5,000\`\nID: \`HV-EPHS\``, inline: true },
                    { name: '💴 Tiatov Upgrade', value: `Storage: ${GBars}\`10,000\`\nID: \`HV-TITV\``, inline: true },
                    { name: '💶 Triton Upgrade', value: `Storage: ${GBars}\`50,000\`\nID: \`HV-TRTN\``, inline: true },
                    { name: '💷 Sedna Upgrade', value: `Storage: ${GBars}\`100,000\`\nID: \`HV-SDNA\``, inline: true },
                    { name: '💸 Haumea Upgrade', value: `Storage: ${GBars}\`500,000\`\nID: \`HV-HUMA\``, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '💳 Kepler Upgrade', value: `Storage: ${GBars}\`1,000,000\`\nID: \`HV-KPLR\``, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                )
                .setFooter('🚀 ApolloProject')

            await message.channel.send(BankBed)
            message.channel.send(`Use \`${guildProfile.prefix}bankup <ID>\` to make upragde!`)
        }

    },
};