const ProductService = require('../services/productService');

const URL_CREATED = 201;
const URL_BAD_REQUEST = 400;
const URL_UNPROCESSABLE = 422;
const URL_CONFLICT = 409;

const validName = (name, res) => {
    if (!name) return res.status(URL_BAD_REQUEST).json({ message: '"name" is required' });
    if (name.lenght < 5) {
    return res.status(URL_UNPROCESSABLE)
        .json({ message: '"name" length must be at least 5 characters long' }); 
}
};

const validQuantity = (quantity, res) => {
    if (!quantity) return res.status(URL_BAD_REQUEST).json({ message: '"quantity" is required' });
    if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(URL_UNPROCESSABLE)
        .json({ message: '"quantity" must be a number larger than or equal to 1' }); 
}
};

const create = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await ProductService.create({ name, quantity });
     validName(name, res);

    const checkName = ProductService.getAll().some((item) => item.name === name);
    if (checkName) return res.status(URL_CONFLICT).json({ message: 'Product already exists' });

    validQuantity(quantity, res);

    return res.status(URL_CREATED).json(product);
};

module.exports = {
    create,
};