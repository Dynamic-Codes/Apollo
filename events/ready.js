module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Discord Event Drivers: CONNECTED!`);
	},
};