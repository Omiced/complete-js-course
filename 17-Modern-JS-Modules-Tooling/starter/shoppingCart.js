// exporting module
console.log('exporting module');
const shippingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${product} ${quantity} added to cart`);
};
