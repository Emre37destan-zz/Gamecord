const Discord = require('discord.js');
const client = new Discord.Client();
const { Snake } = require('../index');


client.on('message', async (message) => {
  if(message.content === '!snake') {
    new Snake({
      message: message,
      embed: {
        title: 'YÄ±lan Oyunu',
	color: '#5865F2',
	OverTitle: "Oyun Bitti",
      },
      snake: { head: 'ð', body: 'ð¨', tail: 'ð¡' },
      emojis: {
        board: 'â¬', 
        food: 'ð',
        up: 'â¬ï¸', 
        down: 'â¬ï¸',
	right: 'â¡ï¸',
	left: 'â¬ï¸',
      }
    }).startGame();
  }
});

client.login('DISCORD_BOT_TOKEN');