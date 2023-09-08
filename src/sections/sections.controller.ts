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
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer, diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

@Controller('sections')
@ApiTags('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/sections',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async create(
    @Body() createSectionDto: CreateSectionDto,
    @Res() response,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createSectionDto.file = image.filename;
    try {
      const sectionToCreate = await this.sectionsService.create(
        createSectionDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Section Created Successfully',
        status: HttpStatus.OK,
        data: sectionToCreate,
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
      const sectionsToFind = await this.sectionsService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Sections Found Successfully',
        status: HttpStatus.OK,
        data: sectionsToFind,
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
      const sectionToFind = await this.sectionsService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Section Found Successfully',
        status: HttpStatus.OK,
        data: sectionToFind,
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
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/sections',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @Res() response,
    @UploadedFile() image: Express.Multer.File,
  ) {
    updateSectionDto.file = image?.filename
    try {
      const sectionToUpdate = await this.sectionsService.update(
        id,
        updateSectionDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Section Updated Successfully',
        status: HttpStatus.OK,
        data: sectionToUpdate,
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
      const sectionToDelete = await this.sectionsService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Section Deleted Successfully',
        status: HttpStatus.OK,
        data: sectionToDelete,
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
