import { Document } from 'mongoose';

export interface IStudent extends Document {
  readonly level: string;
  readonly cin: string;
}
