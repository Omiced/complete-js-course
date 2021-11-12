"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-11-09T17:01:17.194Z",
    "2021-11-10T23:36:17.929Z",
    "2021-11-11T10:00:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////

// Functions
//formateador de currencies
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};
const displayMovements = function (acc, sort = false) {
  //limpiando condiciones iniciales
  containerMovements.innerHTML = "";
  //formateador de fechas
  const formatMovementsDates = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    //formatenado today yesterday etc.
    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) {
      return "Today";
    } else if (daysPassed === 1) {
      return "Yesterday";
    } else if (daysPassed <= 7) {
      return `${daysPassed} days ago`;
    } else {
      //formato fecha normal
      return new Intl.DateTimeFormat(locale).format(date);
    }
  };
  //sort
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((mov, i) => {
    //formating numbers with intl
    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    const type = mov > 0 ? "deposit" : "withdrawal";
    //usando el indice iteramos sobre el array de las fechas
    //convertimos el string del array a fecha de js
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDates(date, acc.locale);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">
        ${formattedMov}
      </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
//Mostrar el balance total con reduce()
const calcDisplayBalance = function (acc) {
  //creando nueva llave con el valor del balance de cada cuenta
  acc.balance = acc.movements.reduce((total, mov) => total + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
//Generar y mostrar el summary
const calcDisplaySummary = function (account) {
  //ingresos
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((income, mov) => income + mov, 0);
  //metiendo incomes en el dom
  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);
  //gastos
  const outgoings = account.movements
    .filter((mov) => mov < 0)
    .reduce((outcome, mov) => outcome + mov);
  //metiendo outgoings en el dom
  labelSumOut.textContent = formatCur(
    Math.abs(outgoings),
    account.locale,
    account.currency
  );
  //impuestos
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((total, int) => total + int);
  //metiendo intereses al dom
  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
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
  displayMovements(account);
  //Display balance
  calcDisplayBalance(account);
  //Display summary
  calcDisplaySummary(account);
};
//logout timer
const startLogOutTimer = function () {
  //set time to five minutes
  let timer = 300;
  //call the time every second
  const tick = () => {
    const min = String(Math.floor(timer / 60)).padStart(2, 0);
    const seconds = String(timer % 60).padStart(2, 0);
    //in each call, print the remaining time to ui
    labelTimer.textContent = `${min}:${seconds}`;
    //when 0 seconds, stop timer and log out user
    if (timer === 0) {
      clearInterval(interval);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    //decrese 1s
    timer--;
  };
  tick();
  const interval = setInterval(tick, 1000);
  return interval;
};
//event handlers
let currentAccount;
let timer;

/* agregando fecha
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0); //con padstart ponemos un 0 si solo hay día de un digito o mes
const month = `${now.getMonth() + 1}`.padStart(2, 0); // como empieza en 0 hay que sumarle uno alv
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
*/
btnLogin.addEventListener("click", (e) => {
  //prevent form from submitting
  e.preventDefault();
  //agregando fecha internacionalizada
  /* Internationalizing Dates with js APi internationalizing */
  //experimenteishon with the api men
  const now = new Date();
  //objeto de opciones
  const opciones = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  //obteniendo locale del navegador
  // const localLanguaje = navigator.language;
  // usamos la api para darle formato grindo, psando el locale languaje y formateando la fecha deseada
  // en este caso now, pasamos las opciones como segundo argumento
  //login logic
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    opciones
  ).format(now);
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
    //timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    //update ui
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
    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //update ui
    updateUI(currentAccount);
    //reset timer
    clearInterval(timer);
    startLogOutTimer();
  }
});
//prestamos
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //agregar deposito
      currentAccount.movements.push(amount);
      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //update ui
      updateUI(currentAccount);
    }, 2500);
    //reset timer
    clearInterval(timer);
    startLogOutTimer();
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
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/* converting and checking numbers 
// se puede convertir un string a numero usando + antes del string
console.log(+"100");
//con parseInt se convierte y tambien saca caracteres no numericos
console.log(Number.parseInt("20px", 10));
// isFinite es lo mejor para comprobar
console.log(Number.isFinite(2));
console.log(Number.isFinite("2"));
*/

/* Math and Rounding
//función para generar numeros random
const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);
console.log(randomInt(6, 1));
//rounding décimales
console.log((2.7).toFixed(0));
*/

/* dates
const now = new Date();
console.log(now);

//con year
// se acomoda de manera automatica a diciembre 3
console.log(new Date(2037, 10, 33, 21));

//métodos de objeto date
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); // este obtiene el día
console.log(future.getDay()); // este obtiene el número del dia de la semana
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.getTime()); // regresa la timestamp

console.log(new Date(2142278580000)); //reverseando la timeStamp
console.log(Date.now()); //devuelve la timeStamp de la fecha actual
*/

/* operaciones con dates 
//obteniendo timestamp al convetir date a number
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));
//operando con dates
//función que dice cuantos días han pasado de una fecha a otra.
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 21)));
*/

/* setTimeout and setInterval 
//setTimeout
const ingredientes = ["pastor, salsa"];
const pT = setTimeout(
  (ing1, ing2) => console.log(`Toma tus tacos de ${ing1} con ${ing2}`),
  3000,
  ...ingredientes
);
console.log("esperando mis tacos alv...");
if (ingredientes.includes("cebolla")) clearTimeout(pT);
//setInterval
setInterval(() => {
  const now = new Date();
  const clock = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(now);
  console.log(clock);
}, 1000);
*/
