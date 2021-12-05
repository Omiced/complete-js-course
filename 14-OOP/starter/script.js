"use strict";
/*constructor y metodos 
//creando constructor
const Person = function (firstName, year) {
  //instance properties
  this.firstName = firstName;
  this.year = year;
};
//instanciado person para crear un objeto
const josue = new Person("Josue", 1993);
console.log({ josue });

//prototypes
//agregando un método al prototype de la función contructor
Person.prototype.calcAge = function () {
  console.log(2037 - this.year);
};
console.log(Person.prototype);
//probando
josue.calcAge();
//viendo el proto de un objeto
console.log(josue.__proto__);
//probando que Person.prototype no es el prototype de person
console.log(Person.prototype.isPrototypeOf(josue));
console.log(Person.prototype.isPrototypeOf(Person));
//agregando propiedades al prototype
Person.prototype.species = "Homo Sapiens";
console.log(josue.species);
*/
/* coding carenji 1
//1.- hacer un constructor carro, propiedades velocidad y marca
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
//2.- método acelerar incrementa la velcidad en 10
Car.prototype.accelerate = function () {
  const accelerateSpeed = this.speed + 10;
  console.log({ accelerateSpeed });
};
//3.- método brake incrementa velocidad en 5
Car.prototype.brake = function () {
  const brakeSpeed = this.speed + 5;
  console.log({ brakeSpeed });
};
//4.- crear dos objetos carro y probar
const car1 = new Car("BMW", 120);
const car2 = new Car("Mercedes", 95);
car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();
*/
/* class Person
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //métodos
  calAge() {
    console.log(2037 - this.birthYear);
  }
  //Set a property that already exists
  set fullName(name) {
    // se agrega un guion bajo por convención para evitar bug por mismo nombre de propiedad
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  //getter de fullName
  get fullName() {
    return this._fullName;
  }
  //static mhetod
  static hey() {
    return console.log("que onda perro");
  }
}

const walter = new PersonCl("Walter White", 1980);
PersonCl.hey();
*/

/* coding charenji 2
//1.- recrear el challenge 1 pero con clase
class CarCl {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  accelerate() {
    const accelerateSpeed = this.speed + 10;
    console.log({ accelerateSpeed });
  }

  brake() {
    const brakeSpeed = this.speed + 5;
    console.log({ brakeSpeed });
  }
}

const mustang = new CarCl("ford", 200);
console.log(mustang.speed);
mustang.accelerate();
mustang.brake();
mustang.speedUS = 10;
console.log(mustang);
*/
/* herencia entre clases con funciones constructoras
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
//constructor Student
const Student = function (firstName, birthYear, course) {
  //llama y linkea el this a la función Person
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course} `);
};

const mike = new Student("Mike", 2000, "Computer Science");
//como se ligo el prototype podemos acceder al método calcAge con el objeto instanciado de Student
mike.introduce();
mike.calcAge();
//areglando el constructor para que apunte a student
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/
/* coding charenji 3 
//1.- hacer una clase constructora para un carro electrico hija de la clase car
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  const accelerateSpeed = this.speed + 10;
  console.log({ accelerateSpeed });
};
Car.prototype.brake = function () {
  const brakeSpeed = this.speed + 5;
  console.log({ brakeSpeed });
};
//clase hija
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
//linking the prototype
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;
// 2.- Hacer un setter que fije la carga
EV.prototype.chargeTo = function (chargeTo) {
  this.charge = chargeTo;
};
//3.- método accelerate que incrementa la velocidad en 20 y disminuye en 1 la bateria
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};
// 4.-  crear objeto y probar
const bocho = new Car("Bocho", 120);
const tesla = new EV("Tesla", 120, 23);
tesla.accelerate();
bocho.accelerate();
tesla.chargeTo(90);
tesla.accelerate();
*/
/* herencia entre classes con es6 sintax 
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //métodos
  calAge() {
    console.log(2037 - this.birthYear);
  }
  //Set a property that already exists
  set fullName(name) {
    // se agrega un guion bajo por convención para evitar bug por mismo nombre de propiedad
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  //getter de fullName
  get fullName() {
    return this._fullName;
  }
  //static mhetod
  static hey() {
    return console.log("que onda perro");
  }
}
//clase hija
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //siempre tiene que ir primero
    super(fullName, birthYear);
    this.course = course;
  }
}
const marta = new StudentCl("Marta Perez", 2000, "hola");
marta.calAge();
*/

/*  otro ejemplo de clases 
class Account {
  //public fields
  locale = navigator.language;
  //private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //declarando una propiedad no pasada por parametro
    //con el guin bajo decimos que no se debe manipular por fuera de la clase
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`gracias por abrirse una cuenta ${owner}`);
  }
  //public methods interface
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requesLoan(val) {
    if (this.#approvedLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
      return this;
    }
  }

  //private methods
  #approvedLoan(val) {
    return true;
  }
}

const acc1 = new Account("Josue", "MXN", 1111);
acc1.deposit(1200);
acc1.withdraw(200);
acc1.requesLoan(1000);
//encadenando métodos gracias a retornar this
acc1.deposit(100).withdraw(200).requesLoan(1500);
console.log(acc1.getMovements());
*/
/* coding charenji 4*/
class CarCl {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  accelerate() {
    const accelerateSpeed = this.speed + 10;
    console.log({ accelerateSpeed });
  }

  brake() {
    const brakeSpeed = this.speed + 5;
    console.log({ brakeSpeed });
    return this;
  }
}
//1.- crear una clase EVCl hija de la clase CarCl
class EVCl extends CarCl {
  //2.- Hacer la propiedad charge privada.
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.#charge--;
    this.speed += 20;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const car1 = new EVCl("Rivian", 120, 23);
car1.chargeBattery(30).accelerate().brake();
