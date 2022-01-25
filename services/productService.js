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

module.exports = {
    create,
};