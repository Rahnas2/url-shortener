import { Body, Controller, Delete, Get, Inject, Param, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateShortUrlDto } from "./dto/create-short-url.dto";
import { UrlService } from "./url.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwt-payload.dto";
import { Response } from "express";
import { DELETE_URL_ROUTE, MY_URLS_ROUTE, REDIRECT_URL_ROUTE, SHORTEN_URL_ROUTE, URL_ROUTE } from "./route.constants";
import { IUrlService } from "./interfaces/url_service.interface";

@Controller(URL_ROUTE)
export class UrlController {

    constructor(@Inject('IUrlService') private readonly urlService: IUrlService) {}
    
    @Post(SHORTEN_URL_ROUTE)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto, @CurrentUser() user: JwtPayloadDto) { 
        console.log('started ', createShortUrlDto)
        return this.urlService.createShortUrl(createShortUrlDto, user.sub)
    }

    
    @Get(MY_URLS_ROUTE)
    @UseGuards(AuthGuard)
    async getUserShortUrls (@CurrentUser() user: JwtPayloadDto) {
        return this.urlService.getUserShortUrls(user.sub)
    }

    @Get(REDIRECT_URL_ROUTE)
    async redirectToOriginalUrl(@Param('shortCode') shortCode: string, @Res() res: Response) {
        const originalUrl =  await this.urlService.redirectToOriginalUrl(shortCode)
        return res.redirect(originalUrl)
    }

    @Delete(DELETE_URL_ROUTE)
    @UseGuards(AuthGuard)
    async deleteShortUrl (@Param('shortCode') shortCode: string) {
        return await this.urlService.deleteShortUrl(shortCode)
    }

}