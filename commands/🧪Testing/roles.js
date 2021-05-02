module.exports = {
    name: 'roles',
    description: 'Display all of the roles in the server!',
    guildOnly: true,
    execute(message, args, client) {
        const Discord = require('discord.js')

        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");

        if (rolemap.length > 1024) rolemap = "To many roles to display";
        if (!rolemap) rolemap = "No roles";
        
        const embed = Discord.MessageEmbed()
        .addField("Role List" , rolemap)
        message.channel.send(embed);
    }
};