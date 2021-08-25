const { Sinews } = require('../models/sinews.model');

async function CreateTableSinews() {
    await Sinews.sync();
}

class Sinew {
    constructor(data) {
        this.month_id = data.month_id;
        this.rol_name = data.rol_name;
        this.cost = data.cost;
    }

    async createSinew() {
        try {
            let sinewCreated = await Sinews.create({
                month_id: this.month_id,
                rol_name: this.rol_name,
                cost: this.cost
            });
            return sinewCreated;
        } catch (error) {
            throw new Error('Error en la función createSinew: ' + error.message);
        }
    }

    async updateSinew(id, data) {
        try {
            let sinew_status = await Sinews.update({
                month_id: data.month_id,
                rol_name: data.rol_name,
                cost: data.cost,
                percent: data.percent
            }, {
                where: {
                    sinew_id: id
                }
            });
            return sinew_status;
        } catch (error) {
            throw new Error('Error en la función updateSinew: ' + error.message);
        }
    }

    async deleteSinew(id) {
        try {
            let sinew_status = await Sinews.update({
                active: 0
            }, {
                where: {
                    sinew_id: id
                }
            });
            return sinew_status;
        } catch (error) {
            throw new Error('Error en la función deleteSinew: ' + error.message);
        }
    }
}

async function getSinews(month) {
    try {
        let sinews_month = await Sinews.findAll({ where: { month_id: month, active: 1 } });
        return sinews_month;
    } catch (error) {
        throw new Error('Error en la función getSinews: ' + error.message);
    }
}

module.exports = {
    CreateTableSinews,
    Sinew,
    getSinews
}