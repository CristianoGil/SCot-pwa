import { IPerson } from "../model/person";

export class Person implements IPerson{
    id: number
    nif: number
    dt_nascimento: Date

    constructor(person: IPerson) {
        this.id = person.id
        this.nif = person.nif
        this.dt_nascimento = person.dt_nascimento
    }
    
    
    
}