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
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('trainers')
@ApiTags('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto, @Res() response) {
    try {
      const trainer = await this.trainersService.create(createTrainerDto);
      return response.status(HttpStatus.OK).json({
        message: 'trainer created Successfully',
        status: HttpStatus.OK,
        data: trainer,
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
      const trainer = await this.trainersService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'trainers found Successfully',
        status: HttpStatus.OK,
        data: trainer,
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
      const trainer = await this.trainersService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'trainer found Successfully',
        status: HttpStatus.OK,
        data: trainer,
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
    @Res() response,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ) {
    try {
      const trainer = await this.trainersService.update(id, updateTrainerDto);
      return response.status(HttpStatus.OK).json({
        message: 'trainer updated Successfully',
        status: HttpStatus.OK,
        data: trainer,
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
      const trainer = await this.trainersService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'trainer deleted Successfully',
        status: HttpStatus.OK,
        data: trainer,
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
