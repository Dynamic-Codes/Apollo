module.exports = {
    name: 'snipe',
    description: 'Get the latest deleted message in the channel.',
    guildOnly: true,
    execute(message, args, client, snipes) {
            const Discord = require('discord.js')

            let snipe = snipes.get(message.channel.id)
            if(!snipe) return message.channel.send('There is nothing snipe!')

            const SnipeEmbed = new Discord.MessageEmbed()
            .setAuthor(`Message by ${snipe.author.tag}`, snipe.author.displayAvatarURL())
            .setColor("RANDOM")
            .setDescription(snipe.content)
            message.channel.send(SnipeEmbed)
    }
};