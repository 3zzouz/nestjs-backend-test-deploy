import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTrainerDto {
  @ApiProperty({
    type:String,
    description:'Student CIN'
  })
  @IsString()
  @IsNotEmpty()
  cin: string;
}
