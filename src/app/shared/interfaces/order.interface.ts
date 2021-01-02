import { IProduct } from "./product.interface";

export interface IOrder {
    products: Array<IProduct>;
    userName: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    flat?: string;
    totalPrice: number;
    comments?: string
    date: Date;
}