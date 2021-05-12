module.exports = {
    name: 'bankup',
    description: 'Upgrade Halo\'s Vault and store your Galactic riches!',
    usage: '<ID> / or just run command for help',
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
                .setTitle('💸 Halo\'s Vault Upgrades')
                .setDescription(`Welcome to the Halo's Vault! Thanks for picking us as your bank ${message.author.username}.\n here you can upgrade your Vault's storage. Just choose a deal below!`)
                .setColor('PURPLE')
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: '💵 Eophus Upgrade', value: `Storage: ${GBars}\`5,000\`\nID: \`HV-EPHS\``, inline: true },
                    { name: '💴 Tiatov Upgrade', value: `Storage: ${GBars}\`10,000\`\nID: \`HV-TITV\``, inline: true },
                    { name: '💶 Triton Upgrade', value: `Storage: ${GBars}\`50,000\`\nID: \`HV-TRTN\``, inline: true },
                    { name: '💷 Sedna Upgrade', value: `Storage: ${GBars}\`100,000\`\nID: \`HV-SDNA\``, inline: true },
                    { name: '💸 Haumea Upgrade', value: `Storage: ${GBars}\`500,000\`\nID: \`HV-HUMA\``, inline: true },
                    { name: '💳 Kepler Upgrade', value: `Storage: ${GBars}\`1,000,000\`\nID: \`HV-KPLR\``, inline: true },
                )
                .setFooter('🚀 ApolloProject')

            await message.channel.send(BankBed)
            return message.channel.send(`Use \`${guildProfile.prefix}bankup <ID>\` to make upgrade!`)
        }

        if (!["hv-ephs", "hv-titv", "hv-trtn", "hv-sdna", "hv-huma", "hv-kplr"].includes(bankType)) return message.channel.send('꒰🤔꒱ ꒦ Did you provide an invalid deal ID? ꒷')
        
        const delay = ms => new Promise(res => setTimeout(res, ms));
        LoadMoji = '<a:DinoBeeLoading:790303052913049630>'
        CheckMoji = '<a:DinoBeeVerified:790307652663246889>'

        const Transaction = new Discord.MessageEmbed()
            .setTitle('Halo\'s Vault')
            .setDescription(`${message.author.username}, we are now processing your transaction...\n${LoadMoji }This can take a few moments.`)
            .setColor('ORANGE')
            .setFooter('ApolloProject', message.author.displayAvatarURL({ dynamic: true }))
        
        const BotMGS = await message.channel.send(Transaction)

        const TranCheck = new Discord.MessageEmbed()
            .setTitle('Halo\'s Vault')
            .setDescription(`${message.author.username}, we have approved your transaction!\n${CheckMoji} Your Vault limit has increased!`)
            .addField('Vault Limit', `${GBars}\`${balanceProfile.bankLimit}\``)
            .setColor('BLUE')
            .setFooter('The Galactic Credits Bank', message.author.displayAvatarURL({ dynamic: true }))
        
        const TranDeny = new Discord.MessageEmbed()
            .setTitle('Halo\'s Vault')
            .setDescription(`${message.author.username}, you did not have enough Galact Credits!\n⛔ Your Vault limit has not been affected.`)
            .addField('Vault Limit', `${GBars}\`${balanceProfile.bankLimit}\``)
            .setColor('RED')
            .setFooter('The Galactic Credits Bank', message.author.displayAvatarURL({ dynamic: true }))

        await delay(3000); // waits 3 seconds

        if (bankType === 'hv-ephs') {
            //
            if (5000 > balanceProfile.balance) return BotMGS.edit(TranDeny)
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - 5000, bankLimit: balanceProfile.bankLimit + 5000, lastEdited: Date.now() });
            BotMGS.edit(TranCheck)
        } else if (bankType === 'hv-titv') {
            //
            if (10000 > balanceProfile.balance) return BotMGS.edit(TranDeny)
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - 10000, bankLimit: balanceProfile.bankLimit + 10000, lastEdited: Date.now() });
            BotMGS.edit(TranCheck)
        } else if (bankType === 'hv-trtn') {
            //
            if (50000 > balanceProfile.balance) return BotMGS.edit(TranDeny)
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - 50000, bankLimit: balanceProfile.bankLimit + 50000, lastEdited: Date.now() });
            BotMGS.edit(TranCheck)
        } else if (bankType === 'hv-sdna') {
            //
            if (100000 > balanceProfile.balance) return BotMGS.edit(TranDeny)
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - 100000, bankLimit: balanceProfile.bankLimit + 100000, lastEdited: Date.now() });
            BotMGS.edit(TranCheck)
        } else if (bankType === 'hv-huma') {
            //
            if (500000 > balanceProfile.balance) return BotMGS.edit(TranDeny)
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - 500000, bankLimit: balanceProfile.bankLimit + 500000, lastEdited: Date.now() });
            BotMGS.edit(TranCheck)
        } else if (bankType === 'hv-kplr') {
            //
            if (1000000 > balanceProfile.balance) return BotMGS.edit(TranDeny)
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - 1000000, bankLimit: balanceProfile.bankLimit + 1000000, lastEdited: Date.now() });
            BotMGS.edit(TranCheck)
        } else {
            return message.channel.send('꒰☢꒱ ꒦ A unknown Fatal error occured! ꒷')
        }



    },
};