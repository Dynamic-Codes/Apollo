module.exports = {
	name: 'dm',
    description: 'Send a dm using the bot!',
    args: true,
    usage: '<@user> <messaage>',
    guildOnly: true,
	execute(message) {
        mentiondm = message.mentions.users.first();
        message.channel.bulkDelete(1);
        if(message.author.id !== '614829609665560687') return message.channel.send("Unable to use the command as this is Owner only.")
        if(mentiondm == null) return message.reply('Beep Boing: No user to send message to!');
        mentionMessage = message.content.slice(6);
        mentiondm.send(mentionMessage);            
        console.log('Message Sent!')
    }
};