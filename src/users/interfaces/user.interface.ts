import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly file: string;
  readonly fullName: string;
  readonly userName: string;
  readonly email: string;
  readonly phone: number;
  readonly city: string;
  readonly address: string;
  readonly password: string;
  readonly refreshToken: string;
  readonly role: string;
  readonly cin:string;
  readonly level:string;
}
