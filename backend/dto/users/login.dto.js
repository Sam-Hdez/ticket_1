const Joi = require('joi');

module.exports.loginDTO = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).min(8).required().error(new Error('Usuario o contraseña incorrectos'))
}).with('email', 'password');