const userName = 'Fitz';

let age = 30;

age = 29;

// function add(a: number, b: number) {
//     let result = a + b;
//     return result
// }

// console.log(result);

// Arrow Function
const add = (a: number, b: number) =>  a + b;

const printOutput: (a: string | number) => void = output =>  console.log(output);


printOutput(add(5, 3));
