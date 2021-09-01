// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/* Entender el problema: ya */
//¿Cómo concateno un string con los valores de un array?:
// usando template strings
// ¿Cómo obtengo los valores del array y sus indices?:
// con un ciclo for
const printForecast = function (arr) {
  let strSalida = "";
  for (let i = 0; i < arr.length; i++) {
    strSalida += `... ${arr[i]}°C in ${i} days`;
  }
  return strSalida + "...";
};

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
