module.exports = {
    name: 'rank',
    description: 'See what level you are!',
    guildOnly: true,
    aliases: ['level', 'lvl'],
    async execute(message, args, client) {
            message.channel.bulkDelete(1)
            const Discord = require('discord.js')
            const Levels = require('discord-xp')
            const canvacord = require('canvacord')
            const target = message.author;
            const user = await Levels.fetch(target.id, message.guild.id, true);
            const neededXp = Levels.xpFor(parseInt(user.level) + 1)
            if (!user) return message.reply("You don't have xp! Try to send some more messages.")

            //RESTRICTED ACCESS = NO ADDING POINTS

            const bgURL = [
                'https://sneyd.alphaacademiestrust.co.uk/wp-content/uploads/sites/6/2019/01/deep-colorful-outer-space-cartoon-illustration.jpg',
                'https://cdn.mos.cms.futurecdn.net/bGTrA3GW933gM7GobUAn4e.jpg',
                'https://img.wallpapersafari.com/tablet/2560/1700/72/73/bSsf9m.jpeg',
                'https://besthqwallpapers.com/Uploads/24-5-2020/134505/thumb2-space-cartoon-background-planets-creative-art-space-cartoon-space-background.jpg',
                'https://t3.ftcdn.net/jpg/02/25/34/58/360_F_225345802_ywq5EHefXnYL8EEfo9Ec84By1neP4bws.jpg',
                'https://c4.wallpaperflare.com/wallpaper/714/364/854/sun-cute-stars-space-cartoons-wallpaper-preview.jpg'
            ]
            const indexImg = Math.floor(Math.random() * (bgURL.length - 1) + 1);
            const imageCard = bgURL[indexImg]

            const rank = new canvacord.Rank()
                .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
                .setCurrentXP(user.xp)
                .setLevel(user.level)
                .setRank(user.position)
                .setRequiredXP(neededXp)
                .setBackground('IMAGE', imageCard)
                .setStatus('idle')
                .setProgressBar('#FFA500', "COLOR")
                .setUsername(message.author.username)
                .setDiscriminator(message.author.discriminator)
            rank.build()
                .then(data => {
                    const attatchment = new Discord.MessageAttachment(data, 'ApolloLevels.png')
                    message.channel.send(attatchment)
                })


    }
};