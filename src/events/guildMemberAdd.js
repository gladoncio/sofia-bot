const pool = require('../database/index');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute(member) {
    const guildId = BigInt(member.guild.id);
    const guild = member.guild;
    const user = member.user;

    // Buscar configuración de bienvenida
    let settings;
    try {
      const result = await pool.query(
        'SELECT welcome_enabled, welcome_image_url, gift_enabled FROM guild_settings WHERE guild_id = $1',
        [guildId]
      );

      if (result.rowCount === 0 || !result.rows[0].welcome_enabled) {
        return; // No hacer nada si no está habilitada
      }

      settings = result.rows[0];
    } catch (err) {
      console.error('❌ Error al consultar configuración de bienvenida:', err);
      return;
    }

    // Preparar datos
    const channel = guild.systemChannel;
    if (!channel) return;

    const serverName = guild.name;
    const serverImage = guild.iconURL({ size: 1024 }) || ''; // Imagen del servidor
    const userImage = user.displayAvatarURL({ size: 1024 }); // Imagen del usuario

    const welcomeImageUrl = settings.welcome_image_url;
    const giftEnabled = settings.gift_enabled;
    const memberCount = guild.memberCount;

    // Puedes usar estos datos más adelante también
    const welcomeText = `🎉 ¡Bienvenido <@${user.id}> a **${serverName}**!\nEres el miembro número **${memberCount}**.`;

    try {
      await channel.send({
        content: welcomeText,
        files: [
          welcomeImageUrl,
          userImage,
          serverImage
        ].filter(Boolean), // solo si existen
      });
    } catch (err) {
      console.error('❌ Error al enviar mensaje de bienvenida:', err);
    }
  },
};
