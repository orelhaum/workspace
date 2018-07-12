// función decoradora
const timer = (target, name, descriptor) => {
  // referencia a la función
  let fn = descriptor.value
  // modificador de la función que se decora
  let result;
  descriptor.value = function () {
    console.time(name)  // no visualiza nada por pantalla
    console.log("Antes de ejecutar la función que se decora")
    result = fn.apply(this, arguments)
    console.log("Después de ejecutar la función que se decora")
    console.timeEnd(name) // grow: 2.912ms
    return result;
  }
  // aplica la propiedad
  Object.defineProperty(target, name, descriptor);
}

// clase que será decorada
class Person {
  constructor (first = '', last = '') {
    this.first = first
    this.last = last
    this.age = 0
  }

  @timer
  greeting () {
    return `Hola, soy ${this.first} ${this.last}`
  }
  
  // decoración
  @timer
  grow (age) {
    console.log("Dentro de la función que se decora");
    for (let i = 0; i < age; i++) {
      this.age = i
    }
  }
}

const p = new Person('Marcos Arias')
console.log(p.greeting());
p.grow(99)