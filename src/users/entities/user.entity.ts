import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { HydratedDocument } from 'mongoose';
import { Student } from 'src/students/entities/student.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export type UserDocument = HydratedDocument<User>
@Schema({ timestamps: true, discriminatorKey: 'role' })
export class User {
  @Prop({ type: String, required: true, enum: [Trainer.name, Student.name] })
  role: string;

  @Prop({ required: false })
  file: string;

  @Prop()
  cin: string;

  @Prop()
  level: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  address: string;
  
  @Prop()
  refreshToken:string
}

export const userSchema = SchemaFactory.createForClass(User).pre(
  'save',
  async function () {
    this.password = await argon2.hash(this.password);
  },
);
