module.exports = {
    name: 'meme',
    description: 'A meme command just like Dank memer!',
    guildOnly: true,
    async execute(message, args, client) {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        try {
            const { body } = await snekfetch
                .get('https://www.reddit.com/r/${random}.json?sort=top&t=week')
                .query({ limit: 800 });
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return message.channel.send('It seems we are out of memes');
            const randomnumber = Math.floor(Math.random() * allowed.length)
            const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle(allowed[randomnumber].data.title)
                .setDescription("Posted by: " + allowed[randomnumber].data.author)
                .setImage(allowed[randomnumber].data.url)
                .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
                .setFooter("r/" + random)
            message.channel.send(embed)
        } catch (err) {
            return console.log(err);
        }
    }
};