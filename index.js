const { Client, GatewayIntentBits } = require('discord.js');
const { channel_log, token, clientId, corleoneApi, guildId } = require('./config.js');
const deployCommands = require('./deploy-commands.js');

const messageCreate = require('./src/controller/messageCreate');
const registerMember = require('./src/controller/registerMember');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent] });

const CHANNEL_LOGS = channel_log;

client.once('ready', () => {
    console.log('============ Bot Iniciado ===============');
    deployCommands();

});

client.on("messageCreate", (message) => {
    if (message.channelId === CHANNEL_LOGS) {
        messageCreate.handleMessage(message, console.log)
    }

});

client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.guildId !== guildId) return;

    const { commandName } = interaction;


    if (commandName === 'register_member') {
        registerMember.store(interaction)
    }
});



client.login(token);