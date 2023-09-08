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
import { QuizsService } from './quizs.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('quizs')
@ApiTags('quizs')
export class QuizsController {
  constructor(private readonly quizsService: QuizsService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto, @Res() response) {
    try {
      const quizToCreate = await this.quizsService.create(createQuizDto);
      return response.status(HttpStatus.OK).json({
        message: 'Quiz Created Successfully',
        status: HttpStatus.OK,
        data: quizToCreate,
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
      const quizs = await this.quizsService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Quizs Found Successfully',
        status: HttpStatus.OK,
        data: quizs,
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
      const quizToFind = await this.quizsService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Quiz Found Successfully',
        status: HttpStatus.OK,
        data: quizToFind,
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
    @Body() updateQuizDto: UpdateQuizDto,
    @Res() response,
  ) {
    try {
      const quizToUpdate = await this.quizsService.update(id, updateQuizDto);
      return response.status(HttpStatus.OK).json({
        message: 'Quiz Updated Successfully',
        status: HttpStatus.OK,
        data: quizToUpdate,
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
      const quizToRemove = await this.quizsService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Quiz Removed Successfully',
        status: HttpStatus.OK,
        data: quizToRemove,
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
