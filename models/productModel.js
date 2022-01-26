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

const getByName = async (name) => {
    const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name = ?', [name]);

    return result;
};

const findById = async (id) => {
    const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

    return result;
};

module.exports = {
    create,
    getAll,
    getByName,
    findById,
};