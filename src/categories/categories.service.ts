import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/category.interface';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories')
    private categoryModel: Model<ICategory>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return await newCategory.save();
  }

  async findAllCategories(): Promise<ICategory[]> {
    const allCategories = await this.categoryModel.find().exec();
    if (!allCategories || allCategories.length == 0)
      throw new NotFoundException('Ther is no category available');
    return allCategories;
  }

  async getByName(name: string): Promise<ICategory[]> {
    const getByName = await this.categoryModel.find({ name: name }).exec();
    if (!getByName || getByName.length == 0)
      throw new NotFoundException(
        'There is no category available by the name : ' + name,
      );
    return getByName;
  }
  async findOneCategory(id: string): Promise<ICategory> {
    const categoryToFind = await this.categoryModel.findById(id);
    if (!categoryToFind)
      throw new NotFoundException('Category Not Found By ID');
    return categoryToFind;
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    const categoryToUpdate = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!categoryToUpdate)
      throw new NotFoundException('Category to delete unavailable');
    return categoryToUpdate;
  }

  async removeCategory(id: string): Promise<ICategory> {
    const categoryToDelete = await this.categoryModel.findByIdAndDelete(id);
    if (!categoryToDelete)
      throw new NotFoundException('Category to delete not found');
    return categoryToDelete;
  }
}
