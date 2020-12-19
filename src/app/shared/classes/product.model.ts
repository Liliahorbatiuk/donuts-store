import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
    constructor(
        public id: number | string,
        public name: string,
        public description: string,
        public weight: string,
        public price: number,
        public image: string,
        public count: number = 1,
    ){}
}