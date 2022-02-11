// A First Class Decorator
// function Logger(constructor: Function) {
//     console.log('Logging...');
//     console.log(constructor);
// }

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
function Logger(logString: string) {
    console.log('Logger Factory');
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
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
function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory');
    // Returning (and changing) a Class in a Class Decorator
    // Only executes on instantiation
    return function <T extends { new(...args: any[]): { name: string } }>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering Template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// Adding Multiple Decorators
@Logger('Logging')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Fitz';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();

console.log(person);

// Diving into Property Decorators
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

// Accessor Decorators
function Log2(target: any, name: string, description: PropertyDescriptor) {
    console.log('Accessor Decorator!');
    console.log(target);
    console.log(name);
    console.log(description);
}

// Method Decorator
function Log3(target: any, name: string | Symbol, description: PropertyDescriptor) {
    console.log('Method Decorator!');
    console.log(target);
    console.log(name);
    console.log(description);
}

// Parameter Decorators
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter Decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price, should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

// When Do Decorators Execute
// All execute when you define the class
const p1 = new Product('Book', 19);
const p2 = new Product('Book ', 12);

// Creating an "Autobind Decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    console.log('Autobind Decorator!');
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage.bind(p)); JavaScript method
button.addEventListener('click', p.showMessage.bind(p));

// Validation with Decorators - First Steps
interface ValidatorConfig {
    [property: string]: {
        [validableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
 registeredValidators[target.constructor.name] = {
     ...registeredValidators[target.constructor.name],
     [propName]: ['required']
 };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive' :
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createCourse = new Course(title, price);

    if (!validate(createCourse)) {
        alert('Invalid input, please try again');
    }

    console.log('Create Course ', createCourse);
});
















