import { IOrder } from "../interfaces/order.interface";
import { IProduct } from "../interfaces/product.interface";

export class Order implements IOrder {
    public date: Date;
    constructor(
        public products: Array<IProduct>,
        public userName: string,
        public phone: string,
        public city: string,
        public street: string,
        public house: string,
        public flat: string,
        public totalPrice: number,
        public comments: string,
    ){
        this.date =  new Date();
    }
}