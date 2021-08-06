const { CreateTableAndUser } = require('../controllers/user.controller');

async function models() {
    CreateTableAndUser();
}

module.exports = {
    models,
}