// const userName = 'Fitz';
//
// let age = 30;
//
// age = 29;

// function add(a: number, b: number) {
//     let result = a + b;
//     return result
// }

// console.log(result);

// Arrow Function
// const add = (a: number, b: number = 1) =>  a + b;

const printOutput: (a: string | number) => void = output =>  console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

// printOutput(add(5));

const hobbies = ['Gardening', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);
console.log(activeHobbies);

const person = {
    firstName: 'Fitz',
    age: 33
}

const copiedPerson = { ...person };

// Rest Parameters
const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0)
};

const addNumbers = add(1, 2, 3, 4, 5);
console.log(addNumbers);

// Destructuring Arrays
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

// Destructuring Objects
const { firstName: userName, age } = person;

console.log(userName, age);














