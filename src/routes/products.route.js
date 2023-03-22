const express = require('express');
const { productsControllers } = require('../controllers');

const router = express.Router();

router.get('/', productsControllers.getAll);
router.get('/:id', productsControllers.getProductById);

module.exports = router;