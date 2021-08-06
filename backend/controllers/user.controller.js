const { User, CreateTableUsers, LoadingOneAdmin, readUser, checkUser, getUser } = require('../models/users.model');
const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña
const { generarToken, descubrirToken } = require('../services/jwt.service');

async function CreateTableAndUser() {
    CreateTableUsers();
    LoadingOneAdmin();
}

async function loginController(req, res) {
    try {
        console.log('Login');
        //console.log(req.body.json);
        //let usuario = JSON.parse(req.body.json);
        let usuario = { email: req.body.email, password: req.body.password }
        let userFromDB = await checkUser(usuario);
        const token = await generarToken(userFromDB);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: `Sistema seguro, error en autenticación: ${error.message}` });
    }
}

async function registerController(req, res) {
    try {
        //let userBody = JSON.parse(req.body.json);
        //console.log(userBody)
        //let user = { email: userBody.email, first_name: userBody.nombre, last_name: userBody.apellido, password: userBody.password };
        //const createResult = await UserCreate(user);
        let user = new User({ email: req.body.email, first_name: req.body.nombre, last_name: req.body.apellidos, encrypted_password: req.body.password });
        const createResult = await user.createUser();
        //console.log('Dentro de register');
        //console.log(createResult);
        res.status(200).json({ status: 'Usuario creado ' + createResult.dataValues.email });
    } catch (error) {
        res.status(409).json({ message: 'Error al crear un usuario: ' + error.message }); //409 Conflict
    }
}

async function deleteController(req, res) {
    try {
        let user = req.params.id;
        //console.log(user);
        const result = await getUser(user);
        const user_to_delete = new User(result);
        //console.log(result);
        //console.log(user_to_delete);
        const delete_status = await user_to_delete.deleteUser(result.user_id);
        if (delete_status[0]) {
            res.status(200).json({ status: 'Usuario eliminado' });
        }
    } catch (error) {
        res.status(412).json({ message: 'Error al borrar usuario: ' + error.message }); //412 Precondition Failed  
    }
}


module.exports = {
    CreateTableAndUser,
    loginController,
    registerController,
    deleteController,
}