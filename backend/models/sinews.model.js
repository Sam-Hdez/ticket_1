const { sequelize, DataTypes, Op } = require('../db/conexion');

const Sinews = sequelize.define('Sinews', {
    sinews_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    month_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: 'Months',
            // Nombre de la columna de referencia
            key: 'month_id',
        }
    },
    rol_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    percent: {
        type: DataTypes.INTEGER,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateTableSinews() {
    await Sinews.sync();
}

module.exports = {
    CreateTableSinews,
}