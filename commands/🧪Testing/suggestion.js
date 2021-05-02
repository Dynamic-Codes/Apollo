module.exports = {
    name: 'suggest',
    description: 'Suggest Ideas in a suggestion channel with a neat embed!',
    args: true,
    usage: '<Suggestion>',
    guildOnly: true,
    aliases: ['idea', 'suggestions'],
    execute(message, args, client) {
        const { MessageEmbed } = require("discord.js")

        let channel = message.guild.channels.cache.find((x) => (x.name === "suggestion" || x.name === "suggestions"))
    
    
        if(!channel) {
        return message.channel.send("there is no channel with name - suggestions")
        }
                                                        
        
        let embed = new MessageEmbed()
        .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
        .setThumbnail(message.author.avatarURL())
        .setColor("#ff2050")
        .setDescription(args.join(" "))
        .setTimestamp()
        
        
        channel.send(embed).then(m => {
        m.react("✅")
        m.react("❌")
        })
        

        
        message.channel.send("Sended Your Suggestion to " + channel)
    }
};