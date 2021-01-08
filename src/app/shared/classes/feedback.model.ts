import { IFeedback } from "../interfaces/feedback.interface";

export class Feedback implements IFeedback {
    constructor(
        public id: string | number,
        public name: string,
        public date: Date,
        public grade: string,
        public description: string,
        public image: string,
    ){}
}