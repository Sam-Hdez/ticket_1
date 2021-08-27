const Joi = require('joi');

class ProjectDTO {
    post = Joi.object().keys({
        project_name: Joi.string().max(255).required(),
        project_version: Joi.string().max(5).required(),
    });

    put = Joi.object().keys({
        project_name: Joi.string().max(255).required(),
        project_version: Joi.string().max(5).required(),
    });

    delete = Joi.object().keys({
        project_name: Joi.string().max(255).optional(),
        project_version: Joi.string().max(5).optional(),
    });
}

module.exports = {
    ProjectDTO
}