import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateReviewDto {
  @ApiProperty({
    type: Number,
    description: 'note is required',
  })
  @IsNumber()
  note: number;
  @ApiProperty({
    type: String,
    description: 'string is required',
  })
  @IsString()
  comment: string;
  @ApiProperty({
    type: String,
    description: 'course is required',
  })
  @IsString()
  @IsNotEmpty()
  course: string;
}
