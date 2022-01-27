const rescue = require('express-rescue');
const SalesService = require('../services/salesService');
const snakeToCamel = require('./middlewares/snakeToCamel');

const CREATED = 201;

const create = rescue(async (req, res) => {
    const sales = snakeToCamel(req.body);

    const { id } = await SalesService.create(sales);

    return res.status(CREATED).json({ id, itemsSold: req.body });
});

module.exports = {
    create,
};