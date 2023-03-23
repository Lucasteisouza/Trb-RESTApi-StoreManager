const { idSchema, productNameSchema, quantitySchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = productNameSchema.validate(name);
  if (error) {
 return {
   type: 'INVALID_VALUE',
   message: '"name" length must be at least 5 characters long',
 }; 
}

  return { type: null, message: '' };
};

const validateSaleRequestHasKeys = (itensSold) => {
  for (let i = 0; i < itensSold.length; i += 1) {
    if (!itensSold[i].productId) {
      return { type: 'BAD_REQUEST', message: '"productId" is required' };
    }
    if (itensSold[i].quantity === undefined) {
      return { type: 'BAD_REQUEST', message: '"quantity" is required' };
    }
  }
  return { type: null, message: '' };
};

const validateQuantity = (itensSold) => {
  for (let i = 0; i < itensSold.length; i += 1) {
    const { error } = quantitySchema.validate(itensSold[i].quantity);
    if (error) {
      return {
        type: 'INVALID_VALUE',
        message: '"quantity" must be greater than or equal to 1',
      };
    }
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProductName,
  validateSaleRequestHasKeys,
  validateQuantity,
};
