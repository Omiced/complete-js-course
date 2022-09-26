// importing moduel
// import { addToCart } from './shoppingCart.js';
// console.log('importing module');

// addToCart('pollo', 1);
/* ejemplo con top-leven await*/
const getLastPos = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPos = await getLastPos();
console.log(lastPos);
