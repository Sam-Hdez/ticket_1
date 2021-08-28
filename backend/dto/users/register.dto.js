const Joi = require('joi');

module.exports.altaUserDTO = Joi.object().keys({
    email: Joi.string().email().required(),
    first_name: Joi.string().max(150).required(),
    last_name: Joi.string().max(150).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).min(8).required()
});