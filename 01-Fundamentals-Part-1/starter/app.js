// const country = "Mexico";
// const continent = "America";
// const population = 100000000;
// const isIsland = false;
// let languaje;
// languaje = "español";
// const halfPop = population / 2;
// const popPlusOne = population + 1;
// const finland = 6000000;
// const average = 33_000_000;
// console.log(popPlusOne);
// console.log(finland > population);
// console.log(population > average);
// console.log(
//   country +
//     " is in " +
//     continent +
//     " and its " +
//     population +
//     " speak " +
//     languaje
// );
// console.log(isIsland, country, languaje, population);

/* coding challenge */
// const markMass = 78;
// const markHeight = 1.69;
// const johnMass = 92;
// const johnHeight = 1.95;

// const markMass2 = 95;
// const markHeight2 = 1.88;
// const johnMass2 = 85;
// const johnHeight2 = 1.76;

// const bmiMarkTest1 = markMass / (markHeight * markHeight);
// const bmiJohnTest1 = johnMass / (johnHeight * johnHeight);
// const markHigherBmi = bmiMarkTest1 > bmiJohnTest1;

// const bmiMarkTest2 = markMass2 / (markHeight2 * markHeight2);
// const bmiJohnTest2 = johnMass2 / (johnHeight2 * johnHeight2);
// const markHigherBmi2 = bmiMarkTest2 > bmiJohnTest2;

// // console.log(bmiMarkTest1, bmiJohnTest1, markHigherBmi);
// // console.log(
// //   "-------------Test 2----------------- \n" + bmiMarkTest2,
// //   bmiJohnTest2,
// //   markHigherBmi2
// // );

// if (markHigherBmi) {
//   console.log(
//     `Mark's BMI (${bmiMarkTest1}) is higher than John's (${bmiJohnTest1})`
//   );
// } else {
//   console.log(
//     `John's BMI (${bmiJohnTest1}) is higher than Mark's (${bmiMarkTest1})`
//   );
// }

// /* mini challs */
// const name = "Josue";
// const year = 1993;
// const current = 2021;

// const description = `My name is ${name} and my age is ${current - year}`;
// console.log(description);

/* coding challenge 3 */
// const dolphinsAvg = (97 + 112 + 101) / 3;
// const koalasAvg = (109 + 95 + 106) / 3;

// if (dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
//   console.log(`Dolphins win the trophy! with ${dolphinsAvg} avg score`);
// } else if (koalasAvg > dolphinsAvg && koalasAvg >= 100) {
//   console.log(`Koalas win the trophy! with ${koalasAvg} avg score`);
// } else if (
//   koalasAvg === dolphinsAvg &&
//   koalasAvg >= 100 &&
//   dolphinsAvg >= 100
// ) {
//   console.log("it's a draw");
// }

const bill = 430;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total is ${tip + bill}`
);
