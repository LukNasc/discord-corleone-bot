require("dotenv").config();

module.exports = {
    "clientId": process.env.CLIENTID,
    "guildId": process.env.GUILDID,
    "token": process.env.TOKEN,
    "corleoneApi": process.env.CORLEONE_API,
    "channel_log": process.env.CHANNEL_LOGS,
    fortalcityBot: process.env.FORTALCITY_BOT
}