const express = require('express');
const { productsControllers } = require('../controllers');

const router = express.Router();

router.get('/', productsControllers.getAll);
router.get('/:id', productsControllers.getProductById);
router.post('/', productsControllers.createProduct);

module.exports = router;