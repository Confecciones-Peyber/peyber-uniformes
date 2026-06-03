const fs = require('fs');
const dotenv = require('dotenv');

// Configurar dotenv para leer el archivo .env
dotenv.config();

// Determinar el entorno (desarrollo por defecto)
const targetPath = './src/environments/environment.ts';

// Leer las variables de entorno
const envConfigFile = `export const environment = {
  production: ${process.env['NODE_ENV'] === 'production' ? 'true' : 'false'},
  apiUrl: '${process.env['API_URL'] || 'http://localhost:3000'}'
};
`;

// Asegurarse de que el directorio exista
const dir = './src/environments';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Escribir el archivo
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(`Entorno de Angular generado dinamicamente en ${targetPath}`);
  }
});
