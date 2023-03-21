const { productModels } = require('../models');
const schema = require('./validations/validationInputValues');

const getAll = async () => {
  const products = await productModels.getAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const product = await productModels.getProductById(id);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  getAll,
  getProductById,
};