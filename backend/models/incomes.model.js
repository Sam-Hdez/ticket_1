const { sequelize, DataTypes, Op } = require('../db/conexion');
const { getMonthsIds } = require('./months.model');
const Incomes = sequelize.define('Incomes', {
    income_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    month_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: 'Months',
            // Nombre de la columna de referencia
            key: 'month_id',
        }
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateTableIncomes() {
    await Incomes.sync();
}

class Income {
    constructor(data) {
        this.month_id = data.month_id;
        this.concept = data.concept;
        this.amount = data.amount;
    }

    async createIncome() {
        try {
            let incomeCreated = await Incomes.create({
                month_id: this.month_id,
                concept: this.concept,
                amount: this.amount
            });
            return incomeCreated;
        } catch (error) {
            throw new Error('Error en la función createIncome: ' + error.message);
        }
    }

    async updateIncome(id, data) {
        try {
            let income_status = await Incomes.update({
                month_id: data.month_id,
                concept: data.concept,
                amount: data.amount,
            }, {
                where: {
                    income_id: id
                }
            });
            return income_status;
        } catch (error) {
            throw new Error('Error en la función updateMonth: ' + error.message);
        }
    }

    async deleteIncome(id) {
        try {
            let income_status = await Incomes.update({
                active: 0
            }, {
                where: {
                    income_id: id
                }
            });
            return income_status;
        } catch (error) {
            throw new Error('Error en la función deleteIncome: ' + error.message);
        }
    }
}

async function getIncomes(month) {
    try {
        let incomes_month = await Incomes.findAll({ where: { month_id: month, active: 1 } });
        return incomes_month;
    } catch (error) {
        throw new Error('Error en la función getIncomes: ' + error.message);
    }
}

/**
 * Description. Función para realizar la suma de todos los ingresos de un mes del proyecto.
 * @param month
 * @returns {Promise<>}
 */
async function summation_IncomesMonth(month) {
    try {
        let summation = await Incomes.sum('amount', { where: { month_id: month, active: 1 } });
        return summation;
    } catch (error) {
        throw new Error('Error en la función summation_Incomes: ' + error.message);
    }
}

async function getIncomesProject(project) {
    try {
        let months_ids = await getMonthsIds(project);
        let incomes_project = await Incomes.findAll({
            where: {
                month_id: {
                    [opIn]: months_ids
                },
                active: 1
            }
        });
        return incomes_project;
    } catch (error) {
        throw new Error('Error en la función getIncomesProject: ' + error.message);
    }
}

/**
 * Description. Función para realizar la suma de todos los ingresos de todos los meses del proyecto.
 * @param project
 * @returns {Promise<>}
 */
async function summation_IncomesMonthsProject(project) {
    try {
        let months_ids = await getMonthsIds(project);
        let summation = await Incomes.sum('amount', {
            where: {
                month_id: {
                    [opIn]: months_ids
                },
                active: 1
            }
        });
        return summation;
    } catch (error) {
        throw new Error('Error en la función summation_IncomesMonthsProject: ' + error.message);
    }
}

module.exports = {
    Income,
    CreateTableIncomes,
    getIncomes,
    summation_IncomesMonth,
    getIncomesProject,
    summation_IncomesMonthsProject,
}