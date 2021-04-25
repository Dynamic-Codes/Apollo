module.exports = {
	name: 'rps',
    description: 'Play a game of Rock, paper, scissors.',
    args: true,
    usage: '<choice>',
	execute(message, args) {
        let arg = args[0]
        let choices1 = ['rock', 'paper', 'scissors'];
            if (choices1.includes(arg.toLowerCase())) {
                let number = Math.floor(Math.random() * 3);
                if (number == 1) {
                    return message.channel.send('It was a tie, we both had ' + (args[1]).toLowerCase())
                }
                if (number == 2) {
                    if (arg.toLowerCase() == "rock") {
                        return message.channel.send('I won, I had paper.')
                    }
                    if (arg.toLowerCase() == "paper") {
                        return message.channel.send('I won, I had scissors.')
                    }
                    if (arg.toLowerCase() == "scissors") {
                        return message.channel.send('I won, I rock.')
                    }
                }
                if (number == 0) {
                    if (arg.toLowerCase() == "rock") {
                        return message.channel.send('You won, I had scissors.')
                    }
                    if (arg.toLowerCase() == "paper") {
                        return message.channel.send('You won, I had rock.')
                    }
                    if (arg.toLowerCase() == "scissors") {
                        return message.channel.send('You won, I paper.')
                    }
                }
            } else {
                return message.channel.send('Please include either: Rock, Paper, or Scissors.')
            }
    }
};