const { sequelize, DataTypes } = require('../db/conexion');
const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña
const saltRounds = 10; //rondas salt entre más hay más seguridad pero tarda más la respuesta

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
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateTableUsers() {
    await Users.sync();
}

class User {
    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.encrypted_password = data.encrypted_password;
    }

    async createUser() {
        const userCreated = Users.create({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            encrypted_password: await bcrypt.hashSync(this.encrypted_password + this.email, saltRounds)
        });
        return userCreated;
    }

    async updateUser() {
        //Editar Usuario
    }

    async deleteUser() {
        //Borrar Usuario
    }
}

async function readUser() {
    //Consultar datos de Usuario por Email
    console.log('Buscando usuario');
    return 'ok';
}

module.exports = {
    User,
    readUser,
}