const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const user = require('../controllers/user.controller');

router.post('/login', /*cors(corsOption),*/ user.loginController);
router.post('/register', /*cors(corsOption),*/ user.registerController);
//router.put('/edit/:id', /*cors(corsOption), UserInSession,*/ user.editController);
router.delete('/delete/:id', /*cors(corsOption),*/ UserInSession, user.deleteController);

//router.post('/list-user', /*cors(corsOption), LevelAdmin, UserInSession,*/ user.listUsers);


module.exports = router;