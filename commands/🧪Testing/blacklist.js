module.exports = {
    name: 'blacklist',
    description: 'Block an user from using Apollo',
    args: true,
    usage: '<@user> <reason>',
    guildOnly: true,
    ownerOnly: true,
    async execute(message, args, client) {
        const Blacklist = require('../../models/blackListSchema')
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ")

        if (!mentionedMember) return message.channel.send('꒰⚠꒱ ꒦ Could not find the user! ꒷')
        if (!reason) reason = 'No reason stated'

        let profile = await Blacklist.findOne({
            userID: mentionedMember.user.id
        });
        if (profile) return message.channel.send('꒰ℹ꒱ ꒦ This member is already blacklisted! ꒷')
        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.user.id,
            reason: reason,
        });
        try {
            await profile.save();
            message.channel.send('꒰🔐꒱ ꒦ Successfully blacklisted member! ꒷')
        } catch (err) {
            console.log(err)
        }
    },
};