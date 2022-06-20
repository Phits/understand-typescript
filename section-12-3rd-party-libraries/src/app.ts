import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {Product} from "./product.model";
import {validate} from "class-validator";

const products = [
    { title: 'A Carpet', price: 29.99},
    { title: 'A Book', price: 10.99}
]

const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
    if (errors.length > 0) {
        console.log('Validation Errors!');
        console.log(errors);
    } else {
        console.log(newProd.getInformation());
    }
});

const loadedProducts = plainToClass(Product, products);

console.log(loadedProducts);

const p1 = new Product('A Book', 12.99);

console.log(p1.getInformation());
