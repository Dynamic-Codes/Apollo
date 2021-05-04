module.exports = {
    name: 'afk',
    description: 'Set your self afk with a neat message',
    args: true,
    usage: '<reason>',
    guildOnly: true,
    async execute(message, args, client) {
        const db = require('../../models/afk-schema')
        
        const { guild, author } = message;

        await db.findOne({ guildId: guild.id, userId: author.id }, async (err, res) => {
            if (err) return message.reply("⚠ | Could not establish connection to `Proxima B` Database!")
            if (!res) {
                const newData = new db({
                    guildId: guild.id,
                    userId: author.id
                })
                newData.save().then(() => {
                    return message.reply('✅ | Set your status to afk!')
                })
            } else if (res) {
                await db.findOneAndDelete({ guildId: guild.id, userId: author.id }).then(() => {
                    return message.reply('✅ | Set your status to not afk any more!')
                })

            }
        })
    }
};