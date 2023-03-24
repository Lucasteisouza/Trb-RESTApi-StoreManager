const { salesModels } = require('../models');
const productServices = require('./product.services');

const schema = require('./validations/validationInputValues');

const areAllValidIds = async (itensSold) => {
  const returnsArr = [];
  for (let i = 0; i < itensSold.length; i += 1) {
    returnsArr.push(productServices.getProductById(itensSold[i].productId));
  }
  return Promise.all(returnsArr);
};

const createSale = async (itensSold) => {
  const error = schema.validateSaleRequestHasKeys(itensSold);
  if (error.type) return error;
  const error1 = schema.validateQuantity(itensSold);
  if (error1.type) return error1;

  const allProducts = await areAllValidIds(itensSold);
  const validateIds = allProducts.every((product) => product.type === null);
  
  if (!validateIds) return { type: 'NOT_FOUND', message: 'Product not found' };

  const sale = await salesModels.createSale(itensSold);
  return { type: null, message: sale };
};

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const sales = await salesModels.getSaleById(id);
  if (sales.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sales };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
