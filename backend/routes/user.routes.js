const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { loginController } = require('../controllers/user.controller');

router.post('/login', /*cors(corsOption),*/ loginController);

module.exports = router;