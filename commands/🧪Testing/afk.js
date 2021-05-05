module.exports = {
    name: 'afk',
    description: 'Set your self afk with a neat message',
    usage: '<reason>',
    guildOnly: true,
    async execute(message, args, client) {
        const Afk = require('../../models/afkSchema');
        const mongoose = require('mongoose')

        let reason = args.join(" ")
        if(!reason) reason = "Not set by user."
        let afkProfile = await Afk.findOne({
            userID: message.author.id
        });
        if (!afkProfile) {
            afkProfile = await new Afk({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                reason: reason,
            });
            await afkProfile.save()
            message.channel.send('꒰⛔꒱ ꒦ Your status is now set to AFK! ꒷');
        } else return message.channel.send('꒰ℹ꒱ ꒦ You are already AFK! ꒷');
    },
};