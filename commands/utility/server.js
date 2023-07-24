const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		await interaction.reply({ content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`, ephemeral: true });
	},
};