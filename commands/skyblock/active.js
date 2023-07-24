const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('active')
		.setDescription('Checks whether there is an bingo event active.'),
	async execute(interaction) {
		await interaction.reply('/active TODO');
	},
};