module.exports = {
    name: 'ping',
    description: 'Display information about the bot!',
    cooldown: 60,
    aliases: ['dashboard', 'response'],
    execute(message, args, client) {
        const Discord = require('discord.js')
    
        //Emoji for Bot Section
        GoodMoji = '<:DinoBeeGreen:790239959461265448>'
        OkayMoji = '<:DinoBeeYellow:790243409435688960>'
        FatalMoji = '<:DinoBeeRed:790243138806743080>'
        GearMoji = '<a:DinoBeeGears:790246372586291262>'
        LoadMoji = '<a:DinoBeeLoading:790303052913049630>'
        CheckMoji = '<a:DinoBeeVerified:790307652663246889>'
        PartyMoji = '<a:DinoBeeYay:790316795088076852>'
        AnBeeMoji = '<a:CuteBee:790337245924163615>'

        vrsn = `${GearMoji} Beta 21.5.3 | Verified Release ${CheckMoji}`
        vrsnBasic = `${GearMoji} Beta 21.5.3`

        message.channel.bulkDelete(1)

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        const pingTestEmbed = new Discord.MessageEmbed()
        .setTitle("Client Status Dashboard")
        .setDescription("This is the client dashboard! Here you can view information about the bot. All of this information is updated in real time.")
        .addField('__**Client Status:**__', `${GoodMoji} Client up and running!`)
        .addField('__**Standard Latency:**__', `🏓 Latency is ${Date.now() - message.createdTimestamp}ms.`)
        .addField('__**API Latency:**__', `${LoadMoji} API Latency is ${Math.round(client.ws.ping)}ms`)
        .addField('__**Bot Uptime:**__', `${GoodMoji} ${uptime}`)
        .addField('__**Client Version:**__', vrsn)
        .setFooter('🚀 The Apollo Project 🌌')
        
        message.channel.send(pingTestEmbed)
    }
};