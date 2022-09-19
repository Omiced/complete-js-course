"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className) {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>POP ${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>LANG ${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>CUR ${data.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};
/* old way asynchronus
///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>POP ${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>LANG ${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>CUR ${data.currencies[0].name}</p>
//     </div>
//   </article>`;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData("mexico");
// callback hell

// const renderCountry = function (data, className) {
//   const html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>POP ${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>LANG ${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>CUR ${data.currencies[0].name}</p>
//     </div>
//   </article>`;
//   countriesContainer.insertAdjacentHTML("beforeend", html);
//   countriesContainer.style.opacity = 1;
// };
// const getCountryAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     // render country 1
//     renderCountry(data);
//     //get neighbour country
//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// getCountryAndNeighbour("mexico");
*/

/* new way asynchronus */
// const request = fetch(`https://restcountries.com/v2/name/mexico`);
// console.log(request);
//consumiendo promesas dadas por fetch
/*modo no refactorizado
const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0]; //obteniendo borders si el pais actual tiene.
      if (!neighbour) return;
      //country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => renderError(`something went wrong ${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener("click", () => {
  getCountryData("mexico");
}); */

const getJSON = function (url, errorMessage = "Somthing went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
};

/* modo refactorizado con getJSON 
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0]; //obteniendo borders si el pais actual tiene.
      if (!neighbour) throw new Error("Neighbour not found");
      //country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => renderError(`something went wrong ${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener("click", () => {
  getCountryData("mexico");
});

getCountryData("australia");
*/
/* coding charenji 
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((response) => {
      if (!response.ok) throw new Error("Too many request");
      return response.json();
    })
    .then((data) => {
      const country = data.country;
      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]))
    .catch((err) => renderError(`something went wrong ${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.381);
*/

/* creando una promesa 
const lotteryPromise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You win mony");
    } else {
      reject(new Error("You lost your mony"));
    }
  }, 2000);
});

lotteryPromise.then((res) => console.log(res));

//promisifying setTimeout
const wait = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log("Espere 2 segundos perro");
    return wait(1);
  })
  .then(() => console.log("yo espere un segundo xd"));
*/

/* haciendo una promesa con la api de geolocalización

const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition((position) => resolve(position), err => reject(err));
    //modo más optimizado
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//modificando el coding charenji para usar las coordenadas obtenidas de esta promesa
const whereAmI = function () {
  //primero obtenemos la promesa llamando la función.
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      //retornamos la nueva promesa del fetch
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Too many request");
      return response.json();
    })
    .then((data) => {
      const country = data.country;
      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]))
    .catch((err) => renderError(`something went wrong ${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", whereAmI);
*/
/* coding charenji 2
//1 crear una promesa que genere un elemento img y la función tome el path a la img como argumento+
const wait = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};
const imagesContainer = document.querySelector(".images");
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = imgPath;
    img.addEventListener("load", () => {
      imagesContainer.appendChild(img);
      resolve(img);
    });
    img.addEventListener("error", () => reject(new Error("Image not found")));
  });
};

let currentImg;
createImage("img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    return wait(2);
  })
  .then(() => (currentImg.style.display = "none"))
  .catch((err) => console.error(err));
*/

/* async await */
//función para obetener la geolocalización
const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition((position) => resolve(position), err => reject(err));
    //modo más optimizado
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//estructura de una función asincrona usando async/await
const whereAmI = async function () {
  //obteniendo posición
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  //aplicamos geolocalización inversa y almacenamos la respuesta
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  //obteniendo los datos de la respuesta
  const dataGeo = await resGeo.json();
  console.log(dataGeo);
  //cuando se usa async/await la respuesta de la promesa es retornada de inmediato en el await
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  );
  const data = await res.json();
  renderCountry(data[0]);
};

whereAmI();
console.log("probando que es asincrono");
