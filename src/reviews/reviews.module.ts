import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reviewSchema } from './entities/review.entity';
import { courseSchema } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'reviews', schema: reviewSchema }]),
    MongooseModule.forFeature([{ name: 'courses', schema: courseSchema }]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
