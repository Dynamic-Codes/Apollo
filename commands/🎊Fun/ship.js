module.exports = {
	name: 'ship',
    description: 'See the ship fly!',
    args: true,
    usage: '<Person 1> <persone 2>',
	execute(message, args, client) {
        const Discord = require('discord.js')
        if (!args[0]) return message.channel.send("You forgot to mention someone!")
        if (!args[1]) return message.channel.send("You need to mention someone else!")
 
        if (args[0] || args[1]) {
            var FirstUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            var SecondUser = message.mentions.members.first(-1) || message.guild.members.cache.get(args[1])
 
            if (!FirstUser) return message.channel.send(`I couldn't find someone named **${args[0]}**!`)
            if (!SecondUser) return message.channel.send(`I couldn't find someone named **${args[1]}**!`)
 
            if (FirstUser || SecondUser) {
                const FirstUserSliced = FirstUser.user.username.slice(0, FirstUser.user.username.length / 2)
                const SecondUserSliced = SecondUser.map(user => { return user.user.username.slice(user.user.username.length / 2) })
                const SecondUserName = SecondUser.map(user => { return user.user.username })

                const embed = new Discord.MessageEmbed()
                .setTitle('💖---Ship---💖')
                .setThumbnail('https://ridemedtrust.com/wp-content/uploads/2018/10/medtrust-heart-attack-space-900x675.jpg')
                .setDescription(`${FirstUser.user.username} + ${SecondUserName} = **${FirstUserSliced}${SecondUserSliced}**`)
                message.channel.send(embed)
            }
        }
    }
};