import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateQuizscourDto {
  @ApiProperty({
    type: String,
    description: 'quiz is required',
  })
  @IsString()
  @IsNotEmpty()
  quiz: string;
  @ApiProperty({
    type: String,
    description: 'Course is required',
  })
  @IsString()
  @IsNotEmpty()
  course: string;
}
