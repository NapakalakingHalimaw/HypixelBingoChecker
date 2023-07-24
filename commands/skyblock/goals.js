const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goals')
		.setDescription('Prints a list of goals for the current bingo event'),
	async execute(interaction) {
		await axios.get('https://api.hypixel.net/resources/skyblock/bingo')
			.then(response => {
				interaction.reply(response.data.goals.map(goal => goal.name).join('\n'));
			})
			.catch(error => {
				console.error(error);
				interaction.reply('There was an error while executing this command!');
			});
	},
};