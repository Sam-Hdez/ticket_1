const { sequelize, DataTypes } = require('../db/conexion');

const Incomes = sequelize.define('Incomes', {
    income_id: {
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
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateTableIncomes() {
    await Incomes.sync();
}

module.exports = {
    CreateTableIncomes,
}