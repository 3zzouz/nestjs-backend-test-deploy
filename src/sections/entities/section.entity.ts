import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true, unique: true })
  file: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  skills: string[];

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'courses', required: true })
  course: Types.ObjectId;
}
export const sectionSchema = SchemaFactory.createForClass(Section);
