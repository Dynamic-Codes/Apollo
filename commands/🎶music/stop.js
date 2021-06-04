module.exports = {
    name: 'stop',
    description: 'stops music in a voice channel',
    guildOnly: true,
    async execute(message, args, client) {
        const { Client, Message, MessageEmbed } = require('discord.js')

        if(!message.member.voice.channel) return;

        client.player.stop(message)
    }
};