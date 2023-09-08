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
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('students')
@ApiTags('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto, @Res() response) {
    try {
      const student = await this.studentsService.create(createStudentDto);
      return response.status(HttpStatus.OK).json({
        message: 'Student created Successfully',
        status: HttpStatus.OK,
        data: student,
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
  async findAll(@Res() response) {
    try {
      const student = await this.studentsService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Students found Successfully',
        status: HttpStatus.OK,
        data: student,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const student = await this.studentsService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Student found Successfully',
        status: HttpStatus.OK,
        data: student,
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
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() response,
  ) {
    try {
      const student = await this.studentsService.update(id, updateStudentDto);
      return response.status(HttpStatus.OK).json({
        message: 'Student updated Successfully',
        status: HttpStatus.OK,
        data: student,
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
  async remove(@Param('id') id: string, @Res() response) {
    try {
      const student = await this.studentsService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted Successfully',
        status: HttpStatus.OK,
        data: student,
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
