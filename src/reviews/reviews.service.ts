import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReview } from './interfaces/review.interface';
import { ICourse } from 'src/courses/interfaces/course.interface';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('reviews')
    private reviewModel: Model<IReview>,
    @InjectModel('courses')
    private courseModel: Model<ICourse>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<IReview> {
    const newReview = new this.reviewModel(createReviewDto);
    await this.courseModel.updateOne(
      { _id: createReviewDto.course },
      { $push: { reviews: newReview._id } },
    );
    return await newReview.save();
  }

  async findAll(): Promise<IReview[]> {
    const findReviews = await this.reviewModel.find().exec();
    if (!findReviews || findReviews.length == 0)
      throw new NotFoundException('Reviews cannot be retrieved');
    return findReviews;
  }

  async findOne(id: string): Promise<IReview> {
    const reviewToFind = await this.reviewModel.findById(id);
    if (!reviewToFind) throw new NotFoundException('Cannot Find Review By ID');
    return reviewToFind;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<IReview> {
    const reviewToUpdate = await this.reviewModel.findByIdAndUpdate(
      id,
      updateReviewDto,
    );
    if (!reviewToUpdate)
      throw new NotFoundException('Cannot Update Review Successfully');
    return reviewToUpdate;
  }

  async remove(id: string): Promise<IReview> {
    const reviewToRemove = await this.reviewModel.findByIdAndRemove(id);
    if (!reviewToRemove) throw new NotFoundException('Error Deleting Review');
    await this.courseModel.updateOne(
      { _id: reviewToRemove.course },
      { $pull: { reviews: reviewToRemove._id } },
    );
    return reviewToRemove;
  }
}
