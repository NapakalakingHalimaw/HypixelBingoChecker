const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Prints how much points a player has'),
	async execute(interaction) {
		await interaction.reply('/points TODO');
	},
};