import { Document } from 'mongoose';

export interface IReview extends Document {
  readonly note: number;
  readonly comment: string;
  readonly course:string;
}
