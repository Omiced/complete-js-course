// importing moduel
import { addToCart } from './shoppingCart.js';
console.log('importing module');
addToCart('pollo', 1);
/* ejemplo con top-leven await
const getLastPos = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPos = await getLastPos();
console.log(lastPos);*/
/* module patern
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  //cosas que queremos devolver o la API publica.
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizz', 2);
*/

/* modulos de npm */
//ruta manual
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//ruta con parcel
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    [
      { product: 'pizza', quantity: 5 },
      { product: 'bread', quantity: 5 },
    ],
  ],
  user: { loggedIn: true },
};

//clonando con js normie
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
//se puede observar que clonando de esta manera
//aún se tienen problemas de direccionamiento de variables mas profundas
console.log(stateClone);

//clonando con lodash
console.log(stateDeepClone);
//hot module replacement parcel
if (module.hot) {
  module.hot.accept();
}
