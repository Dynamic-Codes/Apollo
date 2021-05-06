module.exports = {
    name: 'settings',
    description: 'Server settings for the bot in your server!',
    guildOnly: true,
    aliases: ['server-settings'],
    async execute(message, args, client) {
        const mongoose = require('mongoose')
        const Guild = require('../../models/guildSchema')
        const Discord = require('discord.js')

        message.channel.bulkDelete(1)

        if (!message.member.permissions.has("MANAGE_GUILD")) {
            const PermErrorEmbed = new Discord.MessageEmbed()
                .setTitle('Missing Permission!')
                .setDescription('Seems like you don\'t have the correct permission to use this command! Yikes..')
                .addFields({
                    name: '__User:__',
                    value: `\`${message.author.username}\``,
                    inline: true
                }, {
                    name: '__Permission:__',
                    value: '`MANAGE GUILD`',
                    inline: true
                }, )
                .setColor(5158332)
                .setFooter('Fact: The sun will engulf Earth in the far future!')
            return message.reply(PermErrorEmbed)
        }

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

        const SettingEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}'s Settings:`)
            .setDescription(`If you are seeing no fields below, that means you have not done the setup yet!\nProperties: suggestionChannel, muteRoleID`)
            .setColor("BLUE")
        
        if (guildProfile.prefix) SettingEmbed.addField(`Server Prefix`, guildProfile.prefix);
        if (guildProfile.suggestionChannel) SettingEmbed.addField(`Suggestion Channel`, guildProfile.suggestionChannel);
        if (guildProfile.muteRoleID) SettingEmbed.addField(`Mute Role`, guildProfile.muteRoleID);

        message.channel.send(SettingEmbed)

    }
};