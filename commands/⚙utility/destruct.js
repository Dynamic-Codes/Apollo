module.exports = {
    name: 'leave',
    description: 'Leave a server', 
    args: true,
    usage: '<Guild ID>',
    guildOnly: true,
    ownerOnly: true,
    aliases: ['destruct', 'self-destruct'],
    async execute(message, args, client) {
        const id = args[0]
        message.channel.bulkDelete(1)
        const Discord = require('discord.js');

        await setTimeout(() => { message.channel.send('T minus 4 seconds..'); }, 1000);
        await setTimeout(() => { message.channel.send('--⚠-- 3'); }, 1000);
        await setTimeout(() => { message.channel.send('--⚠-- 2'); }, 1000);
        await setTimeout(() => { message.channel.send('--⚠-- 1'); }, 1000);

        const embed = new Discord.MessageEmbed()
        .setTitle('💣 Self Destructing now...')
        await message.channel.send(embed)

        client.guilds.cache.get(id).leave()
        .catch(err => {
            console.log(`there was an error leaving the guild: \n ${err.message}`);
        })
    }
};