const connection = require('./connection');

const createSale = async (itensSold) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  const returnArr = [];
  const verifyArr = [];
  for (let i = 0; i < itensSold.length; i += 1) {
    const { productId, quantity } = itensSold[i];
    verifyArr.push(
      connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, productId, quantity],
      ),
    );
    returnArr.push({ productId, quantity });
  }
  await Promise.all(verifyArr);
  const returnObj = { id: insertId, itemsSold: await Promise.all(returnArr) };
  
  return returnObj;
};

const getAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  const [salesProducts] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products
    ORDER BY sale_id ASC, product_id ASC`,
  );
  const response = salesProducts.map((sale) => {
    const { date } = sales.find((s) => s.id === sale.sale_id);
    const { sale_id: saleId, product_id: productId, quantity } = sale;
    return { saleId, productId, quantity, date };
  });
  return response;
};

const getSaleById = async (id) => {
  const [sales] = await connection.execute('SELECT * FROM StoreManager.sales');
  const [salesProducts] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  const returnSale = salesProducts.map((sale) => {
    const { date } = sales.find((s) => s.id === sale.sale_id);
    const { product_id: productId, quantity } = sale;
    return { productId, quantity, date };
  });
  return returnSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};