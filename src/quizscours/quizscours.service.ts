import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizscourDto } from './dto/create-quizscour.dto';
import { UpdateQuizscourDto } from './dto/update-quizscour.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuizCours } from './interfaces/quizcours.interface';

@Injectable()
export class QuizscoursService {
  constructor(
    @InjectModel('quizcours')
    private quizCoursModel: Model<IQuizCours>,
    @InjectModel('courses')
    private courseModel: Model<IQuizCours>,
    @InjectModel('quizs')
    private quizModel: Model<IQuizCours>,
  ) {}

  async create(createQuizscourDto: CreateQuizscourDto): Promise<IQuizCours> {
    const createdCourse = new this.quizCoursModel(createQuizscourDto);
    await this.courseModel.updateOne(
      { _id: createQuizscourDto.course },
      { $push: { quizcourses: createdCourse._id } },
    );
    await this.quizModel.updateOne(
      { _id: createQuizscourDto.quiz },
      { $push: { quizcourses: createdCourse._id } },
    );
    return await createdCourse.save();
  }

  async findAll(): Promise<IQuizCours[]> {
    const all = await this.quizCoursModel.find().exec();
    if (!all || all.length == 0)
      throw new NotFoundException('No quizcours available');
    return all;
  }

  async findOne(id: string): Promise<IQuizCours> {
    const ToFind = await this.quizCoursModel.findById(id);
    if (!ToFind) throw new NotFoundException('No quizcours available');
    return ToFind;
  }

  async update(
    id: string,
    updateQuizscourDto: UpdateQuizscourDto,
  ): Promise<IQuizCours> {
    const toUpdate = await this.quizCoursModel.findByIdAndUpdate(
      id,
      updateQuizscourDto,
    );
    if (!toUpdate) throw new NotFoundException('error');
    return toUpdate;
  }

  async remove(id: string): Promise<IQuizCours> {
    const toremove = await this.quizCoursModel.findByIdAndDelete(id);
    if (!toremove) throw new NotFoundException('error');
    await this.courseModel.updateOne(
      { _id: toremove.course },
      { $pull: { quizcourses: toremove._id } },
    );
    await this.quizModel.updateOne(
      { _id: toremove.quiz },
      { $pull: { quizcourses: toremove._id } },
    );
    return toremove;
  }
}
