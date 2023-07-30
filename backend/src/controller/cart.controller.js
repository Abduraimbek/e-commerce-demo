const Cart = require('../models/Cart');

const getCartProducts = async (req, res) => {
  try {
    const carts = Cart.getCartsByUser(req.user.id);
    res.status(200).json({ status: 'ok', carts });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const addProductInCart = async (req, res) => {
  const { productId, count } = req.body;
  try {
    const cart = Cart.addProductInCart(count, req.user.id, productId);
    res.status(201).json({ status: 'ok', cart });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    Cart.deleteCart(req.params.id);
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

module.exports = { getCartProducts, addProductInCart, deleteProductInCart };
