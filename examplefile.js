module.exports = {
        name: 'name',
        description: 'I am an example commad',
        args: true,
        usage: '<@user> <messaage>',
        guildOnly: true,
        ownerOnly: true,
        cooldown: 5,
        aliases: ['ex', 'eg'],
        execute(message, args, client) {
                //Code here
        }
};