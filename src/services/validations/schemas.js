// src/services/validations/schemas.js

const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productNameSchema = Joi.string().min(5).max(30).required();

module.exports = {
  idSchema,
  productNameSchema,
};
