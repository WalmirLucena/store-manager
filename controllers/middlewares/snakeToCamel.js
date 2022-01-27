const snakeToCamel = (sales) => (sales.map((sale) => ({
    productId: sale.product_id,
    quantity: sale.quantity,
})));

module.exports = snakeToCamel;