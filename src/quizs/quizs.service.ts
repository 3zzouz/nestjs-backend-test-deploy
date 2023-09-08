import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuiz } from './interfaces/quiz.interface';

@Injectable()
export class QuizsService {
  constructor(
    @InjectModel('quizs')
    private quizModel: Model<IQuiz>,
  ) {}
  async create(createQuizDto: CreateQuizDto): Promise<IQuiz> {
    const newQuiz = new this.quizModel(createQuizDto);
    return await newQuiz.save();
  }

  async findAll(): Promise<IQuiz[]> {
    const quizes = await this.quizModel.find().exec();
    if (!quizes || quizes.length == 0)
      throw new NotFoundException('There is no quiz available');
    return quizes;
  }

  async findOne(id: string): Promise<IQuiz> {
    const quizToFind = await this.quizModel.findById(id);
    if (!quizToFind) throw new NotFoundException('Quiz not found by ID');
    return quizToFind;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<IQuiz> {
    const quizToUpdate = await this.quizModel.findByIdAndUpdate(
      id,
      updateQuizDto,
    );
    if (!quizToUpdate) throw new NotFoundException('Cannot Update Quiz by ID');
    return quizToUpdate;
  }

  async remove(id: string): Promise<IQuiz> {
    const quizToRemove = await this.quizModel.findByIdAndRemove(id);
    if (!quizToRemove) throw new NotFoundException('Cannot Delete Quiz by ID');
    return quizToRemove;
  }
}
