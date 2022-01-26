const rescue = require('express-rescue');
const ProductService = require('../services/productService');

const OK = 200;
const CREATED = 201;
const CONFLICT = 409;
const NOT_FOUND = 404;

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

const getAll = rescue(async (_req, res) => {
    const product = await ProductService.getAll();

    return res.status(OK).json(product);
});

const findById = rescue(async (req, res) => {
    const { id } = req.params;
    const product = await ProductService.findById(id);

    if (!product) return res.status(NOT_FOUND).json({ message: 'Product not found' });

    return res.status(OK).json(product);
});

const update = rescue(async (req, res) => {
    const { id } = req.params;

    const product = await ProductService.findById(id);

    if (!product) return res.status(NOT_FOUND).json({ message: 'Product not found' });

    const { name, quantity } = req.body;

    const newProduct = { id, name, quantity };

    await ProductService.update(id, newProduct);

    return res.status(OK).json(newProduct);
});

module.exports = {
    create,
    getAll,
    findById,
    update,
};