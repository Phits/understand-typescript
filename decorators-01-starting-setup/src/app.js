// A First Class Decorator
// function Logger(constructor: Function) {
//     console.log('Logging...');
//     console.log(constructor);
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// @Logger
// class Person {
//     name = 'Fitz';
//
//     constructor() {
//         console.log('Creating person object...');
//     }
// }
//
// const person = new Person();
//
// console.log(person);
// Decorator Factor
function Logger(logString) {
    console.log('Logger Factory');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// @Logger('Logging - Person')
// class Person {
//     name = 'Fitz';
//
//     constructor() {
//         console.log('Creating person object...');
//     }
// }
//
// const person = new Person();
//
// console.log(person);
// Building More Useful Decorators
// function WithTemplate(template: string, hookId: string) {
//     return function(_: Function) { // '_' means aware of it but don't need or use it
//         const hookEl = document.getElementById(hookId);
//         if (hookEl) {
//             hookEl.innerHTML = template;
//         }
//     }
// }
function WithTemplate(template, hookId) {
    console.log('Template Factory');
    // Returning (and changing) a Class in a Class Decorator
    // Only executes on instantiation
    return function (originalConstructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                console.log('Rendering Template');
                var hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = _this.name;
                }
                return _this;
            }
            return class_1;
        }(originalConstructor));
    };
}
// Adding Multiple Decorators
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Fitz';
        console.log('Creating person object...');
    }
    Person = __decorate([
        Logger('Logging'),
        WithTemplate('<h1>My Person Object</h1>', 'app')
    ], Person);
    return Person;
}());
var person = new Person();
console.log(person);
// Diving into Property Decorators
function Log(target, propertyName) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}
// Accessor Decorators
function Log2(target, name, description) {
    console.log('Accessor Decorator!');
    console.log(target);
    console.log(name);
    console.log(description);
}
// Method Decorator
function Log3(target, name, description) {
    console.log('Method Decorator!');
    console.log(target);
    console.log(name);
    console.log(description);
}
// Parameter Decorators
function Log4(target, name, position) {
    console.log('Parameter Decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
var Product = /** @class */ (function () {
    function Product(t, p) {
        this.title = t;
        this._price = p;
    }
    Object.defineProperty(Product.prototype, "price", {
        set: function (val) {
            if (val > 0) {
                this._price = val;
            }
            else {
                throw new Error('Invalid price, should be positive!');
            }
        },
        enumerable: false,
        configurable: true
    });
    Product.prototype.getPriceWithTax = function (tax) {
        return this._price * (1 + tax);
    };
    __decorate([
        Log
    ], Product.prototype, "title");
    __decorate([
        Log2
    ], Product.prototype, "price");
    __decorate([
        Log3,
        __param(0, Log4)
    ], Product.prototype, "getPriceWithTax");
    return Product;
}());
// When Do Decorators Execute
// All execute when you define the class
var p1 = new Product('Book', 19);
var p2 = new Product('Book ', 12);
// Creating an "Autobind Decorator
function Autobind(_, _2, descriptor) {
    console.log('Autobind Decorator!');
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
var Printer = /** @class */ (function () {
    function Printer() {
        this.message = 'This works';
    }
    Printer.prototype.showMessage = function () {
        console.log(this.message);
    };
    __decorate([
        Autobind
    ], Printer.prototype, "showMessage");
    return Printer;
}());
var p = new Printer();
var button = document.querySelector('button');
// button.addEventListener('click', p.showMessage.bind(p)); JavaScript method
button.addEventListener('click', p.showMessage.bind(p));
var registeredValidators = {};
function Required(target, propName) {
    var _a;
    var _b, _c;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = __spreadArray(__spreadArray([], ((_c = (_b = registeredValidators[target.constructor.name]) === null || _b === void 0 ? void 0 : _b[propName]) !== null && _c !== void 0 ? _c : [])), ['required']), _a));
}
function PositiveNumber(target, propName) {
    var _a;
    var _b, _c;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = __spreadArray(__spreadArray([], ((_c = (_b = registeredValidators[target.constructor.name]) === null || _b === void 0 ? void 0 : _b[propName]) !== null && _c !== void 0 ? _c : [])), ['positive']), _a));
}
function validate(obj) {
    var objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    var isValid = true;
    for (var prop in objValidatorConfig) {
        console.log(prop);
        for (var _i = 0, _a = objValidatorConfig[prop]; _i < _a.length; _i++) {
            var validator = _a[_i];
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
var Course = /** @class */ (function () {
    function Course(t, p) {
        this.title = t;
        this.price = p;
    }
    __decorate([
        Required
    ], Course.prototype, "title");
    __decorate([
        PositiveNumber
    ], Course.prototype, "price");
    return Course;
}());
var courseForm = document.querySelector('form');
courseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var titleEl = document.getElementById('title');
    var priceEl = document.getElementById('price');
    var title = titleEl.value;
    var price = +priceEl.value;
    var createCourse = new Course(title, price);
    if (!validate(createCourse)) {
        alert('Invalid input, please try again');
    }
    console.log('Create Course ', createCourse);
});
