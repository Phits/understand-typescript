// Intersection Types
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Fitz',
    privileges: ['create-ui'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Type Guards check if property or method exists before using
// Function Overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('John', 'Fitz');
result.split(' ');

// Optional Chaining
const fetchUserData = {
    id: 'ul',
    name: 'FItz',
   //job: {title: 'UI Developer', description: 'Sendflex'}
};
// console.log(fetchUserData?.job.title);

// Nullish Coalescing
const userInput = undefined;

const storedData = userInput ?? 'DEFAULT'; // If null or undefined
console.log(storedData);

// type UnknownEmployee = Employee | Admin;
//
// function printEmployeeInformation(emp: UnknownEmployee) {
//     console.log('Name: ', emp.name);
//
//     if ('privileges' in emp) {
//         console.log('Privileges: ', emp.privileges);
//     }
//     if ('startDate' in emp) {
//         console.log('Start Date: ', emp.startDate);
//     }
// }
//
// printEmployeeInformation(e1);
// printEmployeeInformation({name: 'Lou', startDate: new Date()});
//
// class Car {
//     drive() {
//         console.log('Driving');
//     }
// }
//
// class Truck {
//     drive() {
//         console.log('Trucking');
//     }
//
//     loadCargo(amount: number) {
//         console.log('Loading cargo ', amount);
//     }
// }
//
// type Vehicle = Car | Truck;
//
// const v1 = new Car;
// const v2 = new Truck;
//
// function useVehicle(vehicle: Vehicle) {
//     vehicle.drive();
//     // if ('loadCargo' in vehicle) {
//     //     vehicle.loadCargo(1000);
//     // }
//     if (vehicle instanceof Truck) {
//         vehicle.loadCargo(1000);
//     }
// }
//
// useVehicle(v1);
// useVehicle(v2);
//
// // Discriminated Unions
// interface Bird {
//     type: 'bird';
//     flyingSpeed: number;
// }
//
// interface Horse {
//     type: 'horse',
//     runningSpeed: number;
// }
//
// type Animal = Bird | Horse;
//
// function moveAnimal(animal: Animal) {
//     let speed;
//    switch (animal.type) {
//        case 'bird':
//            speed = animal.flyingSpeed;
//            break;
//        case 'horse':
//            speed = animal.runningSpeed;
//            break;
//    }
//     console.log('Moving with speed: ', speed);
// }
//
// moveAnimal({type: 'bird', flyingSpeed: 20});
// moveAnimal({type: 'horse', runningSpeed: 30});
//
// // Type Casting
//
// // Option One
// // const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; // ! could be null
// // Option Two Similar to React
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
//
// userInputElement.value = 'Hi There';
//
// // Index Properties
// interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character'}
//     [prop: string]: string
// }
//
// const errorBag: ErrorContainer = {
//     email: 'Not a valid email',
//     username: 'Must start with a capital character!'
// }

















