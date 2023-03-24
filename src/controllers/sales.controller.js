const errorMap = require('../utils/errorMap');
const { salesServices } = require('../services');

const createSale = async (req, res) => {
  const itensSold = req.body;
  const sale = await salesServices.createSale(itensSold);
  if (sale.type) return res.status(errorMap.mapError(sale.type)).json({ message: sale.message });
  return res.status(201).json(sale.message);
};

const getAllSales = async (_req, res) => {
  const sales = await salesServices.getAllSales();
  if (sales.type) return res.status(errorMap.mapError(sales.type)).json({ message: sales.message });
  return res.status(200).json(sales.message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);
  const sale = await salesServices.getSaleById(numericId);
  if (sale.type) return res.status(errorMap.mapError(sale.type)).json({ message: sale.message });
  return res.status(200).json(sale.message);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};