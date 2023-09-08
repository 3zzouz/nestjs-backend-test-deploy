import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizscourDto } from './create-quizscour.dto';

export class UpdateQuizscourDto extends PartialType(CreateQuizscourDto) {}
