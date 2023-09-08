import { Document } from "mongoose"///

export interface ICategory extends Document {
    readonly file:string
    readonly name:string
}