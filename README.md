<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto: Node.js con PostgreSQL y Docker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        ul.file-structure {
            list-style-type: none;
            padding-left: 20px;
        }
        ul.file-structure li {
            margin: 5px 0;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            font-family: "Courier New", Courier, monospace;
            color: #c7254e;
            background-color: #f9f2f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
        .section {
            margin-bottom: 30px;
        }
    </style>
</head>
<body>

    <h1>Proyecto: Node.js con PostgreSQL y Docker</h1>

    <h2>Estructura del Proyecto</h2>
    <ul class="file-structure">
        <li>├── comands.txt</li>
        <li>├── config.js</li>
        <li>├── docker-compose copy.xml</li>
        <li>├── docker-compose.yml</li>
        <li>├── Dockerfile</li>
        <li>├── index.js</li>
        <li>├── package.json</li>
        <li>├── package-lock.json</li>
        <li>├── persisted_data/</li>
        <li>└── README.md</li>
    </ul>

    <div class="section">
        <h2>1. Dockerfile</h2>
        <p>Este archivo define la imagen Docker para la aplicación Node.js.</p>
        <ul>
            <li><strong>Imagen base:</strong> Utiliza una imagen base de Node.js (puedes ajustar la versión).</li>
        </ul>
        <pre><code>FROM node:18-alpine</code></pre>
        
        <ul>
            <li><strong>Instalación de Bash:</strong> Instala Bash en Alpine Linux.</li>
        </ul>
        <pre><code>RUN apk add --no-cache bash</code></pre>
        
        <ul>
            <li><strong>Directorio de trabajo:</strong> Establece el directorio de trabajo dentro del contenedor.</li>
        </ul>
        <pre><code>WORKDIR /usr/src/app</code></pre>
        
        <ul>
            <li><strong>Copia de dependencias:</strong> Copia <code>package.json</code> y <code>package-lock.json</code> para instalar las dependencias.</li>
        </ul>
        <pre><code>COPY package*.json ./</code></pre>
        
        <ul>
            <li><strong>Instalación de dependencias:</strong> Instala las dependencias.</li>
        </ul>
        <pre><code>RUN npm install</code></pre>
        
        <ul>
            <li><strong>Copia de archivos:</strong> Copia el resto de los archivos de la aplicación.</li>
        </ul>
        <pre><code>COPY . .</code></pre>
        
        <ul>
            <li><strong>Exposición de puertos:</strong> Exponer el puerto en el que escuchará tu aplicación (ajusta si es necesario).</li>
        </ul>
        <pre><code>EXPOSE 3000</code></pre>
        
        <ul>
            <li><strong>Variables de entorno:</strong> Ejemplo de configuración de variables de entorno.</li>
        </ul>
        <pre><code>ENV NODE_ENV=production
# ENV DATABASE_URL=postgresql://usuario:contraseña@host:puerto/database</code></pre>
        
        <ul>
            <li><strong>Comando para ejecutar la aplicación:</strong> Comando para iniciar la aplicación.</li>
        </ul>
        <pre><code>CMD ["node", "index.js"]</code></pre>
    </div>

    <div class="section">
        <h2>2. docker-compose.yml</h2>
        <p>Este archivo define los servicios Docker, incluyendo la aplicación Node.js y la base de datos PostgreSQL.</p>
        <pre><code>version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    volumes:
      - persisted_data:/var/lib/postgresql/data

volumes:
  persisted_data:</code></pre>
    </div>

    <div class="section">
        <h2>3. Comandos</h2>
        <ul>
            <li><strong>Construir y correr los contenedores Docker:</strong></li>
        </ul>
        <pre><code>docker-compose up --build</code></pre>
        
        <ul>
            <li><strong>Detener y eliminar los contenedores:</strong></li>
        </ul>
        <pre><code>docker-compose down</code></pre>
        
        <ul>
            <li><strong>Ejecutar un comando en el contenedor de la aplicación:</strong></li>
        </ul>
        <pre><code>docker-compose exec app sh</code></pre>
        
        <ul>
            <li><strong>Acceder a la base de datos PostgreSQL:</strong></li>
        </ul>
        <pre><code>docker-compose exec db psql -U user -d mydatabase</code></pre>
    </div>