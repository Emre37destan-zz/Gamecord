# 🐍 Snake

```js
const { Snake } = require('discord-gamecord')

new Snake({
  message: message,
  embed: {
  title: 'Yılan Oyunu',
  color: '#5865F2',
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
  othersMessage: 'Bu mesaj için butonları kullanmanıza izin verilmiyor!',
}).startGame();
```