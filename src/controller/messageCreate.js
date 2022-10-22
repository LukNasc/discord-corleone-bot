const axios = require("axios");
const { corleoneApi } = require("../../config")

function handleCallService(body, callback) {
    axios.post(`${corleoneApi}/log/store/${body.passaport}`, body).then(() => { callback(`passaport ${body.passaport} added a new item in chest`) }).catch(error => callback(error.response.data.message || error.message))
}

function handleMessage({ content: message, author }, callback) {
    try {
        if (author.bot) return;
        const arrayMessage = message.split("\n");
        const body = {
            passaport: Number(arrayMessage[0].replace(/\D/g, "")),
            item: arrayMessage[1].split(":")[1].replace(/\d/g, "").replace("x", "").trim(),
            ammount: arrayMessage[1].split(":")[1].replace(/\D/g, ""),
            action: arrayMessage[1].split(":")[0].trim(),
            date: new Date()
        }
        handleCallService(body, callback);
    } catch (e) {
        console.log(e.message);
    }

}

module.exports = { handleMessage }