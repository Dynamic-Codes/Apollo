module.exports = {
    name: 'info',
    description: 'Get information about the bot, the developers and meet the team!',
    cooldown: 60,
    async execute(message, args, client) {
        //Code here

        const Discord = require('discord.js')

        //embeds

        message.delete()

        const Embed1 = new Discord.MessageEmbed()
            .setTitle('⭐ Welcome to ApolloBot!')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey there! Its ApolloBot! Well let me introduce my self. I am a space themed Multipurpose bot developed by \`Dynamic\`! Apollo bot is created to be useful without all of the premuim garbage and the lot! Every single command is made for everyone and 0 restrictions!`)
            .addField('Learn more!', 'You can learn more about commands by using `a!help` or your custom prefix!')
            .setColor('#b586fc')


        const Embed2 = new Discord.MessageEmbed()
            .setTitle('🤩 Meet the Developer!')
            .setThumbnail('https://media.discordapp.net/attachments/840291138538831889/850782145138917376/DynamicLikeApollo.png')
            .setDescription(`Hey guys! Its Dynamic here & nice to meet you \`${message.author.username}\`! I am the dev of ApolloBot as you can tell XD. I love to listen to music and I love space ofc! You can learn more about me below!`)
            .addField('Facts about me!' , `I am a gamer & a YouTuber & I love to code! I made Apollo for fun but people loved it so I developed it and made it public :D`)
            .setColor('BLUE')


        const Embed3 = new Discord.MessageEmbed()
            .setTitle('🐢 The Turtle Artist')
            .setThumbnail('https://media.discordapp.net/attachments/840291138538831886/850770809076056084/me.PNG')
            .setDescription(`Hey cool Turtle! My name is Tiffany but you can call me Tiff / Toff for short! I am the emoji artist for Apollo, so nearly all of the totally epic emojis you see are made by me! You can fact stalk me below XD!`)
            .addField('Facts about me!' , `I love turtles and is really good at photoshop! I was Dynamic's friend and  saw Apollo and loved it! I also love Roblox guys! XD`)
            .setColor('GREEN')


        const reactionMessage = await message.channel.send(Embed1);

        let PageNumb = 1

        try {
            await reactionMessage.react("◀");
            await reactionMessage.react("⛔");
            await reactionMessage.react("▶");
        } catch (err) {
            message.channel.send("Error sending emojis!");
            throw err;
        }

        const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id),
            { dispose: true }
        );

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
                    case "◀":
                        reaction.users.remove(user.id);
                        if (PageNumb == 1) return;
                        if (PageNumb == 2) {
                            reactionMessage.edit(Embed1)
                            PageNumb = 1
                            return;
                        }
                        if (PageNumb == 3) {
                            reactionMessage.edit(Embed2)
                            PageNumb = 2
                            return;
                        }

                        break;
                    case "▶":
                        reaction.users.remove(user.id);
                        if (PageNumb == 3) return;
                        if (PageNumb == 2) {
                            reactionMessage.edit(Embed3)
                            PageNumb = 3
                            return;
                        }
                        if (PageNumb == 1) {
                            reactionMessage.edit(Embed2)
                            PageNumb = 2
                            return;
                        }
                        break;
                    case "⛔":
                        reaction.users.remove(user.id);
                        reactionMessage.delete()
                        break;
                    }
                });


    },
};