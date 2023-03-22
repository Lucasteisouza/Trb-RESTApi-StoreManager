const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id=?`,
    [id],
  );
  return product;
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
};