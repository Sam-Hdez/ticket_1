const { CreateTableUsers, LoadingOneAdmin } = require('../services/users.service');
const { CreateTableProjects } = require('../services/projects.service');
const { CreateTableMonths } = require('../services/months.service');
const { CreateTableIncomes } = require('../services/incomes.service');
const { CreateTableDirectcosts_Expenses } = require('../services/directcosts_expenses.service');
const { CreateTableSinews } = require('../services/sinews.service');

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