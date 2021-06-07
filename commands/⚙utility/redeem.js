module.exports = {
    name: 'redeem',
    description: 'Redeem an Apollo Code and get stuff!',
    args: true,
    usage: '<redeem-code>',
    async execute(message, args, client) {
        const Premium = require('../../models/premiumSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js')

        message.delete()

        //let premiumProfile = await Premium.findOne({ userID: mentionMember.id});
        // if (!balanceProfile) {
        //     balanceProfile = await new Balance({
        //         _id: mongoose.Types.ObjectId(),
        //         userID: mentionMember.id,
        //         lastEdited: Date.now(),
        //     });
        //     await balanceProfile.save().catch(err => console.log(err));
        // }

        if (args[0] == 'generate' && message.author.id === '614829609665560687') {
            //
            let PreType = args[1]
            const randomize = require('randomatic');
            createCode1 = randomize('AAAA')
            createCode2 = randomize('AAAA')
            createCode3 = randomize('AAAA')
            createCode4 = randomize('AAAA')
            createCode = (`APOLLO-${createCode1}-${createCode2}-${createCode3}-${createCode4}`)
            PremiumProfile = await new Premium({
                _id: mongoose.Types.ObjectId(),
                Free: 'yes',
                Code: createCode,
                Type: PreType,
            });
            await PremiumProfile.save().catch(err => console.log(err));

            if (args[2] === 'drop') {
                const Embed1 = new Discord.MessageEmbed()
                .setTitle('🎁 A Wild Apollo Premium code just appeared!')
                .addField('Code:', `|| ${createCode} ||`)
                .addField('Type:', `${PreType}`)
                .setColor('d4af37')
                .setFooter('🎁🎉🎁🎉🎁🎉🎁') 

                message.channel.send(Embed1)
            }

            const Embed = new Discord.MessageEmbed()
            .setTitle('New Redeem Code')
            .addField('Code:', `|| ${createCode} ||`)
            .addField('Type:', `${PreType}`)
            .setColor('GREEN')
            .setFooter('🚀 ApolloProject')

            return message.author.send(Embed)
        }

        let RedCode = args[0]

        let premiumProfile = await Premium.findOne({ Code: RedCode });

        if(!premiumProfile) {
            let embed = new Discord.MessageEmbed()
            .setTitle('🎁 | Redeem Failed!')
            .setDescription(`The following code \`${RedCode}\` is not a valid redemption code!`)
            .addField('🔍 How does one look like?' , 'APOLLO-WWUU-MMPP-UUSS-CODE')
            .setColor('RED')
            return message.channel.send(embed)
        }

        if(premiumProfile) {
            if(premiumProfile.Free === 'yes') {
                await Premium.findOneAndUpdate({ Code: RedCode }, { Free: 'no', userID: message.author.id, DateRedeem: Date.now() });
                let embed = new Discord.MessageEmbed()
                .setTitle('🎁 | Code Redeemed! ')
                .setDescription(`The following code \`${RedCode}\` has been redeemed!`)
                .setColor('GREEN')
                return message.channel.send(embed)
            }

            if (premiumProfile.Free === 'no') {
                const userRedeem = client.users.cache.get(premiumProfile.userID)
                console.log(`Redeemed by ${userRedeem.username}`)
                let embed = new Discord.MessageEmbed()
                .setTitle('🎁 | Redeem Failed!')
                .setDescription(`The following code \`${RedCode}\` has already been redeemed!`)
                .addField('User:' , userRedeem)
                .setColor('RED')
                return message.channel.send(embed)
            }

        }


    }
};