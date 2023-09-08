import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from './entities/course.entity';
import { categorySchema } from 'src/categories/entities/category.entity';
import { quizCourSchema } from 'src/quizscours/entities/quizscour.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'courses', schema: courseSchema }]),
    MongooseModule.forFeature([{ name: 'categories', schema: categorySchema }]),
    MongooseModule.forFeature([{name:'quizcours',schema:quizCourSchema}])
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
