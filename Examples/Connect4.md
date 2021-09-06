# 🧩 Connect 4

```js
const { Connect4 } = require('discord-gamecord')

new Connect4({
  message: message,
  opponent: message.mentions.users.first(),
  embed: {
    title: 'Connect 4',
    color: '#5865F2',
  },
  emojis: {
    player1: '🔵',
    player2: '🟡'
  },
  turnMessage: '{emoji} | Şimdi sıra **{player}**!',
  winMessage: '{emoji} | **{winner}** oyunu kazandı!',
  gameEndMessage: 'Oyun bitmedi :(',
  drawMessage: 'O bir çizimdi!',
  askMessage: 'Merhaba {opponent}, {challenger} size Connect 4 oyunu için meydan okudu!',
  cancelMessage: 'Görünüşe göre Connect4 oyunu oynamayı reddetmişler. \:(',
  timeEndMessage: 'Rakip cevap vermeyince oyunu bıraktım!',
}).startGame();
```