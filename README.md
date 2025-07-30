# Sofia Bot - Discord Welcome Bot

Bot de Discord para gestionar la bienvenida personalizada en servidores, con integración a base de datos PostgreSQL y soporte para imágenes de bienvenida.

---

## 📌 Requisitos y Dependencias

Este bot depende de varios servicios para funcionar correctamente, entre ellos:

- **Base de datos PostgreSQL** para almacenar la configuración de cada servidor.
- **Microservicios de procesamiento de imágenes** del proyecto [python-image-microservice](https://github.com/gladoncio/python-image-microservice) que se utilizan para el manejo avanzado de imágenes (por ejemplo, para procesar las imágenes de bienvenida).

Asegúrate de tener estos servicios corriendo y accesibles para el correcto funcionamiento del bot.

---

## 🛠️ Tecnologías utilizadas

- Node.js 18+
- Discord.js v14+
- PostgreSQL 15+
- Docker y Docker Compose
- Axios para manejo de peticiones HTTP
- dotenv para manejo de variables de entorno

---

## ⚙️ Instalación y configuración

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu_usuario/sofia-bot.git
   cd sofia-bot
   ```

2. Crea un archivo `.env` basado en el `.env.example` y configura las variables:

   ```bash
   cp .env.example .env
   # Edita .env con tus credenciales
   ```

3. (Opcional) Configura y levanta el microservicio de imágenes (ver [python-image-microservice](https://github.com/gladoncio/python-image-microservice)).

4. Levanta los servicios con Docker Compose:

   ```bash
   docker-compose up --build
   ```

   Esto levantará el bot, la base de datos PostgreSQL y Adminer para administración de la DB.

---

## 🚀 Uso

- El bot dispone de comandos slash para activar y desactivar la bienvenida:

  - `/activar_bienvenida` — Activa la bienvenida con una imagen personalizada.
  - `/desactivar_bienvenida` — Desactiva la bienvenida.

- Al ingresar un nuevo miembro, el bot enviará el mensaje personalizado si la bienvenida está activa.

---

## 📁 Estructura del proyecto

```
├── Dockerfile
├── docker-compose.yml
├── package-lock.json
├── package.json
└── src
    ├── commands
    ├── database
    ├── deploy-commands.js
    ├── events
    └── index.js
```

---

## ⚠️ Notas importantes

- **No olvides configurar el microservicio de imágenes** si quieres soporte completo para imágenes personalizadas.
- Las variables sensibles deben mantenerse en el archivo `.env` y nunca subirse a repositorios públicos.

---

## 📝 Licencia

MIT © Adrián Navarro Messina

---

Si tienes dudas o problemas, abre un issue o contacta conmigo.

