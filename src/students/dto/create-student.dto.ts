import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    type:String,
    description:'Student Level'
  })
  @IsString()
  @IsNotEmpty() 
  level: string;

  @ApiProperty({
    type:String,
    description:'Student CIN'
  })
  @IsString()
  @IsNotEmpty()
  cin: string;
}
