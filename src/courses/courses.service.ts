import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICourse } from './interfaces/course.interface';
import { ICategory } from 'src/categories/interfaces/category.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('courses')
    private courseModel: Model<ICourse>,
    @InjectModel('categories')
    private categoryModel: Model<ICategory>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<ICourse> {
    const newCourse = new this.courseModel(createCourseDto);
    await this.categoryModel.updateOne(
      { _id: createCourseDto.category },
      { $push: { courses: newCourse._id } },
    );
    return await newCourse.save();
  }

  async findAllCourses(): Promise<ICourse[]> {
    const allcourses = await this.courseModel.find().exec();
    if (!allcourses || allcourses.length == 0)
      throw new NotFoundException('There is no course available');
    return allcourses;
  }

  async findOneCourse(id: string): Promise<ICourse> {
    const courseToFind = await this.courseModel.findById(id);
    if (!courseToFind) throw new NotFoundException('Course not Found');
    return courseToFind;
  }

  async updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<ICourse> {
    const courseToUpdate = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
    );
    if (!courseToUpdate)
      throw new NotFoundException('course not found to update');
    return courseToUpdate;
  }

  async removeOneCourse(id: string) {
    const courseToRemove = await this.courseModel.findByIdAndDelete(id);
    if (!courseToRemove)
      throw new NotFoundException('course not found to update');
    await this.categoryModel.updateOne(
      { _id: courseToRemove.category },
      { $pull: { courses: courseToRemove._id } },
    );
    return courseToRemove;
  }
}
