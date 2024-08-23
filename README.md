# Proyecto: Node.js con PostgreSQL y Docker

├── comands.txt
├── config.js
├── docker-compose copy.xml
├── docker-compose.yml
├── Dockerfile
├── index.js
├── package.json
├── package-lock.json
├── persisted_data
└── README.md

1. Dockerfile
Este archivo define la imagen Docker para la aplicación Node.js.

-Utiliza una imagen base de Node.js (puedes ajustar la versión)
FROM node:18-alpine

-Instala Bash en Alpine Linux
RUN apk add --no-cache bash

-Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

-Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

-Instala las dependencias
RUN npm install

-Copia el resto de los archivos de la aplicación   

COPY . .

-Exponer el puerto en el que escuchará tu aplicación (ajusta si es necesario)
EXPOSE 3000

-Variables de entorno (ejemplo)
ENV NODE_ENV=production
#ENV DATABASE_URL=postgresql://nico:eHfkQJwpiG7m0EJZZPgzGoEwHFWSXLey@dpg-cr2a6n2j1k6c73ekdou0-a/ecomercedb_24s2

-Comando para ejecutar la aplicación
CMD [ "node","index.js"]


1. docker-compose.yml

Este archivo define los servicios Docker, incluyendo la aplicación <br/>Node.js y la base de datos PostgreSQL.

version: '3.8'<br/>

services:<br/>
  app:<br/>
    build: .<br/>
    ports:<br/>
      - "3000:3000"<br/>
    volumes:<br/>
      - .:/app<br/>
      - /app/node_modules<br/>
    depends_on:<br/>
      - db<br/>

  db:<br/>
    image: postgres:15<br/>
    environment:<br/>
      POSTGRES_USER: user<br/>
      POSTGRES_PASSWORD: password<br/>
      POSTGRES_DB: mydatabase<br/>
    volumes:<br/>
      - persisted_data:/var/lib/postgresql/data<br/>

volumes:<br/>
  persisted_data:


3. Comands

-Construir y correr los contenedores Docker <br/>
docker-compose up --build<br/>

-Detener y eliminar los contenedores<br/>
docker-compose down<br/>

-Ejecutar un comando en el contenedor de la aplicación<br/>
docker-compose exec app sh<br/>

-Acceder a la base de datos PostgreSQL<br/>
docker-compose exec db psql -U user -d mydatabase<br/>