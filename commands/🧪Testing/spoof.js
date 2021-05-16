module.exports = {
    name: 'spoof',
    description: 'Copy someones name and avatar and send a message!',
    args: true,
    usage: '<@user> <messaage>',
    guildOnly: true,
    ownerOnly: true,
    cooldown: 5,
    execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Some Title')
            .setColor('#0099ff');

        try {
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();
    
            await webhook.send('Webhook test', {
                username: 'some-username',
                avatarURL: 'https://i.imgur.com/wSTFkRM.png',
                embeds: [embed],
            });
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    }
};