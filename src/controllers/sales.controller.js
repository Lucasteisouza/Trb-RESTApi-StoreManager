const errorMap = require('../utils/errorMap');
const { salesServices } = require('../services');

const createSale = async (req, res) => {
  const itensSold = req.body;
  const sale = await salesServices.createSale(itensSold);
  if (sale.type) return res.status(errorMap.mapError(sale.type)).json({ message: sale.message });
  return res.status(201).json(sale.message);
};

module.exports = {
  createSale,
};