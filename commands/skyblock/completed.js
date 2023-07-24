const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('completedgoals')
		.setDescription('Prints a list of completed goals for a given player'),
	async execute(interaction) {
		await interaction.reply('/completedgoals TODO');
	},
};