import { IOrder } from "./order.interface";

export interface IProfile {
    email: string;
    userName: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    flat?: string;
    orders: Array<IOrder>;
    role: string;
}