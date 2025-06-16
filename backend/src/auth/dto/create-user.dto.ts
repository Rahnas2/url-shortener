import { Transform } from "class-transformer"
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Matches, MinLength, minLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value?.trim())
    email: string

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    @Transform(({ value }) => value?.trim())
    mobile: string

    @IsString() 
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
            'Password must include uppercase, lowercase, number, and special character',
    })
    @Transform(({ value }) => value?.trim())
    password: string
}