import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {
  @ApiProperty({
    type: String,
    description: 'userName is required',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    type: String,
    description: 'password is required',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
