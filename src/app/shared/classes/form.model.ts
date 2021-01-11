import { IForm } from "../interfaces/form.interface";

export class Form  implements IForm {
    constructor(
        public name: string,
        public phone: string
    ){}
}