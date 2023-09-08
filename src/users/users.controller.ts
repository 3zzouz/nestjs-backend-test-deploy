import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/users',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createUserDto.file = file?.filename;
      const newUser = await this.usersService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User Created successfully',
        status: HttpStatus.CREATED,
        data: newUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get()
  async findAllUsers(@Res() response) {
    try {
      const usersData = await this.usersService.findAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'Users found successfully',
        status: HttpStatus.OK,
        data: usersData,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') userId: string, @Res() response) {
    try {
      const existingUser = await this.usersService.findOne(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found by id',
        status: HttpStatus.OK,
        data: existingUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/users',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      updateUserDto.file = file?.filename;
      const updateUser = await this.usersService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'user updated',
        status: HttpStatus.OK,
        data: updateUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string, @Res() response) {
    try {
      const deleteUser = await this.usersService.removeUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'user deleted',
        status: HttpStatus.OK,
        data: deleteUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
