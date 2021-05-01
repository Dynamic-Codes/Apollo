const { prefix, owner, mongodb_srv } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways');

const mongoose = require('mongoose')
//Economy
const mongoCurrency = require('discord-mongo-currency'); 
mongoCurrency.connect(mongodb_srv);
//Level
const Levels = require('discord-xp')
Levels.setURL(mongodb_srv)

const client = new Discord.Client();
client.commands = new Discord.Collection();
// client.events = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

// ['event_handler'].forEach(handler =>{
//     require(`./handler/${handler}`)(client, Discord);
// })

const snipes = new Discord.Collection()

client.on('messageDelete', message =>{
    snipes.set(messsage.channel.id, message)
})


for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('message', async message => {
    if (message.author.bot) return;
    if (message.author.id === '524276585214378034') return;

    const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}! Keep it going!`);
    }

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
	    ||client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    if (command.ownerOnly && message.author.id !== owner) {
        return message.reply('Permission Type Error! You are not the owner of the bot.')
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

	try {
        command.execute(message, args, client, snipes);
        
	} catch (error) {
        const errChnl = client.channels.cache.find(channel => channel.id === '833739612018049065')
		console.error(error);
        message.reply('there was an error trying to execute that command!');
        message.channel.send(`\`${error}\``)
        const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription(`__Error:__ ${error} \n__Command:__ ${prefix}${command.name}`)
        .addField('Server:' , `${message.guild.name} | ID: ${message.guild.id}`)
        .addField('User:', `${message.author.username} | ID: ${message.author.id}`)
        .setTimestamp()
        .setFooter('Error Occured at')
        errChnl.send(errorEmbed)
	}
});

mongoose.connect(mongodb_srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('MongoDB Native Driver Status: CONNECTED!')
}).catch((err)=>{
    console.log(err)
})


const activities_list = [
    "votes in space!", 
    "rover simulator.",
    "basketball on mars.", 
    "exploration misson!",
    "alien radio transmission!",
    "I don't know?",
    "How to skate on Europa!"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 300000); // Runs this every 10 seconds.
});

client.on('ready', () => {
    console.log(`Launching into space on ${client.user.username} rocket!`)
})

client.login(process.env.token);