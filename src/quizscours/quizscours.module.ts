import { Module } from '@nestjs/common';
import { QuizscoursService } from './quizscours.service';
import { QuizscoursController } from './quizscours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { quizCourSchema } from './entities/quizscour.entity';
import { quizSchema } from 'src/quizs/entities/quiz.entity';
import { courseSchema } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'quizcours', schema: quizCourSchema }]),
    MongooseModule.forFeature([{ name: 'quizs', schema: quizSchema }]),
    MongooseModule.forFeature([{ name: 'courses', schema: courseSchema }]),
  ],
  controllers: [QuizscoursController],
  providers: [QuizscoursService],
})
export class QuizscoursModule {}
