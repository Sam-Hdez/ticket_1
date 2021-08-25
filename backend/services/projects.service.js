const { Projects } = require('../models/projects.model');

async function CreateTableProjects() {
    await Projects.sync();
}

class Project {
    constructor(data) {
        this.project_name = data.project_name;
        this.project_version = data.project_version;
        this.user_id = data.user_id;
    }

    async createProject() {
        try {
            let projectCreated = await Projects.create({
                project_name: this.project_name,
                project_version: this.project_version,
                user_id: this.user_id
            });
            return projectCreated;
        } catch (error) {
            throw new Error('Error en la función createProject: ' + error.message);
        }
    }

    async updateProject(id, data) {
        try {
            let project_status = await Projects.update({
                project_name: data.project_name,
                project_version: data.project_version,
                user_id: data.user_id
            }, {
                where: {
                    project_id: id
                }
            });
            return project_status;
        } catch (error) {
            throw new Error('Error en la función updateProject: ' + error.message);
        }
    }

    async deleteProject(id) {
        try {
            let project_status = await Projects.update({
                active: 0
            }, {
                where: {
                    project_id: id
                }
            });
            return project_status;
        } catch (error) {
            throw new Error('Error en la función deleteProject: ' + error.message);
        }
    }
}

async function ListAllProjects(user) {
    try {
        let listProject = await Projects.findAll({ where: { user_id: user, active: 1 } });
        return listProject;
    } catch (error) {
        throw new Error('Error en la función ListAllProjects: ' + error.message);
    }
}

async function getProject(id) {
    try {
        let projectResultado = await Users.findOne({ where: { user_id: id } });
        if (projectResultado) {
            let project = {
                project_id: projectResultado.project_id,
                project_name: projectResultado.project_name,
                project_version: projectResultado.project_version,
                user_id: projectResultado.user_id,
                active: projectResultado.active,
            };
            return project;
        } else {
            throw new Error('El proyecto no existe');
        }
    } catch (error) {
        throw new Error('Error en la función getProject: ' + error.message);
    }
}

module.exports = {
    Project,
    CreateTableProjects,
    ListAllProjects,
    getProject,
}