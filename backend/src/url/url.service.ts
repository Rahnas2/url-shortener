import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateShortUrlDto } from "./dto/create-short-url.dto";
import { UrlRepository } from "src/repositories/url.repository";
import { generateShortCode } from "src/utils/generate-short-code";
import { Types } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { IUrlService } from "./interfaces/url_service.interface";
import { IUrlRepository } from "src/repositories/interfaces/url-repository.interface";

@Injectable()
export class UrlService implements IUrlService {

    constructor(@Inject('IUrlRepository') private readonly urlRepository: IUrlRepository, 
        private configService: ConfigService,
    ) {}
    async createShortUrl(createShortUrlDto: CreateShortUrlDto, user: string){

        //Original Url 
        const { originalUrl } = createShortUrlDto

        //Generate Short Code for Url
        const shortCode = await generateShortCode()

        //Check the Short Code Exist in the database
        const existingCode = await this.urlRepository.findByShortCode(shortCode)
        if(existingCode){
            throw new ConflictException('short code collision')
        }

        console.log('user id ', user)
        //Store in db
        const data = await this.urlRepository.createShortUrl({ shortCode, originalUrl, user: new Types.ObjectId(user)})

        //Short Url Link 
        const shortUrl =  this.configService.get<string>('BACKEND_URI') + '/api/auth/' + shortCode

        //Return Short Url 
        return data
    }

    async getUserShortUrls(user: string){

        //Find all the Created Url by User Id
        return await this.urlRepository.findUrlsByUserId(user)
    }

    async redirectToOriginalUrl(shortCode: string) {
        const data = await this.urlRepository.findByShortCode(shortCode)
        if(!data){
            throw new NotFoundException('not found')
        }

        return data.originalUrl
    }

    async deleteShortUrl(shortCode: string) {
        await this.urlRepository.deleteUrlByShortCode(shortCode)
    }

}