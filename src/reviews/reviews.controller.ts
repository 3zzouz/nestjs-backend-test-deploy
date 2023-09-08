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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @Res() response) {
    try {
      const reviewToCreate = await this.reviewsService.create(createReviewDto);
      return response.status(HttpStatus.OK).json({
        message: 'Review Created Successfully',
        status: HttpStatus.OK,
        data: reviewToCreate,
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
      const reviewsToFind = await this.reviewsService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Reviews Found Successfully',
        status: HttpStatus.OK,
        data: reviewsToFind,
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
      const reviewToFind = await this.reviewsService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Review Found Successfully',
        status: HttpStatus.OK,
        data: reviewToFind,
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
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() response,
  ) {
    try {
      const reviewToUpdate = await this.reviewsService.update(
        id,
        updateReviewDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Review Updated Successfully',
        status: HttpStatus.OK,
        data: reviewToUpdate,
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
      const reviewToDelete = await this.reviewsService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Review Deleted Successfully',
        status: HttpStatus.OK,
        data: reviewToDelete,
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
