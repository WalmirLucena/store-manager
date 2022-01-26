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

const update = async (id, { name, quantity }) => {
    const result = await ProductModel.update(id, name, quantity);
    return result;
};

const remove = async (id) => {
    await ProductModel.remove(id);
};

module.exports = {
    create,
    getAll,
    getByName,
    findById,
    update,
    remove,
};