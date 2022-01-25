const connection = require('./connection');

const create = async ({ name, quantity }) => {
    const [result] = await connection
    .execute('INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)', [name, quantity]);

    return {
        id: result.insertId,
    };
};

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM StoreManager.products');

    return result;
  };

module.exports = {
    create,
    getAll,
};