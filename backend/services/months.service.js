const { Months } = require('../models/months.model');

async function CreateTableMonths() {
    await Months.sync();
}

class Month {
    constructor(data) {
        this.month_name = data.month_name;
        this.incomes = data.incomes;
        this.project_id = data.project_id;
    }

    async createMonth(dataInitial = 0) {
        //Definir parametro is_initial como cero si no se especifica lo contrario
        try {
            let monthCreated = await Months.create({
                month_name: this.month_name,
                incomes: this.incomes,
                project_id: this.project_id,
                is_initial: dataInitial
            });
            return monthCreated;
        } catch (error) {
            throw new Error('Error en la función createMonth: ' + error.message);
        }
    }

    async updateMonth(id, data) {
        try {
            let month_status = await Months.update({
                month_name: data.month_name,
                incomes: data.incomes
            }, {
                where: {
                    month_id: id
                }
            });
            return month_status;
        } catch (error) {
            throw new Error('Error en la función updateMonth: ' + error.message);
        }
    }

    async deleteMonth(id) {
        try {
            let month_status = await Months.update({
                active: 0
            }, {
                where: {
                    month_id: id
                }
            });
            return month_status;
        } catch (error) {
            throw new Error('Error en la función deleteMonth: ' + error.message);
        }
    }
}

async function getMonths(project) {
    try {
        let months_project = await Months.findAll({ where: { project_id: project, active: 1 } });
        return months_project;
    } catch (error) {
        throw new Error('Error en la función getMonths: ' + error.message);
    }
}

/**
 * Description. Función para realizar la suma de los ingresos totales de la empresa por mes de todos los meses del proyecto.
 * @param project
 * @returns {Promise<>}
 */
async function summation_Months(project) {
    try {
        let summation = await Months.sum('incomes', { where: { project_id: project, active: 1 } });
        return summation;
    } catch (error) {
        throw new Error('Error en la función summation_Months: ' + error.message);
    }
}

async function getMonthsIds(project) {
    try {
        let months_ids_project = await Months.findAll({ where: { project_id: project, active: 1 }, attributes: ['month_id'] });
        return months_ids_project;
    } catch (error) {
        throw new Error('Error en la función getMonthsIds: ' + error.message);
    }
}

module.exports = {
    Month,
    CreateTableMonths,
    getMonths,
    summation_Months,
    getMonthsIds,
}