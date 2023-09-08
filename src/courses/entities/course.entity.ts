import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  files: string[];

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  nbstudent: number;

  @Prop({ required: true })
  duree: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'categories',required:true })
  category: Types.ObjectId;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'sections' }])
  sections: Types.ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'reviews' }])
  reviews: Types.ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'quizcours' }])
  quizcourses: Types.ObjectId[];  
}

export const courseSchema = SchemaFactory.createForClass(Course);
