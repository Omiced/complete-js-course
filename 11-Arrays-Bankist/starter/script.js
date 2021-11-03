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

const displayMovements = function (movements) {
  //limpiando condiciones iniciales
  containerMovements.innerHTML = "";
  movements.forEach((mov, i) => {
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
