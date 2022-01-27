const SalesModel = require('../models/salesModel');

const create = async (sales) => {
    const { id } = await SalesModel.createSales(new Date());

     const result = sales.map(async ({ productId, quantity }) => {
        await SalesModel.createSalesProduct(id, productId, quantity);
    });

    await Promise.all(result);

    return { id };
};

module.exports = {
    create,
};