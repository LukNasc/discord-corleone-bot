const axios = require("axios");
const { corleoneApi, fortalcityBot } = require("../../config")

function handleCallService(body, callback) {
    axios.post(`${corleoneApi}/log/store/${body.passaport}`, body).then(() => { callback(`passaport ${body.passaport} added a new item in chest`) }).catch(error => callback(error.response.data.message || error.message))
}

function handleMessage({ embeds, author }, callback) {
    try {
        if (author.id !== fortalcityBot) return;
        const message = embeds[0].data.description.replaceAll("*", "")
        const arrayMessage = message.split("\n");

        const [itemAmmount, itemName] = arrayMessage[1].split(":")[1].split(/x(.*)/s);

        const body = {
            passaport: Number(arrayMessage[0].replace(/\D/g, "")),
            item: itemName.trim(),
            ammount: Number(itemAmmount.replace(".", "").trim()),
            action: arrayMessage[1].split(":")[0].trim(),
            date: new Date()
        }
        handleCallService(body, callback);
    } catch (e) {
        console.log(e.message);
    }

}

module.exports = { handleMessage }