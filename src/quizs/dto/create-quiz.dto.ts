import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateQuizDto {
  @ApiProperty({
    type: String,
    description: 'Question is required',
  })
  @IsString()
  @IsNotEmpty()
  question: string;
  @ApiProperty({
    type: String,
    description: 'Rep1 is required',
  })
  @IsString()
  @IsNotEmpty()
  rep1: string;
  @ApiProperty({
    type: String,
    description: 'Rep2 is required',
  })
  @IsString()
  @IsNotEmpty()
  rep2: string;
  @ApiProperty({
    type: String,
    description: 'Rep3 is required',
  })
  @IsString()
  @IsNotEmpty()
  rep3: string;
  @ApiProperty({
    type: String,
    description: 'Answer is required',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
