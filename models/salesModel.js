const connection = require('./connection');

const createSales = async (date) => {
    const [result] = await connection
    .execute('INSERT INTO sales (date) VALUES (?)', [date]);

    return { id: result.insertId };
};

const createSalesProduct = async (id, productId, quantity) => {
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [id, productId, quantity]);

    return { id: result.insertId };
};

module.exports = {
    createSales,
    createSalesProduct,
};