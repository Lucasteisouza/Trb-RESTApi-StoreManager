const { productServices } = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const products = await productServices.getAll();
  if (products.type) {
    return res.status(errorMap.mapError(products.type)).json({ message: products.message });
  }
  return res.status(200).json(products.message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);
  const product = await productServices.getProductById(numericId);
  if (product.type) {
    return res.status(errorMap.mapError(product.type)).json({ message: product.message });
  }
  return res.status(200).json(product.message);
};

module.exports = {
  getAll,
  getProductById,
};