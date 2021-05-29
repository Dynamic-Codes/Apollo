module.exports = {
	name: 'clickButton',
	async execute(button, client) {
        if (button.id === 'ping') {
            button.channel.send('Pong!');
        }
	},
};