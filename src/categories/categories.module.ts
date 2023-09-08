import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './entities/category.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'categories',schema:categorySchema}])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
