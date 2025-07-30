const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Carga los comandos desde la carpeta
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[ADVERTENCIA] El comando ${file} está incompleto y fue ignorado.`);
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Usa process.env.GUILD_ID si quieres registrar localmente en un servidor (más rápido en pruebas)
(async () => {
  try {
    console.log(`⏳ Refrescando ${commands.length} comandos...`);

    // // Reemplaza todos los comandos existentes con los actuales (esto elimina los anteriores automáticamente)
    // await rest.put(
    //   Routes.applicationCommands(process.env.CLIENT_ID),
    //   { body: commands }
    // );
    await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
    );


    console.log('✅ Comandos actualizados correctamente.');
  } catch (error) {
    console.error('❌ Error al actualizar los comandos:', error);
  }
})();
