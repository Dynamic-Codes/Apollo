module.exports = {
    name: 'massrole',
    description: 'Adds or remove a role from every single user!',
    args: true,
    usage: '<+/-> <role>',
    guildOnly: true,
    cooldown: 1,
    aliases: ['mrole'],
    execute(message, args, client) {

        if (args[0] === '+') {
            roleID = message.mentions.roles.first();

            message.guild.members.cache.forEach(member => {
                member.roles.add(roleID)
            })
        }

        if (args[0] === '-') {
            roleID = message.mentions.roles.first();

            message.guild.members.cache.forEach(member => {
                member.roles.remove(roleID)
            })
        }
    }
};