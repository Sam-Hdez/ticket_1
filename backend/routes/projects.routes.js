const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const { ProjectController } = require('../controllers/project.controller');
const { newProject, validateProject, projectExists, putProject, delProject } = require('../middlewares/project.middleware');

const project = new ProjectController();

router.get('/', /*cors(corsOption),*/ UserInSession, project.list_all);
router.post('/', /*cors(corsOption),*/ UserInSession, newProject, validateProject, project.create_project);
router.put('/:id', /*cors(corsOption),*/ UserInSession, projectExists, putProject, validateProject, project.editProject);
router.delete('/:id', /*cors(corsOption),*/ UserInSession, projectExists, delProject, project.dropProject);

module.exports = router;