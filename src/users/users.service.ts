import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private userModel: Model<IUser>,
  ) {}
  async findUserByUserName(usernName: string): Promise<IUser> {
    const user = await this.userModel.findOne({ userName: usernName }).exec();
    return user;
  }
  async findOneUserAndResetPassword(email: any, password: any): Promise<IUser> {
    return this.userModel.findOneAndUpdate(email, password);
  }
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAllUsers(): Promise<IUser[]> {
    const usersData = await this.userModel.find().exec();
    if (!usersData || usersData.length == 0)
      throw new NotFoundException('No users found');
    return usersData;
  }

  async findOne(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId);
    if (!existingUser) throw new NotFoundException('User Not Found');
    return existingUser;
  }
  async findUserByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw new NotFoundException('no user found by this email '+email);
    return user;
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const updateUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!updateUser) throw new NotFoundException('User does not exist');
    return updateUser;
  }

  async removeUser(userId: string): Promise<IUser> {
    const deleteUser = await this.userModel.findByIdAndDelete(userId);
    if (!deleteUser) throw new NotFoundException('user to delete not found');
    return deleteUser;
  }
}
