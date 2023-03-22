const connection = require('./connection');

const newSales = async (itensSold) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  const returnObj = { id: insertId, itensSold: [] };
  itensSold.forEach(async (item) => {
    const { productId, quantity } = item;
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
    returnObj.itensSold.push({ productId, quantity });
  });
  return returnObj;
};

module.exports = {
  newSales,
};