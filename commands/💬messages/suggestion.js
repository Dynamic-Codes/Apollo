module.exports = {
    name: 'suggest',
    description: 'Suggest Ideas in a suggestion channel with a neat embed!',
    args: true,
    usage: '<Suggestion>',
    guildOnly: true,
    aliases: ['idea', 'suggestions'],
    execute(message, args, client) {
        const { MessageEmbed } = require("discord.js")
        const db = require('quick.db')    
        
        message.channel.bulkDelete(1)
        
        let embed = new MessageEmbed()
        .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
        .setThumbnail(message.author.avatarURL())
        .setColor("#ff2050")
        .setDescription(args.join(" "))
        .setTimestamp()
        
        let chx = db.get(`sugchannel_${message.guild.id}`);

        if(chx === null) {
            return message.reply('⚠ | This server has not set there suggestion channel.')
        }

        client.channels.cache.get(chx).send(embed).then(m => {
        m.react("✅")
        m.react("❌")
        })
        

        
        message.channel.send("Suggestion Sent!")
    }
};