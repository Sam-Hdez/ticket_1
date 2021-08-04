const express = require('express');
const app = express();
const { sequelize } = require('./db/conexion');

require('dotenv').config();
const cors = require('cors');

//MIDDLEWARE GLOBALES
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

async function server() {
    try {
        await sequelize.authenticate();
        console.log(`Se ha realizado la conexión exitosa a ${process.env.DB_NAME}`);

        app.listen(process.env.PORT, function() {
            console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar correctamebte con la Base de datos:', error);
    }
}


server();