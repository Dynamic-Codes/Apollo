module.exports = {
    name: 'spoof',
    description: 'Copy someones name and avatar and send a message!',
    args: true,
    usage: '<@user> <messaage>',
    guildOnly: true,
    cooldown: 5,
    aliases: ['s'],
    async execute(message, args, client) {
        const Discord = require('discord.js')
        const SpoofGuy = message.mentions.users.first()
        const msg = args.slice(1).join(" ")

        message.channel.bulkDelete(1)

        try {
            const webhooks = await message.channel.fetchWebhooks();
            const webhook = webhooks.first();

            if (!webhook) {
                await message.channel.send('There is no webhook.. Making one now!! Rerun the command :D')
                await message.channel.createWebhook('Apollo-Spoof', {
                    avatar: 'https://cdn.discordapp.com/avatars/833353624762581023/07c7c7803e89d942d6b1a91845f07cc4.webp',
                })
                .then(webhook => console.log(`Created webhook ${webhook}`))
                .catch(console.error);
            }
    
            await webhook.send(msg, {
                username: SpoofGuy.username,
                avatarURL: SpoofGuy.avatarURL(),
            });
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    }
};