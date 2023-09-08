import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmailDto {
    @ApiProperty({
        type:String,
        description:'email'
    })
    @IsString()
    @IsNotEmpty()
    email:string
}