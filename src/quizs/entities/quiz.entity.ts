import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true, unique: true })
  question: string;

  @Prop({ required: true })
  rep1: string;

  @Prop({ required: true })
  rep2: string;

  @Prop()
  rep3: string;

  @Prop({ required: true })
  answer: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'quizcours' }])
  quizcourses: Types.ObjectId[];
}
export const quizSchema = SchemaFactory.createForClass(Quiz);
