const connection = require('./connection');

const create = async ({ name, quantity }) => {
    const [result] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);

    return {
        id: result.insertId,
    };
};

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM products');

    return result;
  };

const getByName = async (name) => {
    const [result] = await connection
    .execute('SELECT * FROM products WHERE name = ?', [name]);
 
    return result;
};

const findById = async (id) => {
    const [result] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [id]);

    return result;
};

const update = async (id, name, quantity) => {
    const [result] = await connection
    .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
    
    return result;
};

const remove = async (id) => {
    const [result] = await connection
    .execute('DELETE FROM products WHERE id = ?', [id]);

    console.log(result);
    return result;
};

module.exports = {
    create,
    getAll,
    getByName,
    findById,
    update,
    remove,
};