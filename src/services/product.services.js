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
  if (product.length === 0) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product[0] };
};

const createProduct = async (name) => {
  const error = schema.validateProductName(name);
  if (error.type) return error;

  const resultID = await productModels.createProduct(name);
  const [newProductObj] = await productModels.getProductById(resultID);
  return { type: null, message: newProductObj };
};

const updateProduct = async (id, name) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const error1 = schema.validateProductName(name);
  if (error1.type) return error1;

  const result = await productModels.updateProduct(id, name);
  if (result.affectedRows === 0) return { type: 'NOT_FOUND', message: 'Product not found' };

  const [updatedProductObj] = await productModels.getProductById(id);
  return { type: null, message: updatedProductObj };
};

const deleteProduct = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const result = await productModels.deleteProduct(id);
  if (result.affectedRows === 0) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: result };
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};