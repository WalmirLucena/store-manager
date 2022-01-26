const rescue = require('express-rescue');
const ProductService = require('../services/productService');

const CREATED = 201;
const CONFLICT = 409;

const create = rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const checkName = await ProductService.getByName(name);
    if (checkName.length) {
    return res
        .status(CONFLICT).json({ message: 'Product already exists' }); 
}

    const product = await ProductService.create({ name, quantity });

    return res.status(CREATED).json(product);
});

module.exports = {
    create,
};