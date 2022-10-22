const axios = require("axios")
const { corleoneApi } = require("../../config")

function callService(body, userOptions, callback) {
    axios.post(`${corleoneApi}/members/store`, body)
        .then(() => callback(`Member ${body.name} | ${body.passaport} added by @${userOptions.name}#${userOptions.id}`))
        .catch((error) => {
            console.log(error);
            callback(error.response.data.message || error.message)
        })
}

module.exports = {
    async store(interaction) {
        try {
            callService({ name: interaction.options.getString("name"), passaport: interaction.options.getInteger("passaport") },
                { name: interaction.user.username, id: interaction.user.discriminator },
                async (message) => await interaction.reply(message))
        } catch (e) {
            console.error(e);
        }
    }
}