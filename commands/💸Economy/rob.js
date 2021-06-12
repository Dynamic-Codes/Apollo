module.exports = {
        name: 'rob',
        description: 'Become a space pirate and rob someone! Max 1000 Galactic Credits.',
        args: true,
        usage: '<@user>',
        guildOnly: true,
        cooldown: 120,
        aliases: ['steal'],
        async execute(message, args, client) {
                message.delete()
                const balanceSchema = require('../../models/balanceSchema');
                const ecoSchema = require('../../models/ecoSchema');
                const mongoose = require('mongoose');
                const Discord = require('discord.js');
                const ms = require("ms");
                let timeout =  120000;
                let robDude = message.mentions.users.first() || agrs[0]
                let daily = balanceProfile.StealCools
                const GCoins = '<:GalacticCurrency:840312897187217468>'

                //Code here

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

                if (EcoProfile.rob === 'OFF') {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('🐧 Woah there.. This server is friendly!')
                        .setColor('BLUE')
                        return message.channel.send(embed)
                }

                balanceProfile = await Balance.findOne({
                        userID: robDude.id
                });

                if ((Date.now()) < daily) {
                    let TimeRemainRAW = ( daily - Date.now() )
                    let mili = ms(TimeRemainRAW)

                    const embed = new Discord.MessageEmbed()
                        .setTitle('😅| Hold your rockets!')
                        .addField('This user can be robbed again in:', `\`${mili}\` Galactic Time!`)
                        .setColor('RED')

                    return message.channel.send(embed)
                }

                if (balanceProfile.balance < 1000 ) {
                        return message.channel.send('This Galactic soul doesn\'t have enough to rob. Lets not.')
                }

                let UserProfile = await Balance.findOne({
                        userID: message.author.id
                })

                if ( UserProfile.balance < 500 ) {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`😬 You need atleast ${GCoins}500 to rob someone..`)
                        .setColor('ORANGE')
                        return message.channel.send(embed)
                }

                const chance = Math.floor(Math.random() * 10) + 1;
                if(chance >= 1 && chance <= 6) {
                        const chance1 = Math.floor(Math.random() * 1000) + 1;
                        
                        await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + chance1, lastEdited: Date.now() });
                        await Balance.findOneAndUpdate({ userID: robDude.id}, { balance: balanceProfile.balance - chance1, lastEdited: Date.now() });

                        const array = [
                                'and Jumped on a rocket!',
                                'and danced all night!',
                                'and bought a few space brews!',
                                'and Went on a holiday!',
                                'and did a 360 backflip spin!',
                                'and yeeted them to space!',
                                'and totally shared it with your family?',
                                'and were confused at your luck..',
                                'and escaped them.'
                        ];

                        return message.channel.send(`You stole ${GCoins}${chance1} from ${robDude} ${array[Math.floor(Math.random() * 8)]}`)

                } else {
                        await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance - 350, lastEdited: Date.now() });
                        await Balance.findOneAndUpdate({ userID: robDude.id}, { balance: balanceProfile.balance + 350, lastEdited: Date.now() });

                        const array = [
                                'Now that was not what I was expecting to get.. You gave',
                                'You tried to rob them but got caught by your mum! Yikes.. You gave',
                                'You saw them, had a drink and gave them your money? You gave',
                                'You failed and gave them money to go on a holiday?! You gave',
                                'They yeeted you to Jupiter.. You gave',
                                'Sadly they begged you and you felt pitty on them so you gave',
                                'You stole from them and they stole back from you so you gave',
                                'You failed LOL and gave them',
                                'You got caught by there dad and gave'
                        ];

                        return message.channel.send(`${array[Math.floor(Math.random() * 8)]} ${robDude} ${GCoins}350 Galactic credits.`)
                }



        }
};