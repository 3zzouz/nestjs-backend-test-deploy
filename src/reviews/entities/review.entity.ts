import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, max: 5 })
  note: number;

  @Prop()
  comment: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'courses', required: true })
  course: Types.ObjectId;
}
export const reviewSchema = SchemaFactory.createForClass(Review);
