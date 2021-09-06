const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { i, shuffle } = require('../functions/functions')
const difficulties = ['easy', 'medium', 'hard'];
const { decode } = require('html-entities');
const fetch = require('node-fetch');

module.exports = class Trivia {
	constructor(options = {}) {
		if (!options.message) throw new TypeError('NO_MESSAGE: Lütfen bir mesaj argümanı sağlayın')
		if (typeof options.message !== 'object') throw new TypeError('INVALID_MESSAGE: Geçersiz Discord Mesajı nesnesi sağlandı.')
        
		if (!options.embed) options.embed = {};
        if (!options.embed.title) options.embed.title = 'Trivia';
        if (typeof options.embed.title !== 'string')  throw new TypeError('INVALID_TITLE: Yerleştirme Başlığı bir dize olmalıdır.')

        if (!options.embed.color) options.embed.color = '#5865F2';
        if (typeof options.embed.color !== 'string')  throw new TypeError('INVALID_COLOR: Embed Color bir dize olmalıdır.')
        
		if (!options.embed.description) options.embed.description = 'Yanıt vermek için {time} saniyeniz var!';
        if (typeof options.embed.description !== 'string')  throw new TypeError('INVALID_DESCRIPTION: Embed Description must be a string.')

		if (!options.buttons) options.buttons = {};
		if (!options.buttons.one) options.buttons.one = '1️⃣';
		if (typeof options.buttons.one !== 'string') throw new TypeError('INVALID_BUTTON_ONE: Düğme Bir Emoji bir dize olmalıdır.')
		if (!options.buttons.two) options.buttons.two = '2️⃣';
		if (typeof options.buttons.two !== 'string') throw new TypeError('INVALID_BUTTON_TWO: Düğme İki Emoji bir dize olmalıdır.')
		if (!options.buttons.three) options.buttons.three = '3️⃣';
		if (typeof options.buttons.three !== 'string') throw new TypeError('INVALID_BUTTON_THREE: Düğme Üçüncü Emoji bir dize olmalıdır.')
		if (!options.buttons.four) options.buttons.four = '4️⃣';
		if (typeof options.buttons.four !== 'string') throw new TypeError('INVALID_BUTTON_FOUR: Düğme Dördüncü Emoji bir dize olmalıdır.')

		if (!options.winMessage) options.winMessage = 'GG, Cevabın doğruydu! **{answer}** idi';
        if (typeof options.winMessage !== 'string')  throw new TypeError('WIN_MESSAGE: Win Mesajı bir dize olmalıdır.')

		if (!options.loseMessage) options.loseMessage = 'Cevabınız Yanlıştı! doğru cevap **{answer}**';
        if (typeof options.loseMessage !== 'string')  throw new TypeError('LOSE_MESSAGE: Lose Message bir dize olmalıdır.')

    
		if (!options.time) options.time = 60000;
		if (parseInt(options.time) < 10000) throw new TypeError('TIME_ERROR: Süre ms cinsinden 10 saniyeden az olamaz (i.e 10000 ms)!')
		if (typeof options.time !== 'number') throw new TypeError('INVALID_TIME: Zaman bir sayı olmalı!')

		if (!options.difficulty) options.difficulty = difficulties[Math.floor(Math.random()*difficulties.length)]
		if (typeof options.difficulty !== 'string')  throw new TypeError('INVALID_DIFFICULTY: Trivia Zorluk bir dize olmalıdır.')

		if (!options.othersMessage) options.othersMessage = 'Bu mesaj için butonları kullanmanıza izin verilmiyor!';
        if (typeof options.othersMessage !== 'string') throw new TypeError('INVALID_OTHERS_MESSAGE: Diğerleri Mesaj bir dize olmalıdır.')

		this.options = options;
		this.message = options.message;
	}

	async startGame() {
		const data = {};

		const btn_1 = i(15)
		const btn_2 = i(15)
		const btn_3 = i(15)
		const btn_4 = i(15)

		await fetch(`https://opentdb.com/api.php?amount=1&type=multiple&difficulty=${this.options.difficulty}`)
		.then((res) => res.json())
		.then(async (res) => {
			const result = res.results[0];
			await result.incorrect_answers.push(result.correct_answer)
			const shuffled = shuffle(result.incorrect_answers)

			data.question = result.question;
			data.difficulty = result.difficulty;
			data.category = result.category;
			data.options = shuffled;
			data.correct = shuffled.indexOf(result.correct_answer)
		})
    
		
		let winnerID;
		if (data.correct === 0) {
			winnerID = btn_1;
		} else if (data.correct === 1) {
			winnerID = btn_2
		} else if (data.correct === 2) {
			winnerID = btn_3
		} else if (data.correct === 3) {
			winnerID = btn_4
		}
    
		const btn1 = new MessageButton().setStyle('PRIMARY').setCustomId(btn_1).setEmoji(this.options.buttons.one)
		const btn2 = new MessageButton().setStyle('PRIMARY').setCustomId(btn_2).setEmoji(this.options.buttons.two)
		const btn3 = new MessageButton().setStyle('PRIMARY').setCustomId(btn_3).setEmoji(this.options.buttons.three)
		const btn4 = new MessageButton().setStyle('PRIMARY').setCustomId(btn_4).setEmoji(this.options.buttons.four)
		const row = new MessageActionRow().addComponents(btn1, btn2, btn3, btn4)

		let options = data.options.map((o, i) => `**\`${i+=1}\` -** ${decode(o)}`).join('\n')
		let desc = `**${decode(data.question)}**\n\n**Kategori:** ${data.category}\n**Zorluk:** ${data.difficulty}\n\n**Seçenekler**\n${options}`

        const embed = new MessageEmbed()
		.setTitle(this.options.embed.title)
		.setColor(this.options.embed.color)		
		.setDescription(`${desc}\n\n${this.options.embed.description.replace('{time}', Math.floor(this.options.time / 1000))}`)
		.setAuthor(this.message.author.tag, this.message.author.displayAvatarURL({ dynamic: true}))

		const msg = await this.message.channel.send({ embeds: [embed], components: [row] })
        
		const filter = m => m;
        const collector = msg.createMessageComponentCollector({
            filter,
            idle: this.options.time,
        }) 

		collector.on('collect', async btn => {
			if (btn.user.id !== this.message.author.id) return btn.reply({ content: this.options.othersMessage,  ephemeral: true })

			await btn.deferUpdate();
			if (btn.customId === winnerID) {
				for (let x = 0; x < msg.components.length; x++) {
					for (let y = 0; y < msg.components[x].components.length; y++) {
					  msg.components[x].components[y].disabled = true;
					}
				}
				msg.components[0].components[data.correct].style = 'SUCCESS';
				msg.embeds[0].description = desc;

				msg.edit({ content: this.options.winMessage.replace('{answer}', data.options[data.correct]), embeds: msg.embeds, components:  msg.components})

				collector.stop()
			} else {
				for (let x = 0; x < msg.components.length; x++) {
					for (let y = 0; y < msg.components[x].components.length; y++) {
					  msg.components[x].components[y].disabled = true;
					  msg.components[x].components[y].style = 'SECONDARY';
					}
					msg.components[0].components[data.correct].style = 'SUCCESS';
					
					const btns = [btn_1, btn_2, btn_3, btn_4]
					const index = btns.indexOf(btn.customId)
					msg.components[0].components[index].style = 'DANGER';
					msg.embeds[0].description = desc;

					msg.edit({ content: this.options.loseMessage.replace('{answer}', data.options[data.correct]), embeds: msg.embeds, components:  msg.components})
                    collector.stop()  
				}
			}
		})

		collector.on("end", async(c, r) => {
  			if (r === 'time') {
			    for (let y = 0; y < msg.components[x].components.length; y++) {
					msg.components[x].components[y].disabled = true;
					msg.components[x].components[y].style = 'SECONDARY';
				}
				msg.components[0].components[data.correct].style = 'SUCCESS';
				msg.embeds[0].description = desc;

				return msg.edit({ content: this.options.loseMessage.replace('{answer}', data.options[data.correct]), embeds: msg.embeds, components:  msg.components})
			}
			return
  		})
  
	}
}