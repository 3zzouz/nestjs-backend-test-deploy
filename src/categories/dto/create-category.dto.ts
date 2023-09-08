import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'File is required',
  })
  @IsString()
  @IsNotEmpty()
  file: string;
  @ApiProperty({
    type: String,
    description: 'Name is required',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
