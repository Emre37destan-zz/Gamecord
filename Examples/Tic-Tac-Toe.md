# 🧩 Tic Tac Toe

```js
const { TicTacToe } = require('discord-gamecord')

new TicTacToe({
  message: message,
  opponent: message.mentions.users.first(),
  embed: {
    title: 'Tic Tac Toe',
    color: '#5865F2',
  },
  oEmoji: '🔵', 
  xEmoji: '❌',
  oColor: 'PRIMARY',
  xColor: 'DANGER',
  turnMessage: '{emoji} | Şimdi sıra **{player}**!',
  waitMessage: 'Rakibi beklemek...',
  askMessage: 'Merhaba {opponent}, {challenger} size Tic Tac Toe oyunu için meydan okudu!',
  cancelMessage: 'Görünüşe göre Tic Tac Toe oynamayı reddetmişler. \:(',
  timeEndMessage: 'Rakip cevap vermeyince oyunu bıraktım!',
  drawMessage: 'O bir çizimdi!',
  winMessage: '{emoji} | **{winner}** oyunu kazandı!',
  gameEndMessage: 'Oyun bitmedi :(',
}).startGame();
```
