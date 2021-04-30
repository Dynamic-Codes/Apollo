module.exports = {
    name: 'meme',
    description: 'A meme command just like Dank memer!',
    guildOnly: true,
    async execute(message, args, client) {
        const Discord = require('discord.js')
        const fetch = require("node-fetch");
        const subReddits = ["memes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const url = `https://www.imgur.com/r/${random}/hot.json`;
        const res = await fetch(url);
        const json = await res.json();
        const posts = json.data
            .filter(f => message.channel.nsfw || !f.nsfw);

        if (!posts.length) return message.channel.send("No posts, maybe try in a nsfw channel");

        const post = posts[Math.floor(Math.random() * posts.length)];
        const redditUrl = `https://www.reddit.com${post.reddit}`;
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setImage(`https://imgur.com/${imageData.hash}${imageData.ext.replace(/\?.*/, '')}`)
            .setTitle("Post from r/" + random)
            .setURL(redditUrl)
            //this might be imgur upvotes or reddit upvotes idk
            .addField("Votes", post.score)
        message.channel.send(embed);
    }
};