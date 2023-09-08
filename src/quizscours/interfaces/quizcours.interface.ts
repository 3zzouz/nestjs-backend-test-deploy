import { Document } from 'mongoose';

export interface IQuizCours extends Document {
  readonly quiz: string;
  readonly course: string;
}
