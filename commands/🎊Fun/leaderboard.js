module.exports = {
    name: 'leaderboard',
    description: 'See what level you are!',
    guildOnly: true,
    aliases: ['lb'],
    async execute(message, args, client) {
        const Discord = require('discord.js')
        const Levels = require('discord-xp')
        message.channel.bulkDelete(1)
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard);

        const lb = leaderboard.map(
        (e) =>
            `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
            e.level
            }\nXP: ${e.xp.toLocaleString()}`,
        );

        const embed = new Discord.MessageEmbed()
        .setTitle('🏆 Top Level Users')
        .setDescription(lb.join('\n\n'))
        .setColor('#FFD700')
        .setFooter('ApolloProject')
        .setTimestamp()
        message.channel.send(embed)
    }
};