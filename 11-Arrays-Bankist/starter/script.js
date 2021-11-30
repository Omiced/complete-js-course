"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  //limpiando condiciones iniciales
  containerMovements.innerHTML = "";

  //sort
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
      <div class="movements__value">
        ${mov}€
      </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
//Mostrar el balance total con reduce()
const calcDisplayBalance = function (account) {
  //creando nueva llave con el valor del balance de cada cuenta
  account.balance = account.movements.reduce((total, mov) => total + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};
//Generar y mostrar el summary
const calcDisplaySummary = function (account) {
  //ingresos
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((income, mov) => income + mov, 0);
  //metiendo incomes en el dom
  labelSumIn.textContent = `${incomes}€`;
  //gastos
  const outgoings = account.movements
    .filter((mov) => mov < 0)
    .reduce((outcome, mov) => outcome + mov);
  //metiendo outgoings en el dom
  labelSumOut.textContent = `${outgoings}€`;
  //impuestos
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((total, int) => total + int);
  //metiendo intereses al dom
  labelSumInterest.textContent = `${interest}€`;
};
// función que crea una entrada con el username de cada objeto cuenta
const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
const updateUI = function (account) {
  //Display movements
  displayMovements(account.movements);
  //Display balance
  calcDisplayBalance(account);
  //Display summary
  calcDisplaySummary(account);
};

//event handlers
let currentAccount;
btnLogin.addEventListener("click", (e) => {
  //prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  //usamos optional chaining para ver si existe la cuenta
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display welcome message and ui
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    //limpiando los campos input
    inputLoginUsername.value = inputLoginPin.value = "";
    //blur() permite quitar el focus del elemento
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});
//transfer event
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  //cleaning fields
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    //doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});
//prestamos
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //agregar deposito
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});
//btn close
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    //delete account
    accounts.splice(index, 1);
    //hide ui
    containerApp.style.opacity = 0;
  }
  //cleaning fields
  inputClosePin.value = inputCloseUsername.value = "";
});

//sort
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault;
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTUREs
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/* simple array methods 
//slice
let arr = [1, 2, 3, 4, 5];
console.log(arr.slice(2)); //regresa los numeros apartir de la posición 2
console.log(arr.slice(2, 4)); //regresa los números a partir de la posición 2 y hasta la 4
*/
/* coding challenge 1
const checkDogs = function (dogsJulia, dogsKate) {
  const correctedJulia = dogsJulia.slice(1, -2);
  // const allDoges = [...correctedJulia, ...dogsKate];
  const allDoges = correctedJulia.concat(dogsKate);
  allDoges.forEach((dog, i) => {
    const adultPuppy =
      dog > 2
        ? `Dog number ${i + 1} is an adult, and is ${dog} years old`
        : `Dog number ${i + 1} is still a puppy`;
    console.log(adultPuppy);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log("-------------------Prueba 2");
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/* maps 
const eurToUsd = 1.1;
const movementsUsd = movements.map((mov) => mov * eurToUsd);

console.log(movementsUsd);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You  ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);

console.table(movementsDescriptions);
*/

/* filter
const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);
*/
/* reduce
const balance = movements.reduce((total, mov) => total + mov, 0);
console.log(balance);
//max val
const max = movements.reduce(
  (max, mov) => (max > mov ? max : mov),
  movements[0]
);
console.log(max);
*/
/* coding charenji 2 
const calcAverageHumanAge = function (ages) {
  const avgAges = ages
    .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter((age) => age > 18)
    .reduce((sum, age, i, arr) => sum + age / arr.length, 0);
  return avgAges;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

/* chaining methods 
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((total, mov) => total + mov);
console.log(totalDepositsUSD);
*/

/* find 
const acc1 = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(acc1);
let acc;
for (const account of accounts) {
  console.log(account.owner);
  if (account.owner === "Jessica Davis") {
    acc = { ...account };
    break;
  } else {
    acc = "not found";
  }
}
console.log(acc);
*/
/* flat() 
const arr = [[1, 2, 3, 4], [5, 6, 7, 8], 9, 10];
console.log(arr.flat());
// shendo more diperu
const arrDeep = [[1, [2, 3], 4], [5, 6, [7, 8]], 9, 10];
console.log(arrDeep.flat(2));
//ejemplo con los movements just flat alv
const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((total, mov) => total + mov, 0);
console.log(overalBalance);
//ejemplo con flatmap
const overalBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((total, mov) => total + mov, 0);
console.log(overalBalance2);
*/

/* sort 
// return < 0 then A before B
// return > 0 then B before A
//sort en orden ascendente
movements.sort((a, b) => a - b);
console.log(movements);
//sort en orden descendiente
movements.sort((a, b) => b - a);
console.log(movements);
*/
/* Array.from() 
//poner un underscore es una convención para decir que no estamos usando un parametro
const y = Array.from({ length: 7 }, (_, i) => i++);
console.log(y);

// 100 dice rolls
const diceRolls = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(diceRolls);

// Uso convirtiendo nodeList to iterable array
labelBalance.addEventListener("click", () => {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.table(movementsUI);
});
*/
/* array methods practice 
// 1.
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((total, mov) => total + mov, 0);
console.log(bankDepositSum);
// 2. Obtener todos los depositos mayores a mil
//forma uno la fácil
// const numDepostits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;
// console.log(numDepostits1000);
//forma con reduce
const numDepostits1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
console.log(numDepostits1000);
//3. crear un objeto que contenga la suma de los depositos y de los retiros con reduce
const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      //forma mas pro
      sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
      return sums; //reduce siempre tiene que retorna el acumulador
    },
    { deposits: 0, withdrawals: 0 }
    //podemos iniciar con un objeto vacio, o llenar uno ya echo, o empezar uno nuevo con llaves prefijadas
  );
console.log(deposits, withdrawals);
// 4. Charenji
const bankDepositSumReduce = accounts
  .flatMap((acc) => acc.movements)
  .reduce((total, current) => (current > 0 ? (total += current) : total), 0);
console.log(bankDepositSumReduce);
//5. title case function
const convertTitleCase = function (title) {
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
  //función para capitalizar
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  //trabajamos la excepción con includes en el array de excepciones
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  return capitalize(titleCase);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
*/
/* last charenji 
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];
//función que determina si estan bien alimentados, poco alimentados o muy alimentados
const eatingDogs = function (...own) {
  let currentFood = 0;
  let recommendedFood = 0;
  dogs.forEach((obj) => {
    if (obj.owners.includes(...own)) {
      currentFood = obj.curFood;
      recommendedFood = obj.recommendedFood;
    }
  });

  if (currentFood > 0 && currentFood > recommendedFood * 1.1) {
    return 1; //alimento de más
  } else if (currentFood > 0 && currentFood < recommendedFood * 0.9) {
    return 2; // alimento de menos
  }
};
// 1. Agregar la cantidad de comida recomendada a cada objeto del array dogs
dogs.forEach(
  (obj) => (obj.recommendedFood = Math.trunc(obj.weight ** 0.75 * 28))
);
console.log(dogs);
// 2. Encontrar el perro de Sarah y mostrar en consola si esta comiendo mucho o poco
console.log(
  `Sarah's dog is eating too ${eatingDogs("Sarah") === 1 ? "much" : "little"}`
);
//3.  array de dueños comen poco o mucho
const ownersEatTooLittle = dogs
  .flatMap((obj) => obj.owners)
  .filter((own) => eatingDogs(own) === 2);
console.log(ownersEatTooLittle);
const ownersEatTooMuch = dogs
  .flatMap((obj) => obj.owners)
  .filter((own) => eatingDogs(own) === 1);
console.log(ownersEatTooMuch);

// 4. log en un string los arrays anteriores
console.log(` ${ownersEatTooMuch.join(" and ")}'s dogs eats too much`);
console.log(` ${ownersEatTooLittle.join(" and ")}'s dogs eats too little`);
// 5. ver si hay algun perro que come justo lo recomendado true or false
const exactly = dogs.reduce((exac, obj) => {
  if (obj.curFood === obj.recommendedFood) {
    exac = true;
  } else {
    exac = exac;
  }
  return exac;
}, false);
console.log(exactly);
//con some
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));
// 6. ver si hay un perro que come una ración mas o menos recomendada
const maso = dogs.reduce((exac, obj) => {
  if (
    obj.curFood > obj.recommendedFood * 0.9 &&
    obj.curFood < obj.recommendedFood * 1.1
  ) {
    exac = true;
  } else {
    exac = exac;
  }
  return exac;
}, false);
console.log(maso);
//con some
console.log(
  dogs.some(
    (dog) =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);
// 7. Meter lo del 6 a un array
const masoArr = dogs.filter(
  (obj) =>
    obj.curFood > obj.recommendedFood * 0.9 &&
    obj.curFood < obj.recommendedFood * 1.1
);
console.log(masoArr);
// 8. crear una copia del array dogs y ordenarlo por cantidad de comida recomendada
// const dogsOrder = [];
// dogs.reduce((acc, obj, i) => {
//   if (acc > obj.recommendedFood) {
//     acc = acc;
//     dogsOrder.push(dogs[i]);
//   } else if (acc === obj.recommendedFood) {
//     acc = acc;
//   } else {
//     acc = obj.recommendedFood;
//     dogsOrder.push(obj);
//   }
//   return acc;
// }, dogs[0].recommendedFood);
// console.log(dogsOrder);
// the wae
//con slice sin parametro se copia todo el array, luego usando sort ordenamos.
const dogSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogSorted);
*/
/* metodo at(). */
const arra = [1, 2, 3, 4, 5, 6];
console.log(arra.at(-1));
