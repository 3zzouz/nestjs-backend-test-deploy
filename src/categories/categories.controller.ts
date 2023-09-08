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
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get('getby/:name')
  async getCategoryByName(@Query('name') name: string, @Res() response) {
    try {
      const category = await this.categoriesService.getByName(name);
      return response.status(HttpStatus.OK).json({
        message: 'Category found by name : {' + name + '}successfully',
        status: HttpStatus.OK,
        data: category,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  //config multer
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/categories',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createCategoryDto.file /*de la base de donnée*/ =
        file /* du décorateur UploadedFile*/.filename;
      const newCategory = await this.categoriesService.createCategory(
        createCategoryDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Category created',
        status: HttpStatus.CREATED,
        data: newCategory,
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
  async findAllCategories(@Res() response) {
    try {
      const allCategories = await this.categoriesService.findAllCategories();
      return response.status(HttpStatus.OK).json({
        message: 'Categories found successfully',
        status: HttpStatus.OK,
        data: allCategories,
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
  async findOneCategory(@Param('id') id: string, @Res() response) {
    try {
      const category = await this.categoriesService.findOneCategory(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category found successfully',
        status: HttpStatus.OK,
        data: category,
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
        destination: './upload/categories',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async updateCategory(
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      updateCategoryDto.file = file?.filename;
      const categoryToUpdate = await this.categoriesService.updateCategory(
        categoryId,
        updateCategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Category updated successfully',
        status: HttpStatus.OK,
        data: categoryToUpdate,
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
  async removeCategory(@Param('id') id: string, @Res() response) {
    try {
      const categoryToDelete = await this.categoriesService.removeCategory(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category Deleted Successfully',
        status: HttpStatus.OK,
        data: categoryToDelete,
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
