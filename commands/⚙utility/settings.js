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

        if (!args.length) {
            let SettingEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}'s Settings:`)
            .setDescription(`If you are seeing no fields below, that means you have not done the setup yet!\nProperties: suggestionChannel, muteRoleID, auditLogID, joinRoleID`)
            .setColor("BLUE")
        
            if (guildProfile.prefix) SettingEmbed.addField(`Server Prefix`, guildProfile.prefix);
            if (guildProfile.suggestionChannel) SettingEmbed.addField(`Suggestion Channel`, guildProfile.suggestionChannel);
            if (guildProfile.muteRoleID) SettingEmbed.addField(`Mute Role`, guildProfile.muteRoleID);
            if (guildProfile.auditLogID) SettingEmbed.addField(`Audit Log`, guildProfile.auditLogID);
            if (guildProfile.joinRoleID) SettingEmbed.addField(`Audit Log`, guildProfile.joinRoleID);

            message.channel.send(SettingEmbed)
        } else {
            if (!["prefix", "suggestionChannel", "muteRoleID", "auditLogID", "joinRoleID"].includes(args[0])) return message.channel.send('꒰⚠꒱ ꒦ You need to state a valid property to update. ꒷')
            if (!args[1]) return message.channel.send('꒰⚠꒱ ꒦ You need to state the updated value. ꒷')

            if ("prefix" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[1], lastEdited: Date.now() })
                message.channel.send(`꒰✅꒱ ꒦ Updated: ${args[0]} ⇢ ${args[1]} ꒷`)
            } else if ("suggestionChannel" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { suggestionChannel: args[1], lastEdited: Date.now() })
                message.channel.send(`꒰✅꒱ ꒦ Updated: ${args[0]} ⇢ ${args[1]} ꒷`)
            } else if ("muteRoleID" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: args[1], lastEdited: Date.now() })
                message.channel.send(`꒰✅꒱ ꒦ Updated: ${args[0]} ⇢ ${args[1]} ꒷`)
            } else if ("auditLogID" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { auditLogID: args[1], lastEdited: Date.now() })
                message.channel.send(`꒰✅꒱ ꒦ Updated: ${args[0]} ⇢ ${args[1]} ꒷`)
            } else if ("joinRoleID" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { joinRoleID: args[1], lastEdited: Date.now() })
                message.channel.send(`꒰✅꒱ ꒦ Updated: ${args[0]} ⇢ ${args[1]} ꒷`)
            }
        }

    }
};