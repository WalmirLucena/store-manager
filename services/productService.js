const ProductModel = require('../models/productModel');

const create = async ({ name, quantity }) => {
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

const getByName = async (name) => {
    const result = await ProductModel.getByName(name);
    return result;
};

module.exports = {
    create,
    getAll,
    getByName,
};