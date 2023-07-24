const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bingo')
		.setDescription('Prints current bingo event ID'),
	async execute(interaction) {
		await axios.get('https://api.hypixel.net/resources/skyblock/bingo')
			.then(response => {
				console.log(response.data);
				interaction.reply(`Current bingo event ID: ${response.data.id}`);
			})
			.catch(error => {
				console.error(error);
				interaction.reply('There was an error while executing this command!');
			});
	},
};