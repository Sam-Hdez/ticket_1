const { obtenerIdUsser } = require('../services/jwt.service');
const { Project, ListAllProjects, getProject } = require('../services/projects.service');

class ProjectController {
    async create_project(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            let user = await obtenerIdUsser(token);
            //console.log(user);
            let project = new Project({ project_name: req.body.project_name, project_version: req.body.project_version, user_id: user });
            const create_status = await project.createProject();
            //console.log(create_status)
            res.status(200).json({ status: 'Projecto creado: ' + create_status.project_name });
        } catch (error) {
            res.status(400).json({ message: `Error al crear el proyecto: ${error.message}` });
        }
    }

    async list_all(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            let user = await obtenerIdUsser(token);

            let list = await ListAllProjects(user);
            res.status(200).json({ status: 'Lista de Proyectos', data: list });
        } catch (error) {
            res.status(400).json({ message: `Error al listar proyectos: ${error.message}` });
        }
    }

    async editProject(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            let user = await obtenerIdUsser(token);

            let project = new Project({ project_name: req.body.project_name, project_version: req.body.project_version, user_id: user });
            const update_status = await project.updateProject(req.params.id);
            //console.log(update_status)
            res.status(200).json({ status: 'Projecto editado' });
        } catch (error) {
            res.status(400).json({ message: `Error al editar proyecto: ${error.message}` });
        }
    }

    async dropProject(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            let user = await obtenerIdUsser(token);

            let project = new Project({ project_name: req.body.project_name, project_version: req.body.project_version, user_id: user });
            const update_status = await project.deleteProject(req.params.id);
            //console.log(update_status)
            res.status(200).json({ status: 'Projecto eliminado' });
        } catch (error) {
            res.status(400).json({ message: `Error al editar proyecto: ${error.message}` });
        }
    }
}

module.exports = {
    ProjectController
}