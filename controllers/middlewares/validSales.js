const snakeToCamel = require('./snakeToCamel');

const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const validSalesId = (req, res, next) => {
    const sales = snakeToCamel(req.body);
    const notExistProdutctId = sales.some(({ productId }) => !productId);
    if (notExistProdutctId) {
 return res
    .status(BAD_REQUEST)
    .json({ message: '"product_id" is required' }); 
}
    next();
};

const validSalesQuantity = (req, res, next) => {
    const notExistQuantity = req.body.some(({ quantity }) => quantity === undefined);

    if (notExistQuantity) {
 return res
    .status(BAD_REQUEST).json({ message: '"quantity" is required' }); 
}
    const checkQuantity = req.body
    .some(({ quantity }) => typeof quantity !== 'number' || quantity <= 0);

    if (checkQuantity) {
    return res.status(UNPROCESSABLE_ENTITY)
        .json({ message: '"quantity" must be a number larger than or equal to 1' }); 
}
    next();
};

module.exports = {
    validSalesId,
    validSalesQuantity,
};