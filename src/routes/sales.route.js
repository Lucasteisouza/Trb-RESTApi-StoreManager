const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router.post('/', salesControllers.createSale);

module.exports = router;
