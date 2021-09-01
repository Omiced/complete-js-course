"use strict";
//functions
// function describeCountry(country, population, capitalCity) {
//   return `${country} has ${population} people and its capital city is ${capitalCity}`;
// }

// const city1 = describeCountry("Mexico", "6millones", "CDMX");
// const city2 = describeCountry("Peru", "7millones", "Lima");
// const city3 = describeCountry("Argentina", "8millones", "Buenos Aires");
// console.log(city1);
// console.log(city2);
// console.log(city3);

// //function declaration
// function percentageOfWorld1(population) {
//   return (population / 7900) * 100;
// }
// console.log(percentageOfWorld1(144));
// console.log(percentageOfWorld1(155));
// console.log(percentageOfWorld1(166));
// //function expression
// const percentageOfWorld2 = function (population) {
//   return (population / 7900) * 100;
// };
// console.log(percentageOfWorld2(144));
// console.log(percentageOfWorld2(155));
// console.log(percentageOfWorld2(166));
// // Arrow function
// const percentageOfWorld3 = (population) => (population / 7900) * 100;
// console.log(percentageOfWorld3(144));
// console.log(percentageOfWorld3(155));
// console.log(percentageOfWorld3(166));

// function describePopulation(country, population) {
//   const avg = percentageOfWorld1(population);
//   return `${country} has ${population}million people, wich is about ${avg}% of the world`;
// }

// console.log(describePopulation("México", 1000));
// console.log(describePopulation("Argentina", 1020));
// console.log(describePopulation("Chile", 1080));
/* coding challenge 1*/

// const calcAvg = (score1, score2, score3) => {
//   return (score1 + score2 + score3) / 3;
// };

// const avgDolphines1 = calcAvg(44, 23, 71);
// const avgKoalas1 = calcAvg(65, 54, 49);

// const avgDolphines2 = calcAvg(85, 54, 41);
// const avgKoalas2 = calcAvg(23, 34, 27);

// const checkWinner = function (avgDolphines, avgKoalas) {
//   if (avgDolphines >= avgKoalas * 2) {
//     console.log(`Dolphines win (${avgDolphines} vs ${avgKoalas})`);
//   } else if (avgKoalas >= avgDolphines * 2) {
//     console.log(`Koalas win (${avgKoalas} vs ${avgDolphines})`);
//   } else {
//     console.log("no one win");
//   }
// };

// checkWinner(avgDolphines1, avgKoalas1);
// checkWinner(avgDolphines2, avgKoalas2);

/* mini challs */
// const population = [1000, 2000, 3000, 500];
// console.log(population.length === 4);
// const percentages = [
//   percentageOfWorld1(population[0]),
//   percentageOfWorld1(population[1]),
//   percentageOfWorld1(population[2]),
//   percentageOfWorld1(population[3]),
// ];
// console.table(percentages);

// const neighbours = ["USA", "Guatemala", "Belice"];
// neighbours.push("Utopia");
// console.log(neighbours);
// neighbours.pop();
// console.log(neighbours);
// if (!neighbours.includes("Germany"))
//   console.log("Probably not a central European country");
// neighbours[0] = "EUA";
// console.log(neighbours);

// /*coding challenge*/
const calcTip = function (bill) {
  if (bill >= 50 && bill <= 300) {
    return bill * 0.15;
  } else {
    return bill * 0.2;
  }
};

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
// console.table(tips);
// console.table(totals);

// const jonas = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   age: 46,
//   job: "Teacher",
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriverLincense: true,
//   info: function () {
//     return this.hasDriverLincense
//       ? `${this.firstName} is a ${this.age}-years old teacher, and he has a driver's license`
//       : `${this.firstName} is a ${this.age}-years old teacher, and he has no driver's license`;
//   },
// };

// console.log(jonas.info());

// /* coding challenge*/
// const mark = {
//   firstName: "Mark",
//   lastName: "Miller",
//   markWeight: 78,
//   markheight: 1.69,
//   calcBMI: function () {
//     this.bmi = this.markWeight / this.markheight ** 2;
//     return this.markWeight / this.markheight ** 2;
//   },
// };
// const john = {
//   firstName: "John",
//   lastName: "Smith",
//   johnWeight: 78,
//   johnheight: 1.69,
//   calcBMI: function () {
//     this.bmi = this.johnWeight / this.johnheight ** 2;
//     return this.johnWeight / this.johnheight ** 2;
//   },
// };

// console.log(
//   john.bmi > mark.bmi
//     ? `${john.firstName}'s BMI (${john.calcBMI()}) is higher than ${
//         mark.firstName
//       }'s (${mark.calcBMI()})`
//     : `${mark.firstName}'s BMI (${mark.calcBMI()}) is higher than ${
//         john.firstName
//       }'s (${john.calcBMI()})`
// );

/* final coding challenge */
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(tips[i] + bills[i]);
}

const calcAvg = function (arr) {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i];
  }
  return suma / arr.length;
};

console.log("---------tips");
console.log(tips);
console.log("------------totals");
console.log(totals);
console.log("----------------avg bills");
console.log(calcAvg(bills));
