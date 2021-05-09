module.exports = {
    name: 'planet',
    description: 'Find information about our universe, mostly planets and moons!',
    args: true,
    usage: '<Planet Name>',
    guildOnly: false,
    ownerOnly: false,
    execute(message, args) {
        const Discord = require('discord.js');
        const Typeinfo = (args[0]);

        if (!["jupiter"].includes(args[0])) return message.channel.send('꒰⚠꒱ ꒦ Our database is fresh outa a white hole, as of now we only support `Jupiter`! ꒷')

        var fs = require("fs");
        const { orbData, surfArea, Radius, Mass, DisSun  } = require(`../../SpaceFacts/Data/${Typeinfo}.json`);
        var PlanetInfo = fs.readFileSync(`./SpaceFacts/Information/${Typeinfo}.txt`, {"encoding": "utf-8"});
        var PlanetMoon = fs.readFileSync(`./SpaceFacts/MoonInfo/${Typeinfo}.txt`, {"encoding": "utf-8"});

        const PlanetEmbed = new Discord.MessageEmbed()
            .setTitle(`Planet: ${Typeinfo}`)
            .setColor(7419530) 
            .setDescription(PlanetInfo)
            .addFields(
                { name: 'Orbital Time', value: orbData, inline: true },
                { name: 'Surface Area', value: surfArea, inline: true },
                { name: 'Radius', value: Radius, inline: true },
                { name: 'Mass', value: Mass, inline: true },
                { name: 'Distance from Sun', value: DisSun, inline: true },
                { name: '\u200B', value: '\u200B' },
            )
            .addField('Moons', PlanetMoon)           
            .attachFiles([`./SpaceFacts/Photo/${Typeinfo}.png`])
	            .setImage(`attachment://${Typeinfo}.png`)
            message.channel.send({embed: PlanetEmbed}).then(embedMessage => {
                embedMessage.react("⭐");
            });
    }
};