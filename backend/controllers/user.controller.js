const { User, readUser } = require('../models/users.model');
const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña

async function loginController(req, res) {
    try {
        console.log('Login');
        let user = readUser();
        res.status(200).json('ok');
    } catch (error) {
        res.status(400).json(`Sistema seguro, error en autenticación: ${error.message}`);
    }
}

module.exports = {
    loginController,
}