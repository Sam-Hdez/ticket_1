const { sequelize, DataTypes, Op } = require('../db/conexion');

const Users = sequelize.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    first_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false
    },
    encrypted_password: {
        //STRING de 255 por default
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = {
    Users
}