// commands/ping.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping_pong')
    .setDescription('Responde con Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
