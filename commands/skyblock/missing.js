const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { hypixelApiKey } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('missinggoals')
		.setDescription('Prints a list of missing goals for a given player')
		.addStringOption(option => option.setName('player').setDescription('Player to check').setRequired(true)),
	async execute(interaction) {
		// First we need to get the player's UUID
		const uuid =
			await axios.get(`https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString('player')}`)
				.then(response => {
					console.log(response.data);
					return response.data.id;
				})
				.catch(error => {
					console.error(error);
					interaction.reply('There was an error while executing this command!');
					return null;
				});

		if (uuid === null) return;

		// Then we can get the player's information from the Hypixel API
		const userGoals = await axios.get('https://api.hypixel.net/skyblock/bingo', {
			headers: {
				'API-Key': hypixelApiKey,
			},
			params: {
				'uuid': uuid,
			},
		})
			.then(response => {
				return response.data.goals.map(goal => goal.name);
			})
			.catch(error => {
				if (error.response) {
					interaction.reply(error.response.data.cause);
				} else if (error.request) {
					console.error(error.request);
					interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					console.error(error);
					interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
				return null;
			});

		// Before we can get the missing goals, we need a list of all the goals
		const goals = await axios.get('https://api.hypixel.net/resources/skyblock/bingo')
			.then(response => {
				console.log(response.data);
				return response.data.goals.map(goal => goal.name);
			})
			.catch(error => {
				console.error(error);
				interaction.reply('There was an error while executing this command!');
				return null;
			});

		if (userGoals === null || goals === null) return;

		// Finally, we can get the missing goals for the player
		const missingGoals = goals.filter(goal => !userGoals.includes(goal));

		interaction.reply(missingGoals.join('\n'));
	},
};