const { Client, GatewayIntentBits } = require('discord.js');
const { channel_log } = require('./config.js');

const messageCreate = require('./src/controller/messageCreate');
const registerMember = require('./src/controller/registerMember');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const CHANNEL_LOGS = channel_log;

client.once('ready', () => {
    console.log('============ Bot Iniciado ===============');

});

client.on("messageCreate", (message) => {
    if (message.channelId === CHANNEL_LOGS) {
        messageCreate.handleMessage(message, (apiMsg) => {
            client.channels.cache.get(CHANNEL_LOGS).send(apiMsg)
        })
    }

});

client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;


    if (commandName === 'register_member') {
        registerMember.store(interaction)
    }
});



client.login(token);