import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISection } from './interfaces/section.interface';
import { ICourse } from 'src/courses/interfaces/course.interface';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel('sections')
    private sectionModel: Model<ISection>,
    @InjectModel('courses')
    private courseModel: Model<ICourse>,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<ISection> {
    const newSection = new this.sectionModel(createSectionDto);
    await this.courseModel.updateOne(
      {
        _id: createSectionDto.course,
      },
      { $push: { sections: newSection._id } },
    );
    return await newSection.save();
  }

  async findAll(): Promise<ISection[]> {
    const allSections = await this.sectionModel.find().exec();
    if (!allSections || allSections.length == 0)
      throw new NotFoundException('There is no section available');
    return allSections;
  }

  async findOne(id: string): Promise<ISection> {
    const sectionToFind = await this.sectionModel.findById(id);
    if (!sectionToFind) throw new NotFoundException('Section Not Found by ID');
    return sectionToFind;
  }

  async update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<ISection> {
    const sectionToUpdate = await this.sectionModel.findByIdAndUpdate(
      id,
      updateSectionDto,
    );
    if (!sectionToUpdate)
      throw new NotFoundException('Section To update Not Found');
    return sectionToUpdate;
  }

  async remove(id: string): Promise<ISection> {
    const sectionToDelete = await this.sectionModel.findByIdAndDelete(id);
    if (!sectionToDelete)
      throw new NotFoundException('Section To Delete Is Not Found');
    await this.courseModel.updateOne(
      { _id: sectionToDelete.course },
      { $pull: { sections: sectionToDelete._id } },
    );
    return sectionToDelete;
  }
}
