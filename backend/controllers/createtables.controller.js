const { CreateTableUsers, LoadingOneAdmin } = require('../models/users.model');
const { CreateTableProjects } = require('../models/projects.model');
const { CreateTableMonths } = require('../models/months.model');
const { CreateTableIncomes } = require('../models/incomes.model');
const { CreateTableDirectcosts_Expenses } = require('../models/directcosts_expenses.model');
const { CreateTableSinews } = require('../models/sinews.model');

async function CreateTables() {
    CreateTableUsers();
    LoadingOneAdmin();
    CreateTableProjects();
    CreateTableMonths();
    CreateTableIncomes();
    CreateTableDirectcosts_Expenses();
    CreateTableSinews();
}

module.exports = {
    CreateTables
}