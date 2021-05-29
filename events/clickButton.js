module.exports = {
	name: 'clickButton',
	async execute(button, client) {
        require('discord-buttons')(client)

        if (button.id === 'ping') {
            button.defer()
            button.channel.send('Pong!')
        }
	},
};