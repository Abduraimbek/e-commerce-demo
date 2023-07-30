const { readDatabase } = require('../utils/utils');

class Product {
  constructor(name, description, price, countInStock, imageUrl) {
    this.id = Date.now();
    this.name = name;
    this.description = description;
    this.price = price;
    this.countInStock = countInStock;
    this.imageUrl = imageUrl;
  }

  static fromDatabase(obj) {
    const product = new Product(
      obj.name,
      obj.description,
      obj.price,
      obj.countInStock,
      obj.imageUrl
    );
    product.id = obj.id;
    return product;
  }

  static getAllProducts() {
    const productObjects = readDatabase()['products'];
    let products = [];
    for (let e of productObjects) {
      products.push(Product.fromDatabase(e));
    }
    return products;
  }

  static findById(id) {
    const products = Product.getAllProducts();
    const product = products.find((e) => e.id == id);
    if (product) {
      return product;
    }
    throw 'Product not found with id=' + id;
  }
}

module.exports = Product;
