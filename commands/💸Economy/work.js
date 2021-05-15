module.exports = {
    name: 'work',
    description: 'Go to work, earn credits and be rich!',
    guildOnly: true,
    async execute(message, args, client) {
        const Balance = require('../../models/balanceSchema');
        const mongoose = require('mongoose');
        const Discord = require('discord.js');
        const GCoins = '<:GalacticCurrency:840312897187217468>'
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

        //Job list

        if (args[0] === 'list' && args[1] === '1') {
            //Tier one
            const t1 = new Discord.MessageEmbed()
                .setTitle(`🦺| Tier 1 Work`)
                .setDescription('Tier one jobs are basic jobs to get started in your economy adventure! as you progress you can unlock more!\nUse \`a!work apply <ID (lowercase)>\` to apply!')
                .setColor('#c242f5')
                .setFooter('Page 1/3 | ApolloProject 🚀')
            
            const w11 = (balanceProfile.workStreak >= 0) ? t1.addField(`🎮| Gsport Gamer`, `Salary: \`3000\`\nID: \`WK-001\``) : t1.addField(`🔒| Gsport Gamer`, `Salary: \`3000\`\nID: \`WK-001\``)
            const w12 = (balanceProfile.workStreak >= 20) ? t1.addField(`⛏| Galactic Miner`, `Salary: \`5000\`\nID: \`WK-002\``) : t1.addField(`🔒| Galactic Miner`, `Salary: \`5000\`\nID: \`WK-002\``)
            const w13 = (balanceProfile.workStreak >= 30) ? t1.addField(`📦| Delivery Service`, `Salary: \`7000\`\nID: \`WK-003\``) : t1.addField(`🔒| Delivery Service`, `Salary: \`7000\`\nID: \`WK-003\``)

            return message.channel.send(t1)
        } else if (args[0] === 'list' && args[1] === '2') {
            //Tier two
            const t1 = new Discord.MessageEmbed()
                .setTitle(`🦺| Tier 2 Work`)
                .setDescription('These jobs offer better salary then tier one! They also are quite cool not going to lie.\nUse \`a!work apply <ID (lowercase)>\` to apply!')
                .setColor('#c242f5')
                .setFooter('Page 2/3 | ApolloProject 🚀')
            
            const w11 = (balanceProfile.workStreak >= 40) ? t1.addField(`📽| YouTube Animator`, `Salary: \`9000\`\nID: \`WK-004\``) : t1.addField(`🔒| YouTube Animator`, `Salary: \`9000\`\nID: \`WK-004\``)
            const w12 = (balanceProfile.workStreak >= 50) ? t1.addField(`🚔| Galactic Patrol`, `Salary: \`12,000\`\nID: \`WK-005\``) : t1.addField(`🔒| Galactic Patrol`, `Salary: \`12,000\`\nID: \`WK-005\``)
            const w13 = (balanceProfile.workStreak >= 60) ? t1.addField(`🚀| Ship Designer`, `Salary: \`15,000\`\nID: \`WK-006\``) : t1.addField(`🔒| Ship Designer`, `Salary: \`15,000\`\nID: \`WK-006\``)

            return message.channel.send(t1)
        } else if (args[0] === 'list' && args[1] === '3') {
            //Tier three
            const t1 = new Discord.MessageEmbed()
                .setTitle(`🦺| Tier 3 Work`)
                .setDescription('The most hardest jobs to obtain but are high paying!\nUse \`a!work apply <ID (lowercase)>\` to apply!')
                .setColor('#c242f5')
                .setFooter('Page 3/3 | ApolloProject 🚀')
            
            const w11 = (balanceProfile.workStreak >= 70) ? t1.addField(`🤖| Apollo Developer`, `Salary: \`20,000\`\nID: \`WK-007\``) : t1.addField(`🔒| Apollo Developer`, `Salary: \`20,000\`\nID: \`WK-007\``)
            const w12 = (balanceProfile.workStreak >= 80) ? t1.addField(`👨‍🚀| Galactic Commander`, `Salary: \`25,000\`\nID: \`WK-008\``) : t1.addField(`🔒| Galactic Commander`, `Salary: \`25,000\`\nID: \`WK-008\``)
            const w13 = (balanceProfile.workStreak >= 90) ? t1.addField(`🔬| Terraform Scientist`, `Salary: \`30,000\`\nID: \`WK-009\``) : t1.addField(`🔒| Terraform Scientist`, `Salary: \`30,000\`\nID: \`WK-009\``)
            return message.channel.send(t1)
        }

        //work selector

        if (args[0] === 'apply') {
            if (args[1] === 'wk-001') {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-001', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **GSport Gamer** ꒷')
            } else if (args[1] === 'wk-002' && balanceProfile.workStreak >= 20) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-002', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **Galactic Miner** ꒷')
            } else if (args[1] === 'wk-003' && balanceProfile.workStreak >= 30) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-003', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **Delivery Service Guy** ꒷')
            } else if (args[1] === 'wk-004' && balanceProfile.workStreak >= 40) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-004', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **YouTube Animator** ꒷')
            } else if (args[1] === 'wk-005' && balanceProfile.workStreak >= 50) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-005', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **Galactic Patrol Officer** ꒷')
            } else if (args[1] === 'wk-006' && balanceProfile.workStreak >= 60) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-006', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **Ship Designer** ꒷')
            } else if (args[1] === 'wk-007' && balanceProfile.workStreak >= 70) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-007', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **Apollo Developer** ꒷')
            } else if (args[1] === 'wk-008' && balanceProfile.workStreak >= 80) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-008', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **Galactic Commander** ꒷')
            } else if (args[1] === 'wk-009'  && balanceProfile.workStreak >= 90) {
                await Balance.findOneAndUpdate({ userID: message.author.id}, { job: balanceProfile.job = 'wk-009', lastEdited: Date.now() });
                return message.channel.send('꒰😎꒱ ꒦ You now work as a **Terraform Scientist** ꒷')
            } else {
                message.channel.send('꒰ℹ꒱ ꒦ Either that job is locked or its not even a thing! ꒷')
            }
        }

        // Work checker

        if (balanceProfile.job === 'not-set') {
            message.channel.send(`꒰${message.author.username}꒱ ꒦ You currently don't have a job! ꒷`)
            const embed = new Discord.MessageEmbed()
                .setTitle(`💡 Tip | You can use \`a!work list 1/2/3\` to find a job!`)
                .setColor('ORANGE')
            return message.channel.send(embed)
        }

        // work

        let daily = balanceProfile.workCool

        let timeout =  3600000;

        if ((Date.now()) < daily) {
            let TimeRemainRAW = ( daily - Date.now() )
            let mili = ms(TimeRemainRAW)

            const embed = new Discord.MessageEmbed()
                .setTitle('✅| Already Worked!')
                .addField('Come back in', `\`${mili}\` Galactic Time!`)
                .setColor('YELLOW')

            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-001') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 3000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **GSport Gamer** and earnt ${GCoins}\`3000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-002') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 5000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **Galactic Miner** and earnt ${GCoins}\`5000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-003') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 7000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **Delivery service guy** and earnt ${GCoins}\`7000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-004') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 9000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **YouTube Animator** and earnt ${GCoins}\`9000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-005') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 12000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **Galactic Patrol Officer** and earnt ${GCoins}\`12,000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-006') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 15000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **Ship Designer** and earnt ${GCoins}\`15,000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-007') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 20000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **Apollo Developer** and earnt ${GCoins}\`20,000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-008') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 25000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **Space Commander** and earnt ${GCoins}\`25,000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }

        if (balanceProfile.job === 'wk-009') {
            let CoolOver = ((Date.now() + timeout))
            await Balance.findOneAndUpdate({ userID: message.author.id}, { workCool: balanceProfile.dailyCool = CoolOver, workStreak: balanceProfile.workStreak + 1 , lastEdited: Date.now() });
            await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + 30000, lastEdited: Date.now() });
            const embed = new Discord.MessageEmbed()
                .setDescription(`You worked as a **Terraform Scientist** and earnt ${GCoins}\`30,000\`!`)
                .setColor('BLUE')
            return message.channel.send(embed)
        }
        

    }
};