import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSectionDto {
  @ApiProperty({
    type: String,
    description: 'file is required',
  })
  @IsString()
  @IsNotEmpty()
  file: string;

  @ApiProperty({
    type: String,
    description: 'description is required',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({
    type: String,
    description: 'skills is required',
  })
  @IsArray()
  skills: string;
  @ApiProperty({
    type: String,
    description: 'tile is required',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    type: String,
    description: 'Course is required',
  })
  @IsString()
  @IsNotEmpty()
  course: string;
}
