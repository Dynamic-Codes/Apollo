module.exports = {
    name: 'suggest',
    description: 'Suggest Ideas in a suggestion channel with a neat embed!',
    args: true,
    usage: '<Suggestion>',
    guildOnly: true,
    aliases: ['idea', 'suggestions'],
    async execute(message, args, client) {
        const { MessageEmbed } = require("discord.js")
        const Guild = require('./models/guildSchema')
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id
        });
        
        message.channel.bulkDelete(1)
        
        let embed = new MessageEmbed()
        .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
        .setThumbnail(message.author.avatarURL())
        .setColor("#ff2050")
        .setDescription(args.join(" "))
        .setTimestamp()
        
        let chx = guildProfile.suggestionChannel;

        if(chx === null) {
            return message.reply('꒰ℹ꒱ ꒦ This server has not setup there suggetsion channel. ꒷')
        }

        client.channels.cache.get(chx).send(embed).then(m => {
        m.react("✅")
        m.react("❌")
        })
        

        
        message.channel.send("Suggestion Sent!")
    }
};