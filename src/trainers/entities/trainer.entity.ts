import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type TrainerDocument = HydratedDocument<Trainer>
@Schema({ timestamps: true })
export class Trainer {
  role:string
  @Prop({ minlength: 6, maxlength: 6, unique: true, required: true })
  cin: string;
}
export const trainerSchema = SchemaFactory.createForClass(Trainer);
