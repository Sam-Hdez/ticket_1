const { descubrirToken } = require('../services/jwt.service');

const UserInSession = async(req, res, next) => {
    try {
        if (req.headers.authorization != undefined) {
            const token = req.headers.authorization.split(' ')[1];
            let verificado = await descubrirToken(token);
            //console.log(verificado.data);
            //console.log(req.params);
            return next()
        } else {
            throw new Error('Este es un sistema seguro y requiere autorización')
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    UserInSession
}