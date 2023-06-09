const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
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
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const updateProduct = async (id, name) => {
  const [product] = await connection.execute(
    `UPDATE StoreManager.products
    SET name=?
    WHERE id=?`,
    [name, id],
  );
  return product;
};

const deleteProduct = async (id) => {
  const [product] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id=?`,
    [id],
  );
  return product;
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};