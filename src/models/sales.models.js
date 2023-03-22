const connection = require('./connection');

const newSales = async (itensSold) => {
  itensSold.forEach(async (item) => {
    const [{ insertId }] = await connection.execute(
      `INSERT INTO sales (product_id, date)
      VALUES (?, ?)`,
      [item.productId, 'NOW()'],
    );
    await connection.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [insertId, item.productId, item.quantity],
    );
  });
};

module.exports = {
  newSales,
};