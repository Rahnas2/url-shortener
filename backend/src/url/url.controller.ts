import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateShortUrlDto } from "./dto/create-short-url.dto";
import { UrlService } from "./url.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwt-payload.dto";
import { Response } from "express";

@Controller('api/url')
export class UrlController {

    constructor(private urlService: UrlService) {}
    @Post('shorten')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto, @CurrentUser() user: JwtPayloadDto) { 
        console.log('started ', createShortUrlDto)
        return this.urlService.createShortUrl(createShortUrlDto, user.sub)
    }

    
    @Get('my-urls')
    @UseGuards(AuthGuard)
    async getUserShortUrls (@CurrentUser() user: JwtPayloadDto) {
        return this.urlService.getUserShortUrls(user.sub)
    }

    @Get(':shortCode')
    async redirectToOriginalUrl(@Param('shortCode') shortCode: string, @Res() res: Response) {
        const originalUrl =  await this.urlService.redirectToOriginalUrl(shortCode)
        return res.redirect(originalUrl)
    }

    @Delete(':shortCode')
    @UseGuards(AuthGuard)
    async deleteShortUrl (@Param('shortCode') shortCode: string) {
        return await this.urlService.deleteShortUrl(shortCode)
    }

}