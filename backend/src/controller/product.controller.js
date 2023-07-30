const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = Product.getAllProducts();
    res.json(products);
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProducts, getProductById };
