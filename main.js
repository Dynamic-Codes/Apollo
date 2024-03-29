const { owner, mongodb_srv, token } = require('./config.json');
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
client.cooldowns = new Discord.Collection();

const distube = require('distube')
const player = new distube(client);

player.on('playSong', (message, queue, song) => {
    message.channel.send(`${song.name} has started playing!`)
});

client.player = player;

const commandFolders = fs.readdirSync('./commands');

const snipes = new Discord.Collection()

require('discord-buttons')(client)

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));



for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

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
        let balanceProfile = await Balance.findOne({ userID: message.author.id});
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }
        await Balance.findOneAndUpdate({ userID: message.author.id}, { balance: balanceProfile.balance + randomAmountOfCoins, lastEdited: Date.now() })
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

    const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
        command.execute(message, args, client, snipes);
        
	} catch (error) {
        const errChnl = client.channels.cache.find(channel => channel.id === '840291138538831888')
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

client.on('message', async message => {
    if (message.author.bot) return;

    const Count = require('./models/countSchema');
    const args = message.content.trim().split(/ +/);
    let nn1 = parseInt(args[0])

    let countProfile = await Count.findOne({ guildID: message.guild.id});
    if (!countProfile) return;
    if (message.channel.id !== countProfile.channelID) return;
    if (isNaN(args[0])) return message.delete();
    if (message.author.id === countProfile.LastAuth) return message.delete();
    let nn = (countProfile.CountNum + 1)
    console.log(nn)
    if (nn1 !== nn) return message.delete();

    if(args[0] == nn1){
        //
        const webhooks = await message.channel.fetchWebhooks();
        const webhook = webhooks.first();
        message.delete()
        await Count.findOneAndUpdate({ guildID: message.guild.id}, { LastAuth: message.author.id, CountNum: countProfile.CountNum + 1 })
        await webhook.send(nn, {
            username: message.author.username,
            avatarURL: message.author.avatarURL(),
        });

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
    }, 300000); // Runs this every 30 seconds.
});

client.on('ready', () => {
    console.log(`Launching into space on ${client.user.username} rocket!`)
})


client.login(token);