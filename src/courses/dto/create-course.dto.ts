import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCourseDto {
  @ApiProperty({
    type: [String],
    description: 'Files is required',
  })
  @IsArray()
  @IsNotEmpty()
  files: string[];
  @ApiProperty({
    type: String,
    description: 'Title is required',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    type: Number,
    description: 'Price is required',
  })
  @IsNumber()
  price: number;
  @ApiProperty({
    type: String,
    description: 'Trainer is required',
  })
  @IsString()
  @IsNotEmpty()
  trainer: string;
  @ApiProperty({
    type: Number,
    description: 'NbStudent is required',
  })
  @IsNumber()
  nbstudent: number;
  @ApiProperty({
    type: String,
    description: 'Duree is required',
  })
  @IsString()
  @IsNotEmpty()
  duree: string;
  @ApiProperty({
    type: String,
    description: 'Category is required',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
