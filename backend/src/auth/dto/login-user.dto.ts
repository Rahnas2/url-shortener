import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value?.trim())
    email: string

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    password: string
}