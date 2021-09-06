# GAMECORD
<p align="center"><img align="center" style="width:0.5px" src="https://cdn.discordapp.com/attachments/818900078077018162/867985070210809936/banner.png"/></p><br/>
<p align="center">
   <img alt="npm" src="https://img.shields.io/npm/dt/discord-gamecord">
   <a href="https://discord.gg/invite/GaczkwfgV9"><img src="https://badgen.net/discord/online-members/GaczkwfgV9" alt="Discord"></a>
</p>
      
> **Discord Gamecord, Discord içinde oyun oynamanıza izin veren güçlü bir modüldür. :)**

## **⚙️ Kurulum** 
```js
npm i discord-gamecord
```
- İçin Discord.js v12: npm i discord-gamecord@old

## **✨ Özellikleri**

- Süper basit ve kullanımı kolay.
- Başlangıç ​​dostu.
- Uygulaması Kolay.
- Büyük destek ve esnek.

## **📚 Kullanım**
```js
const { Snake } = require('discord-gamecord')

new Snake({
  message: message,
  embed: {
    title: 'Yılan Oyunu',
    color: '#7289da',
    OverTitle: "Oyun bitti",
  },
  snake: { head: '🟢', body: '🟩', tail: '🟢' },
  emojis: {
    board: '⬛', 
    food: '🍎',
    up: '⬆️', 
    right: '➡️',
    down: '⬇️',
    left: '⬅️',
  },
}).startGame()
```


## **✏️ Örnek**
### **Örnek mi Arıyorsunuz? buraya tıklayın:** [**Examples!**](https://github.com/aniket091/Gamecord/tree/main/Examples)
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const { Snake } = require('discord-gamecord');

client.on('message', async (message) => {
  if(message.content === '!snake') {
    new Snake({
      message: message,
      embed: {
        title: 'Snake Game',
	color: '#5865F2',
	OverTitle: "Game Over",
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢' },
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
```

## **📷 Ön izleme**
<img src="https://cdn.discordapp.com/attachments/818900078077018162/868061592871383060/example2.png">

## **❔ Destek**
<a href="https://discord.gg/AnUXS6z5tY"><img src="https://invidget.switchblade.xyz/AnUXS6z5tY" alt="Discord"></a>
