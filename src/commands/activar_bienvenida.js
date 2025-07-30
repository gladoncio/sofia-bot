const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const pool = require('../database/index');
const axios = require('axios');

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('activar_bienvenida')
    .setDescription('Activa la bienvenida del servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option.setName('imagen')
        .setDescription('URL de imagen para la bienvenida')
        .setRequired(true)
    ),

  async execute(interaction) {
    const guildId = BigInt(interaction.guild.id);
    const guildName = interaction.guild.name;
    const imagen = interaction.options.getString('imagen');

    if (!isValidUrl(imagen)) {
      return interaction.reply({
        content: '❌ La URL proporcionada no es válida. Asegúrate de incluir el protocolo (`http` o `https`).',
        ephemeral: true,
      });
    }

    let isGif = false;

    try {
      const response = await axios.head(imagen, { timeout: 5000 });

      const contentType = response.headers['content-type'];
      const contentLength = parseInt(response.headers['content-length'] || '0', 10);

      if (!contentType.startsWith('image/')) {
        return interaction.reply({
          content: '❌ La URL proporcionada no apunta a una imagen válida.',
          ephemeral: true,
        });
      }

      if (contentLength > 10 * 1024 * 1024) {
        return interaction.reply({
          content: '❌ La imagen no debe pesar más de 10 MB.',
          ephemeral: true,
        });
      }

      isGif = contentType === 'image/gif' || imagen.toLowerCase().endsWith('.gif');

      await pool.query(`
        INSERT INTO guild_settings (
          guild_id, guild_name, welcome_enabled, welcome_image_url, gift_enabled
        ) VALUES ($1, $2, true, $3, $4)
        ON CONFLICT (guild_id) DO UPDATE SET
          welcome_enabled = true,
          welcome_image_url = EXCLUDED.welcome_image_url,
          gift_enabled = EXCLUDED.gift_enabled,
          guild_name = EXCLUDED.guild_name,
          updated_at = NOW()
      `, [guildId, guildName, imagen, isGif]);

      return interaction.reply({
        content: '✅ Bienvenida activada correctamente.',
        ephemeral: true,
      });

    } catch (error) {
      console.error('Error al activar la bienvenida:', error);
      return interaction.reply({
        content: '❌ Ocurrió un error al activar la bienvenida. Asegúrate de que la imagen sea accesible.',
        ephemeral: true,
      });
    }
  }
};
