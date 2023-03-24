const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router.post('/', salesControllers.createSale);
router.get('/', salesControllers.getAllSales);
router.get('/:id', salesControllers.getSaleById);

module.exports = router;
