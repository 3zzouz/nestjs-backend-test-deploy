import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
//ici se déroule la validation des champs coté serveur lors de la Creation d'un nouveau élément dans la base de données
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'file is not required',
  })
  @IsString()
  @IsNotEmpty()
  file: string;
  @ApiProperty({
    type: String,
    description: 'cin is required',
  })
  @IsString()
  @IsNotEmpty()
  cin: string;
  @ApiProperty({
    type: String,
    description: 'level is required',
  })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    type: String,
    description: 'role is required',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    type: String,
    description: 'fullName is required',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    description: 'userName is required',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;
  @ApiProperty({
    type: String,
    description: 'Email is required and unique',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    type: String,
    description: 'Password is required',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    type: Number,
    description: 'fullName is required',
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;
  @ApiProperty({
    type: String,
    description: 'City is required',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty({
    type: String,
    description: 'Address is required',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
