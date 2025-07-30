FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./src ./src

# Ejecuta el script para registrar comandos, luego inicia el bot
CMD ["sh", "-c", "node src/deploy-commands.js && node src/index.js"]
