// const person: {
//     name: string,
//     age: number,
//     hobbies: string[],
//     role: [number, string] // Tuple, fixed-length array
// } = {
//     name: "John",
//     age: 33,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author']
// }

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {ADMIN, READ_ONLY, AUTHOR};

const person = {
    name: "John",
    age: 33,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
}

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

// person.role[1] = 10;

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map());; // !!! Error !!!
}

if (person.role === Role.ADMIN) {
    console.log('Is admin');
}
