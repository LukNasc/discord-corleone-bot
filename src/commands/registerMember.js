const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register_member')
		.setDescription('Registra um novo membro')
		.addStringOption(option => option.setName("name").setDescription("Nome do membro").setAutocomplete(true).setRequired(true))
		.addIntegerOption(option => option.setName("passaport").setDescription("Passaport do membro in game").setAutocomplete(true).setRequired(true)),

};