import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from './interfaces/student.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('students')
    private studentModel: Model<IStudent>,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const student = new this.studentModel(createStudentDto);
    if (!student) throw new NotFoundException('Cannot create new student');
    return await student.save();
  }

  async findAll(): Promise<IStudent[]> {
    const allStudnets = await this.studentModel.find().exec();
    if (!allStudnets || allStudnets.length == 0)
      throw new NotFoundException('Cannot Found any studnet');
    return allStudnets;
  }

  async findOne(id: string): Promise<IStudent> {
    const student = await this.studentModel.findById(id);
    if (!student)
      throw new NotFoundException(`Cannot found the student with id ${id}`);
    return student;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const studnet = await this.studentModel.findByIdAndUpdate(
      id,
      updateStudentDto,
    );
    if (!studnet)
      throw new NotFoundException('Cannot update student by id : ' + id);
    return studnet;
  }

  async remove(id: string): Promise<IStudent> {
    const student = await this.studentModel.findByIdAndDelete(id);
    if (!student) throw new NotFoundException('Cannot Delete Student');
    return student;
  }
}
