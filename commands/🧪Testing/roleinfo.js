module.exports = {
    name: 'roleinfo',
    description: 'Get information about a certian role!',
    args: true,
    usage: '<role-id>',
    guildOnly: true,
    async execute(message, args, client) {
        const Discord = require('discord.js')
        let role;
        if(args[0] && isNaN(args[0]) && message.mentions.roles.first()) role = message.mentions.roles.first()
        if(args[0] && isNaN(args[0]) && !message.mentions.roles.first()){
            role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())

            if(!message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())) return message.reply(":x: Role not found")
        }
        if(args[0] && !isNaN(args[0])){
            role = message.guild.roles.cache.find(e => e.id == args[0])
            if(!message.guild.roles.cache.has(args[0])) return message.reply(":x: Role not found")
        }

        if(!role) return message.reply("You must mention role")
        let rolemembers;
        if(role.members.size > 20) rolemembers = role.members.map(e => `<@${e.id}>`).slice(0,20).join(", ") + ` and ${role.members.size - 20} more members...`
        if(role.members.size < 20) rolemembers = role.members.map(e => `<@${e.id}>`).join(", ")

        let embed = new Discord.MessageEmbed()
            .setColor(role.color)
            .setAuthor(message.guild.name,message.guild.iconURL())
            .setDescription(`**Role Name:** ${role.name} (<@&${role.id}>) \n\n**Role ID:** **\`${role.id}\`**\n\n**Role Mentionable:** ${role.mentionable.toString().replace("true","Yes").replace("false","No")}\n\n\n**Role Members Size:** ${role.members.size || 0}`)
            .addField("Role Members;",rolemembers || "Not Found")
            .setFooter('Apollo Project')

        message.channel.send(embed)

        try {
            const roleName = message.guild.roles.cache.find(r => (r.name === args.toString()) || (r.id === args.toString()))
            console.log(roleName)
            const perms = new permissions(roleName.permissions.bitfield).toArray()

            const embed = new MessageEmbed()
                .setColor(roleName.color)
                .setTitle(roleName.name)
                .addFields(
                    {
                        name: 'Role ID: ',
                        value: roleName.id,
                        inline: true
                    },
                    {
                        name: 'Role Name: ',
                        value: roleName.name,
                        inline: true
                    },
                    {
                        name: 'Mentionable: ',
                        value: roleName.mentionable ? 'Yes' : 'No',
                        inline: true
                    },
                    {
                        name: 'Role Permissions: ',
                        value: perms.join(', ')
                    }
                )

            await message.channel.send(embed)

        } catch (e) {
            return message.channel.send('Role Doesn\'t Exist').then(() => console.log(e))
        }
    }
};