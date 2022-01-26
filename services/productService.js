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

const findById = async (id) => {
    const result = await ProductModel.findById(id);
    return result[0];
};

module.exports = {
    create,
    getAll,
    getByName,
    findById,
};