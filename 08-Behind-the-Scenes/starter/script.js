"use strict";
// function calcAge(birthYear){
//     const age = 2037 - birthYear;
//     function printAge(){
//         const output = `You are ${age}, born in ${birthYear}`
//         console.log(output)
//     }
//     printAge();
//     return age;
// }
// const firstName = "josue";
// console.log(calcAge(1993));

// this keyword

//apuntara al padre, que en este caso al ser el webrowser
//sera window.
console.log(this);

//para funciones regulares this sera undefined por el modo estricto
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge(1993);
// en arrow functions  "this" regresa el objeto padre de la funcion, si esta en scope global regresara window
const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1990);
// dentro de métodos "this" será el objeto padre.
const josue = {
  year: 1993,
  calcAge: function () {
    console.log(this);
  },
};

josue.calcAge();
