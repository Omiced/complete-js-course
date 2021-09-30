"use strict";

// Data needed for a later exercise

// Data needed for first part of the section
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; // al llamar la función este
    // array se puede destructurar.
  },

  openingHours, //primer enhanced de objetos literales.
  orderDelivery({
    //segundo enhanced métodos sin function.
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order recived ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}, will be` +
        `delivered to ${address} at ${time}`
    ); //destructuring en función object
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    // método con rest
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*destructuring arrays
let [first, , second] = restaurant.categories;
console.log(first, second);
//cambio de variable con destructuring
[second, first] = [first, second];
console.log(first, second);
// llamando función y destructurando al mismo tiempo
const [starter, main] = restaurant.order(1, 2);
console.log(starter, main);
// destructuring dentro de un destructuring
const nested = [1, 2, [3, 4]];
const [i, , [j, k]] = nested;
console.log(i, j, k);
//default values en destructuring
const [a = 1, b = 2, c = 3] = [1, 2];
console.log(a, b, c);
*/
/* destructuring objects 
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// renombrando las variables
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
//valores por defecto
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
//mutando variables
let a = 10;
let b = 20;
console.log(a, b);
const obj = {
  a: 30,
  b: 50,
  c: 40,
};
({ a, b } = obj);
console.log(a, b);
//nested objects
const {
  fri: { close, open },
} = openingHours;
console.log(open, close);
//destructuring en una funcion
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

//llamada con valores por defecto
restaurant.orderDelivery({
  address: "Via del sole, 21",
  starterIndex: 3,
});
*/

/* spread operato
const arr = [5, 6, 7];
const newArray = [1, 2, 3, 4, ...arr];
console.log(newArray);
//copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);
//Join arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// objects
const newRestaurant = { ...restaurant, foundedIn: 1999 };
console.log(newRestaurant);
console.log(restaurant);
*/

/* rest patern
// toma todos los elementos no asignados durante el destructuring
const [a, b, ...others] = [1, 2, 3, 4, 5, 6]; // asignará a =1, b=2 y el resto de elementos a un array nuevo others
console.log(a, b, others);
//objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
// function with rest parameters
const add = function (...numbers) {
  return numbers.reduce((acumulador, actual) => (acumulador += actual));
};
console.log(add(1, 2, 3, 4));
console.log(add(1, 2, 3, 4, 5, 6, 7));
// llamando método con rest
restaurant.orderPizza("peperoni", "queso", "salchicha");
restaurant.orderPizza("queso");
*/

/* short circuiting
// asignando valor por defecto si la primera evaluación del || es falsa
const guests = restaurant.numberOfGuests || 20;
console.log(guests);
//and
console.log(null && "josue");
console.log("ok" && "esta bien");
*/

/* nullish 
restaurant.numGuest = 0;
const guestZero = restaurant.numGuest ?? 10;
console.log(guestZero);
*/

/* coding challenge game variable*/
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "� Substitution"],
  [47, "⚽ GOAL"],
  [61, "� Substitution"],
  [64, "� Yellow card"],
  [69, "� Red card"],
  [70, "� Substitution"],
  [72, "� Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "� Yellow card"],
]);
/* coding challenge 1 code.
//creando un array por cada 11 jugadores de los 2 equipos
const [players1, players2] = game.players;
console.log(players1, players2);

//separando al portero de los demás jugadores equipo 1
const gk = players1[0];
const [, ...fieldPlayers] = players1;
console.log(`gk is ${gk}`, fieldPlayers);

// creando un array con los 22 jugadores;
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//creando un array nuevo del equipo uno más 3 nuevos jugadores
const players1Final = [...players1, "Thiago", "Countinho", "Perisic"];
console.table(players1Final);

//creando variables para cada una de las posibilidades
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//función que recibe un número arbitrario de jugadores, no en array
const printGoals = function (...players) {
  // players.forEach((player, index) =>
  //   console.log(`el jugador ${player} anoto ${index} goles`)
  // ); Lo que yo entendi
  console.log(`${players.length} gols where scored`); // lo que era
};
//first test
printGoals("Davis", "Muller", "Lewandowsky", "Kimmich");
//second test con la llave scored del objeto.
printGoals(...game.scored);

//viendo quien gana sin usar if
team1 < team2 && console.log("team1 gana");
team1 > team2 && console.log("team2 gana");
*/

/* for of
const arr = [1, 2, 3, 4, 5];
for (const item of arr) console.log(item);
*/

/* optinal chaining ?. 
//without optinal chaining
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

//with optinal chaining
console.log(restaurant.openingHours?.mon?.open); // al evaluar antes si existe la propiedad moon, no marcara error solo retornara un undefined

// ejemplo
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "no abrimos perro";
  //usamos chaining para ver si existe el día y nullish para fijar un valor por defecto en caso de
  //retornar undefined por el chaining
  console.log(`On ${day}, we open at ${open}`);
}
// metodos
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
*/

/* iterar sobre objetos 
//object keys
const keys = Object.keys(openingHours);
console.log(keys);

//object values
const values = Object.values(openingHours);
console.table(values);

//entries keys + values
const entries = Object.entries(openingHours);
console.table(entries);

//destructuring las entries
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

/* coding challenge 2 code
// imprimir jugadores scored junto sus goles
const scored = game.scored.entries();
for (const [gol, jugador] of scored) {
  console.log(`Goal ${Number(gol) + 1}: ${jugador}`);
}
// usar loop para calcular el promedio de las posibilades
const oddsValues = Object.values(game.odds);
let sum = 0;
for (const odd of oddsValues) {
  sum += odd;
}
console.log(`el promedio de las posibilidades es ${sum / oddsValues.length}`);

// imprime las odds
const oddsEntries = Object.entries(game.odds);
console.log(oddsEntries);
for (const [team, odd] of oddsEntries) {
  const teamStr = team === "x" ? "draw" : `Victory ${game[team]}`;
  console.log(`Odd of  ${teamStr} : ${odd}`);
}

//bonus
const scores = {};
for (const player of game.scored) {
  scores[player] ? scores[player]++ : (scores[player] = 1);
}
console.log(scores);

*/

/* sets
const arr = ["Pizza", "Pasta", "Focaccia", "Pizza", "Pasta"];
//creación set
const orderSet = new Set(arr);
console.log(orderSet);
//cosas del set
console.log(orderSet.size);
console.log(orderSet.has("Pasta"));
orderSet.add("Fetuchini");
console.log(orderSet);
orderSet.delete("Pizza");
console.log(orderSet);
// orderSet.clear()
//crear array sin elementos repetidos
const arrNoRepetido = [...new Set(arr)];
console.log(arrNoRepetido);
*/

/* maps 
const mapChido = new Map();
//encadenando multiples sets alv
mapChido
  .set("este map es chido", 1)
  .set("este map no es chido", 2)
  .set(true, "si es chido")
  .set(false, "no es chido");
console.log(mapChido);
//obteniendo valor de la llave
console.log(mapChido.get(false));
// trabajando con la ventaja de que las llaves pueden ser boolean
const mapChidin = 0;
console.log(
  mapChido.get(
    mapChidin === mapChido.get("este map es chido") ||
      mapChidin === mapChido.get("este map no es chido")
  )
);
// mas métodos del map
console.log(mapChido.has("chides"));
mapChido.delete(false);
console.log(mapChido);
console.log(mapChido.size);
//map.clear();
//llave array
const arr2 = [1, 2];
mapChido.set(arr2, "es un array xd");
console.log(mapChido.get(arr2));

  maps iterations 
//llenando mapa sin set
const question = new Map([
  ["question", "What is the besto programming languaje in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "correct"],
  [false, "Try again!"],
]);
console.log(question);

// convertir objeto a mapa
const entriesOb = Object.entries(openingHours);
const mapOpeningHours = new Map(entriesOb);
console.log(mapOpeningHours);

// iterando
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = prompt("your answer biche");
// console.log(question.get(Number(answer) === 3));
// regresar map a array
const mapToArr = [...mapOpeningHours];
console.log(mapToArr);
*/

/* coding challenge 3 code 
// create an array of events no duplicates
gameEvents.values();
const events = [...new Set(gameEvents.values())];
console.log(events);
//remover el evento del minuto 64
gameEvents.delete(64);
console.log(gameEvents);
//string average calculated
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes `
);
//loop and log
for (const [minute, event] of gameEvents) {
  if (minute > 45) {
    console.log(`[Second Half]${minute}: ${event}`);
  } else {
    console.log(`[First Half]${minute}: ${event}`);
  }
}
*/

/* working with strings 1
const airline = "TAP Air Portugal";
// indexOf and lastIndexOf
console.log(airline.indexOf("A"));
console.log(airline.lastIndexOf("r")); // devuelve el indice donde esta por ultima vez el parametro ofrecido
//slice obteniendo la primera palabra de una cadena
console.log(airline.slice(0, airline.indexOf(" ")));
//ultima palabra
console.log(airline.slice(airline.lastIndexOf(" ") + 1));
// working with strings 3
//split
console.log("hola+que+hace+perro".split("+"));
console.log("Josue Cano".split(" "));
const newName = ["Mr", "perro", "man"].join(" ");
console.log(newName);
//
const capitalizeName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
};

capitalizeName("josue cano villalobos");
//padding
const message = "hola perro xd";
console.log(message.padStart(25, "xd"));
//aplicación rial wor
const maskCreditCard = function (number) {
  const str = String(number);
  const cortado = str.slice(-4);
  return cortado.padStart(str.length, "*");
};

console.log(maskCreditCard(1222321389731));


document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const textAreaValue = document.querySelector("textarea");
const btn = document.querySelector("button");
let contentText;
const toCamelCase = function (text) {
  // primerao sacar espacios y saltos de linea
  const textArr = text.toLowerCase().trim().split("\n");
  const arrNo_ = [];
  let check = "";
  //segundo sacar guines bajos
  for (const arr of textArr) {
    arrNo_.push(arr.split("_"));
  }
  //tercero poner mayus y sacar espacios restantes
  for (const [primera, segunda] of arrNo_) {
    console.log(
      `${primera.trim()}${segunda.replace(
        segunda[0],
        segunda[0].toUpperCase()
      )} ${(check += "✅️")}`
    );
  }
  // console.log(textArr);
  // console.log(arrNo_);
};

btn.addEventListener("click", () => {
  contentText = textAreaValue.value;
  // console.log(contentText);
  toCamelCase(contentText);
}); */

/* extra callenge
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";
//función pal slice
const getCode = (str) => str.slice(0, 3).toUpperCase();
//primero splitear el string original
for (const flight of flights.split("+")) {
  //despues destructuring los arrays resultantes, mientras separamos por los ;
  const [type, from, to, time] = flight.split(";");
  //crear el output
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll(
    "_",
    " "
  )} from ${getCode(from)} to ${getCode(to)} ${time.replace(
    ":",
    "h"
  )}`.padStart(45); // ir remplazando en cada uno conforme sea necesario
  console.log(output);
}
*/
