const Joi = require('joi');
const { ProjectDTO } = require('../dto/project.dto');
const { searchProject, getProject } = require('../services/projects.service');

const project_dto = new ProjectDTO();

const validateProject = async(req, res, next) => {
    try {
        await searchProject(req.body.project_name);
        return next();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const newProject = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, project_dto.post);
        return next();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const putProject = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, project_dto.put);
        return next();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const delProject = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, project_dto.delete);
        return next();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const projectExists = async(req, res, next) => {
    try {
        await getProject(req.params.id);
        next();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    newProject,
    validateProject,
    projectExists,
    putProject,
    delProject
}