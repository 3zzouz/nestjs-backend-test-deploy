import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Category {
    @Prop({required:true})
    file:string

    @Prop({required:true,unique:true})
    name:string

    @Prop([{type:SchemaTypes.ObjectId,ref:'courses'}])
    courses:Types.ObjectId[]
}

export const categorySchema = SchemaFactory.createForClass(Category)