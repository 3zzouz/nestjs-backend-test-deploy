import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Quizscour {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'quizes', required: true })
  quiz: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'courses', required: true })
  course: Types.ObjectId;
}
export const quizCourSchema = SchemaFactory.createForClass(Quizscour);
