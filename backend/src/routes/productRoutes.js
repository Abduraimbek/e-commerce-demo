const express = require('express');
const {
  getProductById,
  getProducts,
} = require('../controller/product.controller');

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

module.exports = router;
