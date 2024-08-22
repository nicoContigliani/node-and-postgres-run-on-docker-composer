# Utiliza una imagen base de Node.js (puedes ajustar la versión)
FROM node:18-alpine

# Instala Bash en Alpine Linux
RUN apk add --no-cache bash

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación   

COPY . .

# Exponer el puerto en el que escuchará tu aplicación (ajusta si es necesario)
EXPOSE 3000

# Variables de entorno (ejemplo)
ENV NODE_ENV=production
#ENV DATABASE_URL=postgresql://nico:eHfkQJwpiG7m0EJZZPgzGoEwHFWSXLey@dpg-cr2a6n2j1k6c73ekdou0-a/ecomercedb_24s2

# Comando para ejecutar la aplicación
# CMD [ "node", "index.js" ]
CMD [ "node","index.js"]