const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Muestra la foto de perfil de un usuario')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('Usuario del que quieres ver la foto')
        .setRequired(false)
    ),

  async execute(interaction) {
    // Obtiene el usuario mencionado o el que ejecuta el comando si no hay
    const user = interaction.options.getUser('usuario') || interaction.user;

    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

    await interaction.reply({ content: avatarURL });
  },
};
