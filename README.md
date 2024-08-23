
# Proyecto Node.js con PostgreSQL

Este es un proyecto de ejemplo que utiliza Node.js y PostgreSQL, corriendo sobre Docker Compose para facilitar la configuración y ejecución del entorno de desarrollo.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuración del proyecto

1. Clona este repositorio en tu máquina local:

   \`\`\`bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   \`\`\`

2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

   \`\`\`bash
   NODE_ENV=development
   PORT=3000
   DB_HOST=db
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=your_database
   \`\`\`

   **Nota:** Puedes modificar estos valores según tus necesidades.

## Ejecución del proyecto

1. Construye y levanta los contenedores de Docker:

   \`\`\`bash
   docker-compose up --build
   \`\`\`

   Esto levantará los siguientes servicios:
   - **Node.js**: La aplicación Node.js corriendo en el puerto 3000.
   - **PostgreSQL**: La base de datos PostgreSQL.

2. Accede a la aplicación:

   Una vez que los contenedores estén corriendo, puedes acceder a la aplicación en \`http://localhost:3000\`.

## Estructura del proyecto

La estructura básica del proyecto es la siguiente:

\`\`\`
.
├── comands.txt <br/>
├── config.js <br/>
├── docker-compose copy.xml <br/>
├── docker-compose.yml <br/>
├── Dockerfile <br/>
├── index.js <br/>
├── package.json <br/>
├── package-lock.json <br/>
├── persisted_data <br/>
└── README.md <br/>
\`\`\`

- **docker-compose.yml**: Archivo de configuración de Docker Compose para levantar los servicios.
- **.env**: Archivo de configuración de variables de entorno.
- **src**: Directorio principal del código fuente de la aplicación.
  - **index.js**: Punto de entrada de la aplicación.
  - **config**: Configuraciones de la base de datos y otros servicios.
  - **controllers**: Controladores para manejar la lógica de negocio.
  - **models**: Modelos de datos.
  - **routes**: Definición de rutas de la API.

## Comandos útiles

- **Levantar los servicios**:

  \`\`\`bash
  docker-compose up
  \`\`\`

- **Detener los servicios**:

  \`\`\`bash
  docker-compose down
  \`\`\`

- **Reconstruir los contenedores**:

  \`\`\`bash
  docker-compose up --build
  \`\`\`

- **Acceder al contenedor de Node.js**:

  \`\`\`bash
  docker exec -it tu_contenedor_node bash
  \`\`\`

- **Acceder al contenedor de PostgreSQL**:

  \`\`\`bash
  docker exec -it tu_contenedor_postgres psql -U postgres -d your_database
  \`\`\`

## Migraciones de base de datos

Si estás utilizando herramientas de migración de bases de datos (como Sequelize, TypeORM, etc.), asegúrate de ejecutar las migraciones después de levantar los contenedores:

\`\`\`bash
docker exec -it tu_contenedor_node npm run migrate
\`\`\`

## Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de hacer un fork del proyecto y enviar un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.