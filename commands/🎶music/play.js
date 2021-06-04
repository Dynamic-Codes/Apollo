module.exports = {
    name: 'play',
    description: 'play music in a voice channel',
    args: true,
    usage: '<name / link>',
    guildOnly: true,
    aliases: ['p'],
    async execute(message, args, client) {
        const { Client, Message, MessageEmbed } = require('discord.js')

        if(!message.member.voice.channel) return;

        const query = args.join(" ")
        if(!query) return;

        await client.player.play(message, query);
    }
};