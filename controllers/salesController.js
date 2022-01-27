const rescue = require('express-rescue');
const SalesService = require('../services/salesService');
const snakeToCamel = require('./middlewares/snakeToCamel');

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

const create = rescue(async (req, res) => {
    const sales = snakeToCamel(req.body);

    const { id } = await SalesService.create(sales);

    return res.status(CREATED).json({ id, itemsSold: req.body });
});

const getAll = rescue(async (_req, res) => {
    const salesList = await SalesService.getAll();

    return res.status(OK).json(salesList);
});

const findById = rescue(async (req, res) => {
    const { id } = req.params;
    const selectedSale = await SalesService.findById(id);

    if (!selectedSale[0]) return res.status(NOT_FOUND).json({ message: 'Sale not found' });

    return res.status(OK).json(selectedSale);
});

module.exports = {
    create,
    getAll,
    findById,
};