const SalesModel = require('../models/salesModel');

const create = async (sales) => {
    const { id } = await SalesModel.createSales(new Date());

     const result = sales.map(async ({ productId, quantity }) => {
        await SalesModel.createSalesProduct(id, productId, quantity);
    });

    await Promise.all(result);

    return { id };
};

const getAll = async () => {
    const result = await SalesModel.getAll();
    return result;
};

const findById = async (id) => {
    const result = await SalesModel.findById(id);
    return result;
};

module.exports = {
    create,
    getAll,
    findById,
};