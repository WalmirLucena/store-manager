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

const getAll = async () => {
    const query = 'SELECT sale_id AS saleId, date, product_id, quantity' 
    + ' FROM sales AS s INNER JOIN sales_products AS sp ON s.id = sp.sale_id';

    const [result] = await connection.execute(query);

    return result;
};

const findById = async (id) => {
    const query = 'SELECT date, product_id, quantity' 
    + ' FROM sales AS s INNER JOIN sales_products AS sp ON s.id = sp.sale_id WHERE s.id = ?';
    const [result] = await connection.execute(query, [id]);

    return result;
};

const update = async (id, productId, quantity) => {
    const query = 'UPDATE sales_products SET quantity = ?'
    + ' WHERE sale_id = ? AND product_id = ?';

    const [result] = await connection.execute(query, [quantity, id, productId]);

    return result;
};

module.exports = {
    createSales,
    createSalesProduct,
    getAll,
    findById,
    update,
};