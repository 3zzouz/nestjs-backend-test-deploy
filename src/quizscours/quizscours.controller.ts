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
import { QuizscoursService } from './quizscours.service';
import { CreateQuizscourDto } from './dto/create-quizscour.dto';
import { UpdateQuizscourDto } from './dto/update-quizscour.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('quizscours')
@ApiTags('quizcours')
export class QuizscoursController {
  constructor(private readonly quizscoursService: QuizscoursService) {}

  @Post()
  async create(
    @Body() createQuizscourDto: CreateQuizscourDto,
    @Res() response,
  ) {
    try {
      const tocreate = await this.quizscoursService.create(createQuizscourDto);
      return response.status(HttpStatus.OK).json({
        message: 'created successfully',
        status: HttpStatus.OK,
        data: tocreate,
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
      const tofind = await this.quizscoursService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'found all successfully',
        status: HttpStatus.OK,
        data: tofind,
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
      const tofind = await this.quizscoursService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'found one by ID successfully',
        status: HttpStatus.OK,
        data: tofind,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  /*@Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuizscourDto: UpdateQuizscourDto,
    @Res() response,
  ) {
    try {
      const toUpdate = await this.quizscoursService.update(
        id,
        updateQuizscourDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Updated successfully',
        status: HttpStatus.OK,
        data: toUpdate,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }*/

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    try {
      const todelete = await this.quizscoursService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'deleted successfully',
        status: HttpStatus.OK,
        data: todelete,
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
