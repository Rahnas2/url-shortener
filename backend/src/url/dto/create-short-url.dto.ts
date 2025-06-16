import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateShortUrlDto {
    @IsNotEmpty()
    @IsUrl()
    originalUrl: string
}