module.exports = {
	name: 'dm',
    description: 'Send a dm using the bot!',
    args: true,
    usage: '<@user> <messaage>',
    guildOnly: true,
	execute(message, args) {
        mentiondm = message.mentions.users.first();
        message.channel.bulkDelete(1);
        let UImsg = (`Official Message!`)
        if(message.author.id !== '614829609665560687') UImsg = (`${message.author.username} | ${message.guild.name}`)
        if(mentiondm == null) return message.reply('Beep Boing: No user to send message to!');
        mentionMessage = args.slice(1).join(' ');
        const finalmsg = (`${UImsg}\n\n ${mentionMessage}`)
        mentiondm.send(finalmsg);            
        console.log('Message Sent!')
    }
};