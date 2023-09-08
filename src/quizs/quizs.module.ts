import { Module } from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { QuizsController } from './quizs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { quizSchema } from './entities/quiz.entity';
import { quizCourSchema } from 'src/quizscours/entities/quizscour.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'quizs', schema: quizSchema }]),
  ],
  controllers: [QuizsController],
  providers: [QuizsService],
})
export class QuizsModule {}
