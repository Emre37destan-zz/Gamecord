# ❔ Trivia

```js
const { Trivia } = require('discord-gamecord')

new Trivia({
  message: message,
  opponent: message.mentions.users.first(),
  embed: {
    title: 'Trivia',
    description: 'Yanıt vermek için {time} saniyeniz var!',
    color: '#5865F2',
  },
  time: 60000,
	difficulty: 'hard',
  buttons: {
    one: '1️⃣',
    two: '2️⃣',
    three: '3️⃣',
    four: '4️⃣',
  },
	winMessage: 'GG, Cevabın doğruydu! Oldu **{answer}**',
  loseMessage: 'Cevabınız Yanlıştı! doğru cevap **{answer}**',
  othersMessage: 'Bu mesaj için butonları kullanmanıza izin verilmiyor!'
}).startGame();
```