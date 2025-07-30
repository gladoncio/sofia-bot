const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const pool = require('../database/index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('desactivar_bienvenida')
    .setDescription('Desactiva la bienvenida del servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guildId = BigInt(interaction.guild.id);
    const guildName = interaction.guild.name;

    try {
      await pool.query(`
        INSERT INTO guild_settings (
          guild_id, guild_name, welcome_enabled, welcome_image_url, gift_enabled
        ) VALUES ($1, $2, false, '', false)
        ON CONFLICT (guild_id) DO UPDATE SET
          welcome_enabled = false,
          updated_at = NOW()
      `, [guildId, guildName]);

      return interaction.reply({
        content: '❎ Bienvenida desactivada correctamente.',
        ephemeral: true,
      });

    } catch (error) {
      console.error('Error al desactivar la bienvenida:', error);
      return interaction.reply({
        content: '❌ Ocurrió un error al desactivar la bienvenida.',
        ephemeral: true,
      });
    }
  }
};
