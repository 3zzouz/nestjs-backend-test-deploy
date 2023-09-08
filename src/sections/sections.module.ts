import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { sectionSchema } from './entities/section.entity';
import { courseSchema } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'sections', schema: sectionSchema }]),
    MongooseModule.forFeature([{ name: 'courses', schema: courseSchema}]),
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
