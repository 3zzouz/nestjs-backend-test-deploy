import { Document } from 'mongoose';

export interface ISection extends Document {
  readonly file: string;
  readonly description: string;
  readonly skills: string[];
  readonly title: string;
  readonly course: string;
}
