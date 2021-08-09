const { sequelize, DataTypes } = require('../db/conexion');

const Months = sequelize.define('Months', {
    month_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    month_name: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    incomes: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    is_initial: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: 'Projects',
            // Nombre de la columna de referencia
            key: 'project_id',
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

async function CreateTableMonths() {
    await Months.sync();
}

module.exports = {
    CreateTableMonths,
}