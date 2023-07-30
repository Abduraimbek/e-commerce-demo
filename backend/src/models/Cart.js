const { readDatabase, writeDatabase } = require('../utils/utils');

const writeCartsToDb = (carts) => {
  const data = readDatabase();
  data['carts'] = carts;
  writeDatabase(data);
};

class Cart {
  constructor(userId, productId, count) {
    this.id = Date.now();
    this.userId = userId;
    this.productId = productId;
    this.count = count;
    this.createdAt = null;
    this.updatedAt = null;
  }

  static fromDatabase(obj) {
    const cart = new Cart(obj.userId, obj.productId, +obj.count);
    cart.id = obj.id;
    cart.createdAt = obj.createdAt;
    cart.updatedAt = obj.updatedAt;
    return cart;
  }

  static getAllCarts() {
    const cartObjects = readDatabase()['carts'];
    let carts = [];
    for (let e of cartObjects) {
      carts.push(Cart.fromDatabase(e));
    }
    return carts;
  }

  static getCartsByUser(userId) {
    const carts = Cart.getAllCarts();
    return carts.filter((e) => e.userId == userId);
  }

  static addProductInCart(count, userId, productId) {
    let carts = Cart.getAllCarts();
    const index = carts.findIndex(
      (e) => e.userId == userId && e.productId == productId
    );

    let cart;

    if (index === -1) {
      cart = new Cart(userId, productId, count);
      cart.createdAt = Date.now();
      cart.updatedAt = Date.now();
      carts.push(cart);
    } else {
      carts[index].count += count;
      carts[index].updatedAt = Date.now();
      cart = carts[index];
    }

    writeCartsToDb(carts);

    return cart;
  }

  static deleteCart(id) {
    let carts = Cart.getAllCarts();
    carts = carts.filter((e) => e.id != id);
    writeCartsToDb(carts);
  }
}

module.exports = Cart;
