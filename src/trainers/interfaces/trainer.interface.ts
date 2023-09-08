import { Document } from 'mongoose';

export interface ITrainer extends Document {
  readonly cin: string;
}
