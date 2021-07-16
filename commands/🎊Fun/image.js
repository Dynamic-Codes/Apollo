module.exports = {
        name: 'image',
        description: 'Find neat random photos that are UHD!',
        guildOnly: true,
        cooldown: 5,
        aliases: ['unsplash'],
        async execute(message, args, client) {
                message.delete()
                const Discord = require('discord.js')

                //Code here
                let result = 'https://unsplash.com/s/photos/california?orientation=landscape'

                console.log(result)

                const embed = new Discord.MessageEmbed()
                .setTitle('🧪Testing')
                .setColor('WHITE')
                .setDescription(`[Download Here!](${result})`)
                .setImage(result)
                message.channel.send(embed)
        }
};