module.exports = {
        name: 'watch',
        description: 'Watch youtube in discord!',
        guildOnly: true,
        cooldown: 30,
        async execute(message, args, client) {
                message.delete()
                const mongoose = require('mongoose');
                const Discord = require('discord.js');
                const ms = require("ms");
                const fetch = require("node-fetch")
                const TKN = 'ODMzMzUzNjI0NzYyNTgxMDIz.YHxHCw.1inUgFf-APfmffIWQhOHGgMf2AQ'

                //Code here

                const member = message.guild.member(message.author.id);

                let channel = message.member.voice.channel;
                if(!channel) return message.reply('You have to be in a Voice Channel to use this command!');

                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                        method:"POST",
                        body: JSON.stringify({
                                max_age: 86400,
                                max_uses: 0,
                                target_application_id:"755600276941176913",
                                target_type: 2,
                                temporary: false,
                                validate: null
                        }),
                        headers: {
                                "Authorization": `Bot ${client.token}`,
                                "Content-Type": "application/json"
                        }

                })
                .then(res => res.json())
                .then(invite => {
                        if(!invite.code) return message.channel.send("I could not start YouTube!");
                        message.channel.send(`https://discord.com/invite/${invite.code}`)
                })
        }
};