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

module.exports = {
  createSale,
};