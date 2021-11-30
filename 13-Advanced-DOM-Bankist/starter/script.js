"use strict";

///////////////////////////////////////
// variables
const allSections = document.querySelectorAll(".section");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const dotsContainer = document.querySelector(".dots");
const header = document.querySelector(".header");
//imagenes lazy loading con srcselector
const imgTargets = document.querySelectorAll("img[data-src]");
const modal = document.querySelector(".modal");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector("#section--1");
const slides = document.querySelectorAll(".slide");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// Modal window////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//nueva forma con for each
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// //viejo método con for
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
//btn scrolling
// smooth scrolling
btnScrollTo.addEventListener("click", function () {
  /* the old way
  //obtener coordenadas de a donde vamos
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log("current scroll x/y", window.pageXOffset, window.pageYOffset);
  //scrolling
  //sumando offsetX para que siempre se mueva a la misma posicion.
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  //para un smoot scroll se usa un objeto como argumento
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  }); 
  */
  //nuevo modo super pro alv
  section1.scrollIntoView({ behavior: "smooth" });
});
///page navigation///////////////////////////////////////
//modo no óptimo.
//document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     // para que no se muevan por efecto de su etiquta html
//     e.preventDefault();
//     //obtenemos la ruta relativa, y seleccionamos el elemento con base en su href
//     const id = el.getAttribute("href");
//     //con base en el id obtenido seleccionamos el elemento al que deseamos ir.
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });
//modo mamalon con event delegation
//1. agregando listener a un padre en común
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains("nav__link")) {
    //obtener id para trabajar el evento
    const id = e.target.getAttribute("href");
    //desencadenar evento con el id obtenido
    if (id != "#")
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
//tabed component ///////////////////
//delegación de eventos y viaje por el dom al mismo tiempo
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  //matching strategy
  const clicked = e.target.closest(".operations__tab");
  //guard clause
  if (!clicked) return;
  //remover active de las demás tabs
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  //agregar active a la tab clickeada alv.
  clicked.classList.add("operations__tab--active");
  //activando las areas de las tabs
  //eliminando active del contenido
  tabsContent.forEach((cont) =>
    cont.classList.remove("operations__content--active")
  );
  //seleccionando el elemento obtenido por el dataset de cada tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
//menu fade animation ////////////////////
const handleHover = function (e) {
  //matching strategy
  if (e.target.classList.contains("nav__link")) {
    //obteniendo los desencadenadores de eventos y los afectados
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    //modificando opacidad
    siblings.forEach((sib) => {
      if (sib != link) sib.style.opacity = this;
    });
    //se pone this porqué usamos bind para fijarlo al valor deseado.
    logo.style.opacity = this;
  }
};
//pasando un argumento a un handler con bind
nav.addEventListener("mouseover", handleHover.bind(0.5));
//evento asociado a mouse over, para la salida.
nav.addEventListener("mouseout", handleHover.bind(1));

//stiky navigation ////////////////
/* método viejo
1.  obtener coordenada inicial, de la sección 1
//const initialCoords = section1.getBoundingClientRect();
//2. añadir el aventosky
// window.addEventListener("scroll", function () {
//   //comparar coordenadas de la ventana y de la section
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });
*/
//sticky con observer
//function example
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => console.log(entry));
// };

//obteniendo height del elemento para usar en rootMargin dinamicamente
const navHeight = nav.getBoundingClientRect().height;
//función de callback
const stickyNav = function (entries) {
  //destructuring para obtener solo el primer elemento
  const [entry] = entries;
  //cuando no este interseccionado activamos sticky
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const obsOptions = {
  root: null, //para ver como el elemento observaod intersecciona el viewport
  threshold: 0, // threshold de 0 para desencadenar la función cuando el header ya no sea visible
  rootMargin: `-${navHeight}px`, //margen al threshold
};

//creando nuevo objeto observador
const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

//revelando secciones con IntersectionObserver API/////////////
//función callback
const revealSection = function (entries, observer) {
  const [entry] = entries; //destructuramos las entries
  //guard clause
  //si una entrada no ha sido intersectada no hace na
  if (!entry.isIntersecting) return;
  // se activa cuando una entrada fue intersectada
  entry.target.classList.remove("section--hidden");
  //desactivando el observer
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, //observar all the viewport
  threshold: 0.15, //revelar al 15%
});
//asignando observer y clase a todas las secciones
allSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

//lazy loading////////////////////////
//callback function
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //guard clause
  if (!entry.isIntersecting) return;
  //cambiando la imagen de baja calidad por la buena
  entry.target.src = entry.target.dataset.src;
  //escuchando el evento load para quitar el blur y que se vea mamalon
  entry.target.addEventListener("load", () =>
    entry.target.classList.remove("lazy-img")
  );
  //dejando de observar
  observer.unobserve(entry.target);
};
//observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null, //observa todo el viwerport
  threshold: 0,
  rootMargin: "100px", //para que carguen antes de que el usuario se de cuenta
});
//observando cada imagen seleccionada
imgTargets.forEach((img) => imgObserver.observe(img));
//////slider/////////////////////
//botones
const slider = function () {
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  //bandera
  let currentSlide = 0;
  //bandera para no seguir avanzando cuando sea la ultima slide
  const maxSlide = slides.length - 1;
  //cada imagen siguiente esta 100% más a lado de la anterior, por eso al multiplicar
  // 0 por el index obtenemos el translate adecuado.
  //0, 100%, 200%, ..., n%;
  //función para crear los btn Dots
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}""></button>`
      );
    });
  };
  //funcion para mover las slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  //dot activo
  const activateDot = function (slide) {
    //primero desactivar el estado activo de todos los btn para evitar bugs
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    //agregando clase activate, con base en el dataset
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  //función para moverse a la derecha
  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  //función a la izquierda
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  //función de estado inicial
  const init = function () {
    createDots();
    //en 0's para inicializar
    goToSlide(0);
    activateDot(0);
  };
  init();
  //event handlers
  //-100%, 0, 100%, ... lógica de movimiento
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  //eventos con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });
  //evento de los dots, usando event delegation
  dotsContainer.addEventListener("click", function (e) {
    //matching strategy
    if (e.target.classList.contains("dots__dot")) {
      //con destructuring al obtenemos el número de slide del data set
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////cosas de práctica abajo////////////////////////////////////////////////////
/*selecting elements
// console.log(document.documentElement); // selecciona todo el html
// console.log(document.body); // selecciona solo el body
// console.log(document.head); // selecciona solo el head

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section"); // devuelve una nodeList

// document.getElementById("section--1");
// const allButtons = document.getElementsByTagName("button"); //devuelve un html collection
// console.log(allButtons);

//creating and inserting elements
const message = document.createElement("div"); //creamos un div, que aún no insertamos al dom
message.classList.add("cookie-message");
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
// header.prepend(message); // pone como primer hijo
// header.append(message.cloneNode(true)); // clona el nodo
header.append(message); //pone como ultimo hijo
//delete elements
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();
});

//styles
message.style.backgroundColor = "#37383d";
message.style.width = "100%";

//cambiando heigth con getComputedStyle
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//cambiando una variable de css con js
// document.documentElement.style.setProperty("--color-primary", "orangered");
*/

/*atributos estandar
const logo = document.querySelector(".nav__logo");

logo.alt = "Beatiful minimalist logo";
console.log(logo.alt);

//atributos no estandar
logo.setAttribute("designer", "cano");
console.log(logo.getAttribute("designer"));

//rutas
console.log(logo.src);
console.log(logo.getAttribute("src"));
*/

/* event handlers 
const h1Alert = (e) => {
  alert("hola perro new");
  h1.removeEventListener("mouseenter", h1Alert); // remueve el evento después de ser activado una vez
};
const h1 = document.querySelector("h1");
h1.addEventListener("mouseenter", h1Alert);

//clasic shit old way
// h1.onmouseenter = (e) => {
//   alert("hola perro clasico ");
// };

*/

/* ejemplo event propagation 
//primero un generador de cores rgb random
const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("link", e.target, e.currentTarget);
  //this apunta al current target siempre
  //stop propagation
  e.stopPropagation();
});
document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("links", e.target, e.currentTarget);
  //this apunta al current target siempre
});
document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("nav", e.target, e.currentTarget);
  //this apunta al current target siempre
});
*/
/* viajando por el dom (dom traversing) 
const h1 = document.querySelector("h1");
//vijando para abajo: Hijos
console.log(h1.querySelector(".highlight")); //usando el clasico querySelector
console.log(h1.childNodes); //devuelve todos los hijos incluso texto
console.log(h1.children); //devuelve una html collection
h1.firstElementChild.style.color = "white"; //solo modifica el primer elemento hijo
h1.lastElementChild.style.color = "black"; //solo modifica el ultimo elemento hijo

//viajando hacía arriba: Padres
console.log(h1.parentNode);
console.log(h1.parentElement);
//selecciona un padre en el dom
h1.closest(".header").style.background = "var(--gradient-secondary)";

//viajando a los lados: Hermanos
//elementos
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
//nodos
console.log(h1.previousSibling);
console.log(h1.nextSibling);
//obtener todos los hermanos alv
console.log(h1.parentElement.children);
*/
