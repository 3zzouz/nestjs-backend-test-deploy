import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { ITrainer } from './interfaces/trainer.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrainersService {

  constructor(
    @InjectModel('trainers')
    private trainerModel: Model<ITrainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto):Promise<ITrainer> {
    const trainer = new this.trainerModel(createTrainerDto);
    if (!trainer) throw new NotFoundException('Cannot create new trainer');
    return await trainer.save();
  }

  async findAll():Promise<ITrainer[]> {
    const allTrainers = await this.trainerModel.find().exec();
    if (!allTrainers || allTrainers.length == 0)
      throw new NotFoundException('Cannot Found any trainer');
    return allTrainers;
  }

  async findOne(id: string):Promise<ITrainer> {
    const trainer = await this.trainerModel.findById(id);
    if (!trainer)
      throw new NotFoundException(`Cannot found the trainer with id ${id}`);
    return trainer;
  }

  async update(id: string, updateTrainerDto: UpdateTrainerDto):Promise<ITrainer> {
    const trainer = await this.trainerModel.findByIdAndUpdate(id,updateTrainerDto);
    if (!trainer)
      throw new NotFoundException(`Cannot update the trainer with id ${id}`);
    return trainer;
  }

  async remove(id: string):Promise<ITrainer> {
    const trainer = await this.trainerModel.findByIdAndRemove(id);
    if (!trainer)
      throw new NotFoundException(`Cannot delete the trainer with id ${id}`);
    return trainer;
  }
}
