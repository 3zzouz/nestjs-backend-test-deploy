import {
  Controller,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateCourseDto } from './dto/update-course.dto';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        price: { type: 'number' },
        nbstudent: { type: 'number' },
        duree: { type: 'string' },
        category: { type: 'string' },
        images: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './upload/courses',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Res() response,
    @UploadedFiles() images,
  ) {
    try {
      createCourseDto.files = images.map((item) => item.filename);
      const newCourse = await this.coursesService.createCourse(createCourseDto);
      return response.status(HttpStatus.OK).json({
        message: 'new course created successfully',
        status: HttpStatus.OK,
        data: newCourse,
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
  async findAllCourses(@Res() response) {
    try {
      const allCourses = await this.coursesService.findAllCourses();
      return response.status(HttpStatus.OK).json({
        message: 'Courses found successfully',
        status: HttpStatus.OK,
        data: allCourses,
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
  async findOneCourse(@Param('id') id: string, @Res() response) {
    try {
      const findOneCourse = await this.coursesService.findOneCourse(id);
      return response.status(HttpStatus.OK).json({
        message: 'Course found successfully',
        status: HttpStatus.OK,
        data: findOneCourse,
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
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './upload/courses',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles() images,
    @Res() response,
  ) {
    try {
      if (images.length != 0)
        updateCourseDto.files = images.map((image) => image.filename);
      const courseToUpdate = await this.coursesService.updateCourse(
        id,
        updateCourseDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Course Updated Successfully',
        status: HttpStatus.OK,
        data: courseToUpdate,
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
  async removeOneCourse(@Param('id') id: string, @Res() response) {
    try {
      const removeOneCourse = await this.coursesService.removeOneCourse(id);
      return response.status(HttpStatus.OK).json({
        message: 'Course found successfully',
        status: HttpStatus.OK,
        data: removeOneCourse,
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
