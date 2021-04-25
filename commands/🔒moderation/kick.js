module.exports = {
	name: 'kick',
    description: 'Kick a member of the server.',
    args: true,
    usage: '<@user> <reason>',
    guildOnly: true,
	execute(message, args) {
        const Discord = require('discord.js');

        const user = message.mentions.users.first()


		if(!message.member.permissions.has("KICK_MEMBERS")){
			const PermErrorEmbed = new Discord.MessageEmbed()
			.setTitle('Missing Permission!')
			.setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
			.addFields(
				{name: '__User:__' , value: `\`${message.author.username}\``, inline: true},
				{name: '__Permission:__' , value: '`KICK MEMBERS`',inline: true},
			)
			.setColor(5158332)
			.setFooter('Fact: A bee has to travel the same distance as 3 earths to produce 1kg of honey!')
			return message.reply(PermErrorEmbed)
        }
        
        const reason = args.slice(1).join(' ');
        const member = message.guild.members.resolve(user);
        if(member){
            member.kick(`kicked by ${message.author.username}. Reason: ${reason}`)
            .then(()=>{
                return message.channel.send(`Successfully kicked **${user.tag}** from the server!`);
            })
            .catch(err =>{
                message.channel.send('An error occured! Could not kick member!')
                console.error(err)
            })
        }
    }
};