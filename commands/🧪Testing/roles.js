module.exports = {
    name: 'roles',
    description: 'Display all of the roles in the server!',
    guildOnly: true,
    execute(message, args, client) {
        const Discord = require('discord.js')

        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join("\n");

        if (rolemap.length > 1024) rolemap = "To many roles to display";
        if (!rolemap) rolemap = "No roles";

        const embed = new Discord.MessageEmbed()
        .setTitle('Server Role Map')
        .setDescription(rolemap)
        .setFooter('ApolloProject')
        message.channel.send(embed);
    }
};