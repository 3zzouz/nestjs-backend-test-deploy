import { Document } from "mongoose";

export interface ICourse extends Document{
    readonly files:string[]
    readonly title:string
    readonly price:number
    readonly trainer:string
    readonly nbstudent:number
    readonly duree:string
    readonly category:string
}