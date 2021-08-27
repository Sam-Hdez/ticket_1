const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');

router.get('/', (req, res) => {
    return res.status(200).json({ message: `El servidor esta funcionando correctamente` });
});

router.use('/user', userRoutes);

module.exports = router;