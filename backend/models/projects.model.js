const { sequelize, DataTypes, Op } = require('../db/conexion');

const Projects = sequelize.define('Projects', {
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project_version: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: 'Users',
            // Nombre de la columna de referencia
            key: 'user_id',
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = {
    Projects
}