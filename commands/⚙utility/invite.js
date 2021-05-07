module.exports = {
    name: 'invite',
    description: 'Get the invite link for the Bot & our Support Server!',
    guildOnly: true,
    cooldown: 60,
    aliases: ['support', 'inv'],
    execute(message, args, client) {
        const Discord = require('discord.js')
        CheckMoji = '<a:DinoBeeVerified:790307652663246889>'
        PartyMoji = '<a:DinoBeeYay:790316795088076852>'
        
        message.channel.bulkDelete(1)
            const randomBetween = (min, max) => Math.floor(Math.random()*(max-min+1)+min);
            const color = [
                randomBetween(0, 255),
                randomBetween(0, 255),
                randomBetween(0, 255),
            ];
            const InviteEmbed = new Discord.MessageEmbed()
            .setTitle('Invite Me?!')
            .setURL('https://discord.com/oauth2/authorize?client_id=833353624762581023&scope=bot&permissions=8')
            .setThumbnail(`https://media.discordapp.net/attachments/771698633887711232/790316510228119602/2936_Yayy.gif`)
            .setDescription('Galactastic! Getting ready to be launched into your server.. [Invite Me](https://discord.com/oauth2/authorize?client_id=833353624762581023&scope=bot&permissions=8)')
            .addField('Why Invite Me?' , `Well you can enjoy all of the features in your own sever! ${CheckMoji}`)
            .addField('Need Support?', `Join our Support server! [Mission Control](https://discord.gg/2NYj5yHAGr)`)
            .setColor(color)
            message.channel.send({embed: InviteEmbed}).then(embedMessage => {
                embedMessage.react(PartyMoji)
            });
    }
};