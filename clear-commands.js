const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, discordToken } = require('./config.json');

const rest = new REST({ version: '9' }).setToken(discordToken);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully cleared application (/) commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully cleared global application (/) commands.'))
	.catch(console.error);