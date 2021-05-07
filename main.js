const { owner, mongodb_srv } = require('./config.json');
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
    snipes.set(message.channel.id, message)
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

const Blacklist = require('./models/blackListSchema')
const Guild = require('./models/guildSchema')
const Balance = require('./models/balanceSchema')

client.on('message', async message => {
    if (message.author.bot) return;

    let guildProfile = await Guild.findOne({
        guildID: message.guild.id
    });
    
    if (!guildProfile) {
        guildProfile = await new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
        });
        await guildProfile.save().catch(err => console.log(err));
    }

    const prefix = guildProfile.prefix;

    const randomAmountOfCoins = Math.floor(Math.random() * 10) + 5; //give us 5 - 15 coins
    const messageGive = Math.floor(Math.random() * 10) + 1; // get 1- 10
    if (messageGive >= 2 && messageGive <= 5) {
        let balanceProfile = await Balance.findOne({ userID: message.author.id, guildID: message.guild.id });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                guildID: message.guild.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }
        await Balance.findOne({ userID: message.author.id, guildID: message.guild.id }, { balance: balanceProfile.balance + randomAmountOfCoins, lastEdited: Date.now() })
    }

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

    let profile = await Blacklist.findOne({
        userID: message.author.id
    })
    if (profile) return message.reply('꒰🔐꒱ ꒦ You are banned from using the bot! ꒷')
    
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

client.on('message', async message => {
    if (message.author.bot) return;

    const Afk = require('./models/afkSchema')
    if (await Afk.findOne({ userID: message.author.id })) {
        let afkProfile = await Afk.findOne({ userID: message.author.id });
        if (afkProfile.messagesLeft == 0) {
            await Afk.findOneAndDelete({ userID: message.author.id })
            message.channel.send('꒰💬꒱ ꒦ You are no longer AFK! ꒷')
        } else {
            await Afk.findOneAndUpdate({ userID: message.author.id }, {messagesLeft: afkProfile.messagesLeft - 1});
        }
    }

    if(message.mentions.members.first()) {
        await message.mentions.members.forEach(async member => {
            let afkProfile = await Afk.findOne({ userID: member.user.id });
            if (afkProfile) message.channel.send(`꒰${member.user.tag}꒱ ꒦ Is currently AFK for reason: ${afkProfile.reason} ꒷`)
        })
    }
})


const activities_list = [
    "votes in space!", 
    "rover simulator.",
    "basketball on mars.", 
    "exploration misson!",
    "alien radio transmission!",
    "I don't know?",
    "How to skate on Europa!",
    "How to not be AFK"
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