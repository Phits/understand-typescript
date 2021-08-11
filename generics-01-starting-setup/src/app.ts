// Generic Functions

// Built in Generics
// const names: Array<string> = []; // string[]
// // names[0].split(' ');
//
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done!');
//     }, 2000)
// });

// Creating a Generic Function
// Working with Constraints 'extends'
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({name: 'Fitz', hobbies: ['Sports']}, {age: 33});
console.log(mergeObj);

// Another Generic Function
interface Lengthy {
    length: number
}


function countAndDescribe<T extends Lengthy>(element: T) {
    let descriptionText =  'Got no value';
    if (element.length === 1) {
        descriptionText =  'Got 1 element';
    } else if (element.length > 1) {
        descriptionText =  'Got ' + element.length + ' elements';
    }
    return [element, descriptionText];
};

console.log( countAndDescribe(['Sports', 'Cooking']) );

// The "keyof" Constraint
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'Fitz'}, 'name'));

// Generic Classes
class DataStorage<T extends string | number | boolean> { // Will not accept objects
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Monkey');
textStorage.addItem('Tiger');
textStorage.removeItem('Monkey');
console.log(textStorage);

const numberStorage = new DataStorage<number>();

const objStorage = new DataStorage<object>();
// const fitzObject = {name: 'Fitz'};
objStorage.addItem({name: 'Fitz'});
objStorage.addItem({name: 'Beda'});
// ...
objStorage.removeItem({name: 'Fitz'});
console.log(objStorage.getItems());

// Generic Utility Types
// Partial
interface CourseGoal {
    title: string,
    description: string,
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date) {
    let courseGoal: Partial<CourseGoal> = {}; // Makes interface properties temporary optional
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
};

// Readonly
const names: Readonly<string[]> = ['Fitz', 'Beda'];
// names.push('Anne');
// names.pop('Anne');

// Generic Types vs Union Types














