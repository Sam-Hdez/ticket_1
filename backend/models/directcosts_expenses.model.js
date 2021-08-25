const { sequelize, DataTypes, Op } = require('../db/conexion');

const Directcosts_Expenses = sequelize.define('Directcosts_Expenses', {
    direct_id: {
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
    //1 Creación con concepto-se edita | 2 Creación suma a base de otras columnas-No se edita ¿que columnas? | 3 Creación a partir de porcentaje de otra columna - ¿qué col y valor de %?
    type_creation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //Para 1 se guarda un input | 2 se guarda el nombre de las col | 3 Nombre de col
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Para 1 se guarda val input | 2 se guarda total de la suma | Se guarda el valor despues de obtener el %
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    //Se guarda el valor del porcentaje de la opcion 3
    percent: {
        type: DataTypes.INTEGER,
    },
    //1 Direct Cost | 2 Expense 
    type_element: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    Directcosts_Expenses
}