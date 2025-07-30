const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const db = require('../database/index');

const OWNER_ID = '450198598538231809'; // Cambia por tu user ID de Discord

module.exports = {
  data: new SlashCommandBuilder()
    .setName('initdb')
    .setDescription('Inicializa la base de datos con las tablas necesarias (solo owner)')
    .setDefaultMemberPermissions(0) // nadie más puede usarlo por defecto
    .setDMPermission(false), // no funciona en DM

  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    const sqlPath = path.join(__dirname, '../database/migrations/init_guild_settings.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    try {
      await db.query(sql);
      await interaction.reply({ content: '✅ Base de datos inicializada correctamente.', ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: `❌ Error al inicializar la base de datos:\n\`${error.message}\``, ephemeral: true });
    }
  },
};
