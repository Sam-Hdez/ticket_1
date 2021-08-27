const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const projetcRoutes = require('./projects.routes');

router.get('/', (req, res) => {
    return res.status(200).json({ message: `El servidor esta funcionando correctamente` });
});

router.use('/user', userRoutes);
router.use('/project', projetcRoutes);

module.exports = router;