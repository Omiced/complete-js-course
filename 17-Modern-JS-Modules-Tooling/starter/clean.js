'strict mode';
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

//haciendo una funcion para obtener el limite
//modo sensualigod de sacar el limite
const getLimit = (user, limits) => limits?.[user] ?? 0;
//haciendo mas descriptivo el nombre de la constiable
//pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  return value <= getLimit(cleanUser, limits)
    ? //agregando nuevos objetos al estado usando el spread operator
      [...state, { value: -value, description, user: cleanUser }]
    : state;
  // budget.push({ value: -value, description, user });
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget1);
console.log(newBudget2);

const checkExpenses = function (state, limits) {
  // for (const entry of newBudget3) {
  //   if (entry.value < -getLimit(entry.user, limits)) {
  //     entry.flag = 'limit';
  //   }
  // }
  //remplazando el ciclo for por un metodo builtin
  return state.map(entry => {
    return entry.value < -getLimit(entry.user, limits)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 1000);
console.log(finalBudget);
