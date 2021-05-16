module.exports = {
	name: 'dm',
    description: 'Send a dm using the bot!',
    args: true,
    usage: '<@user> <messaage>',
    guildOnly: true,
	execute(message, args) {
        mentiondm = message.mentions.users.first();
        message.channel.bulkDelete(1);
        const UImsg = (`Official Message!`)
        if(message.author.id !== '614829609665560687') UImsg = (`${message.author.username} | ${message.guild.name}\n`)
        if(mentiondm == null) return message.reply('Beep Boing: No user to send message to!');
        mentionMessage = args.slice(1).join(' ');
        finalmsg = (`${UImsg} ${mentionMessage}`)
        mentiondm.send(mentionMessage);            
        console.log('Message Sent!')
    }
};