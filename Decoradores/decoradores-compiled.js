"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

// función decoradora
var timer = function timer(target, name, descriptor) {
  // referencia a la función
  var fn = descriptor.value;
  // modificador de la función que se decora
  var result = void 0;
  descriptor.value = function () {
    console.time(name); // no visualiza nada por pantalla
    console.log("Antes de ejecutar la función que se decora");
    result = fn.apply(this, arguments);
    console.log("Después de ejecutar la función que se decora");
    console.timeEnd(name); // grow: 2.912ms
    return result;
  };
  // aplica la propiedad
  Object.defineProperty(target, name, descriptor);
};

// clase que será decorada
var Person = (_class = function () {
  function Person() {
    var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var last = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Person);

    this.first = first;
    this.last = last;
    this.age = 0;
  }

  _createClass(Person, [{
    key: "greeting",
    value: function greeting() {
      return "Hola, soy " + this.first + " " + this.last;
    }

    // decoración

  }, {
    key: "grow",
    value: function grow(age) {
      console.log("Dentro de la función que se decora");
      for (var i = 0; i < age; i++) {
        this.age = i;
      }
    }
  }]);

  return Person;
}(), (_applyDecoratedDescriptor(_class.prototype, "greeting", [timer], Object.getOwnPropertyDescriptor(_class.prototype, "greeting"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "grow", [timer], Object.getOwnPropertyDescriptor(_class.prototype, "grow"), _class.prototype)), _class);


var p = new Person('Marcos Arias');
console.log(p.greeting());
p.grow(99);
