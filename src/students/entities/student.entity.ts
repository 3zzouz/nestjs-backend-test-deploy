import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type StudentDocument = HydratedDocument<Student>
@Schema({timestamps:true})
export class Student {
    role:string
    
    @Prop({required:true})
    level:string

    @Prop({minlength:6,maxlength:6,unique:true,required:true})
    cin:string
}
export const studentSchema = SchemaFactory.createForClass(Student)