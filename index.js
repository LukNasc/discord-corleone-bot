const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.js');

const messageCreate = require('./src/controller/messageCreate');
const registerMember = require('./src/controller/registerMember');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const CHANNEL_CHEST = "1031702372516372552";

client.once('ready', () => {
    console.log('============ Bot Iniciado ===============');

});

client.on("messageCreate", (message) => {
    if (message.channelId === CHANNEL_CHEST) {
        messageCreate.handleMessage(message, (apiMsg) => {
            client.channels.cache.get(CHANNEL_CHEST).send(apiMsg)
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