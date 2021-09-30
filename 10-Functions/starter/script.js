"use strict";
/* parametros por defecto
const bookings = [];
// en la forma pre es6 se declara el valor por defecto directo en el parametro
const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  //vieja forma de usar parametros por defecto pre es6
  // numPassangers = numPassangers || 1; //funciona con el corto circuito y los falsy values

  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("VJ201", 3);
//usando undefinded para saltar un parametro y que quede con su valor por defecto
createBooking("LK203", undefined, 500);
*/

/* functions accepting callback functions
//primero dos funciones normales
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const uperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" "); //usamos join y el rest operator para volver a unir el string
};

//high order function, es la que recibira una función como argumento
const transformer = function (str, fn) {
  // en el parametro solo se pasa el nombre de la función sin llamarla, dentro de la función se hace la llamada
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`); // se llama la función
  console.log(`Transformed by ${fn.name}`); // las funciones al ser solo otro tipo de objeto tambien
  //tienen propiedades en este caso usamos name, para obtener el nombre original de la función
};

transformer("JavaScript is the best!", uperFirstWord);
transformer("JavaScript is the best!", oneWord);
*/

/* funciones retornando funciones 
//función madre
// const greet = function (greeting) {
//   //función retornada por la función madre
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

//rescribiendo como arrow function
const greet = (greeting) => (name) => console.log(`${greeting} ${name}`);
//creando variable para mantener la función de retorno
const greeterHey = greet("hey");
greeterHey("Josue"); // aqui llamamos la función retornada.
//tambien se puede hacer una doble llamada
greet("hello")("Pedro");
*/

/* call, bind and aply methods
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Josue");
console.log(lufthansa);

//tenemos otra aerolinea y usaremos el mismo metodo de la aerolinea principal lufthansa
const euroWings = {
  airline: "EuroWings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book; // aqui ocurre un error ya que este método ahora es una función
// y en las funciones this retorna undefined

//usando call para arreglar el error
book.call(euroWings, 23, "bitch");
console.log(euroWings);

//aply ya no se usa xd
const flightData = [583, "George Cooper"];
book.apply(euroWings, flightData);

//bind method
const bookEW = book.bind(euroWings);
bookEW(245, "Cano");
console.log(euroWings);
//fijando argumentos
const bookEW69 = book.bind(euroWings, 69);
bookEW69("Beda");
console.log(euroWings);
//con event listeners
lufthansa.planes = 300;
lufthansa.buyPlanes = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// si no se usa bind al llamar el método this apuntara al elemento del dom
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlanes.bind(lufthansa));
//partial aplicaction
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
//creando una función para un impuesto nuevo
const addIVA = addTax.bind(null, 0.16);
console.log(addIVA(200));
//mini chall
const addTax2 = (rate) => (value) => value + value * rate;

const addIVA2 = addTax2(0.16);
console.log(addIVA2(200));
*/

/*coding challenge 
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  registerNewAnswer() {
    const favourite = Number(
      prompt(
        `${this.question} \n${this.options.join("\n")} \n(write option number)` //se usa join para unir los
        //elementos del array por lineas nuevas
      )
    );
    if (favourite >= 0 && favourite <= 3) {
      this.answers[favourite]++;
    } else {
      window.alert("wrong number");
    }
    return this.displayResults();
  },
  answers: new Array(4).fill(0),
  displayResults(type = "array") {
    if (type === "string") {
      console.log(`Poll results are ${this.answers}`);
    } else {
      console.log(this.answers);
    }
  },
};
const bonus = {
  answers: [5, 2, 3],
};
const pollBtn = document.querySelector(".poll");
const registerNewAnswer = poll.registerNewAnswer.bind(poll);
const bonusAnswers = poll.displayResults.bind(bonus);

pollBtn.addEventListener("click", registerNewAnswer);
console.log(bonusAnswers("array"));
console.log(bonusAnswers("string"));
//otra forma del bonus
poll.displayResults.call({ answers: [5, 2, 3] }, "string");
*/

/* immediately invoked function expression (iife)
(function () {
  console.log("this will never run again");
})();
//con arrow function
(() => console.log("this will ALSO never run again"))();
*/

/* clousures */
const secureBooking = function () {
  let passangerCount = 0;
  return function () {
    passangerCount++;
    console.log(`${passangerCount} passangers`);
  };
};

const booker = secureBooking();
//aunque la función booker fue declarada en un ambito global, esta aún tiene acceso
// a el ambito de la función creadora, que en este caso es secureBooking por ello es capas de
// manipular la variable passangerCount, incluso cuando esta en un ambito inferior "esto es clousure"
booker();
booker();
booker();
