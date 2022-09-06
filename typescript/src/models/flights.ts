import { ObjectId } from "mongodb";

export default class Flight {
     constructor(
        public id: string,
        public name: string,
        public callsign: string,
        public country: string,
        public active: string
     ) {}
}