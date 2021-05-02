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

        // if (rolemap.length > 1024) rolemap = `To many roles to display! Map Length: ${rolemap.length}`;
        // if (!rolemap) rolemap = "No roles";

        trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        console.log(trimString(rolemap, 2047))

        let exceedmap = (trimString(rolemap, 2047))

        const embed = new Discord.MessageEmbed()
        .setTitle('Server Role Map')
        .setDescription(exceedmap)
        .setFooter('ApolloProject')
        message.channel.send(embed);
    }
};