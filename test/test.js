const Discord = require('discord.js');
const client = new Discord.Client();
const { Snake } = require('../index');


client.on('message', async (message) => {
  if(message.content === '!snake') {
    new Snake({
      message: message,
      embed: {
        title: 'Yılan Oyunu',
	color: '#5865F2',
	OverTitle: "Oyun Bitti",
      },
      snake: { head: '😄', body: '🟨', tail: '🟡' },
      emojis: {
        board: '⬛', 
        food: '🍎',
        up: '⬆️', 
        down: '⬇️',
	right: '➡️',
	left: '⬅️',
      }
    }).startGame();
  }
});

client.login('DISCORD_BOT_TOKEN');