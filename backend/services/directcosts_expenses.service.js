const { Directcosts_Expenses } = require('../models/directcosts_expenses.model');

async function CreateTableDirectcosts_Expenses() {
    await Directcosts_Expenses.sync();
}

class Directcost_Expense {
    constructor(data) {
        this.month_id = data.month_id;
        this.type_creation = data.type_creation;
        this.concept = data.concept;
        this.amount = data.amount;
        this.percent = data.percent;
        this.type_element = data.type_element;
    }

    async createDirectcost_Expense() {
        try {
            let Directcost_ExpenseCreated = await Directcosts_Expenses.create({
                month_id: this.month_id,
                type_creation: this.type_creation,
                concept: this.concept,
                amount: this.amount,
                percent: this.percent,
                type_element: this.type_element,
            });
            return Directcost_ExpenseCreated;
        } catch (error) {
            throw new Error('Error en la función createDirectcost_Expense: ' + error.message);
        }
    }

    async updateDirectcost_Expense(id, data) {
        try {
            let Directcost_Expense_status = await Directcosts_Expenses.update({
                month_id: data.month_id,
                type_creation: data.type_creation,
                concept: data.concept,
                amount: data.amount,
                percent: data.percent,
                type_element: data.type_element,
            }, {
                where: {
                    direct_id: id
                }
            });
            return Directcost_Expense_status;
        } catch (error) {
            throw new Error('Error en la función updateDirectcost_Expense: ' + error.message);
        }
    }

    async deleteDirectcost_Expense(id, data) {
        try {
            let Directcost_Expense_status = await Directcosts_Expenses.update({
                active: 0
            }, {
                where: {
                    direct_id: id
                }
            });
            return Directcost_Expense_status;
        } catch (error) {
            throw new Error('Error en la función updateDirectcost_Expense: ' + error.message);
        }
    }
}

async function getDirectCosts(month) {
    try {
        let direct_costs = await Directcosts_Expenses.findAll({ where: { month_id: month, type_element: 1, active: 1 } });
        return direct_costs;
    } catch (error) {
        throw new Error('Error en la función getDirectCosts: ' + error.message);
    }
}

async function getExpenses(month) {
    try {
        let expenses = await Directcosts_Expenses.findAll({ where: { month_id: month, type_element: 2, active: 1 } });
        return expenses;
    } catch (error) {
        throw new Error('Error en la función getExpenses: ' + error.message);
    }
}

module.exports = {
    Directcost_Expense,
    CreateTableDirectcosts_Expenses,
    getDirectCosts,
    getExpenses,
}