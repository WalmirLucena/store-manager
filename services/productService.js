const ProductModel = require('../models/productModel');

const create = async ({ name, quantity }) => {
    if (!name) return false;

    const { id } = await ProductModel.create({ name, quantity });

    return {
        id,
        name,
        quantity,
    };
};

const getAll = async () => {
    const result = await ProductModel.getAll();
    return result;
};

module.exports = {
    create,
    getAll,
};