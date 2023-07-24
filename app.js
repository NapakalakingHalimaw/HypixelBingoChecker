const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { discordToken } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a new collection for commands
client.commands = new Collection();

// Get all the command files
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Loop through all the command files
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(path.join(commandsPath, file));

		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.warn(`Command ${file} is missing a required "data" or "execute" property.`);
		}
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(discordToken);

// When a slash command is executed, run this code
client.on(Events.InteractionCreate, async interaction => {
	// If the command is not a slash command, return
	if (!interaction.isCommand()) return;
	console.log(`Received slash command: ${interaction}`);

	// If the command is not in our collection, return
	if (!interaction.client.commands.has(interaction.commandName)) return;

	try {
		// Execute the command
		const command = interaction.client.commands.get(interaction.commandName);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});