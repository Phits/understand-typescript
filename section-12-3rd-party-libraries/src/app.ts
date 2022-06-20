import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {Product} from "./product.model";

const products = [
    { title: 'A Carpet', price: 29.99},
    { title: 'A Book', price: 10.99}
]

const loadedProducts = plainToClass(Product, products);

console.log(loadedProducts);

const p1 = new Product('A Book', 12.99);

console.log(p1.getInformation());
