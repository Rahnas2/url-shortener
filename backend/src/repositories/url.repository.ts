import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Url, UrlDocument } from "src/schemas/url.schema";
import { CreateShortUrlDto } from "src/url/dto/create-short-url.dto";
import { IUrlRepository } from "./interfaces/url-repository.interface";

@Injectable()
export class UrlRepository implements IUrlRepository {

    constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

    async createShortUrl(data: Url): Promise<UrlDocument> {
        try {
            console.log('start storing ', data)

            return await this.urlModel.create(data)
        } catch (error) {
            console.log('error herere ', error)
            throw new InternalServerErrorException('error creating')
        }
        
    }
    async findUrlsByUserId(userId: string): Promise<UrlDocument []> {
        return await this.urlModel.find({user: userId}).sort({createdAt: -1})
    }

    async findByShortCode(shortCode: string): Promise<UrlDocument | null> {
        return await this.urlModel.findOne({shortCode})
    }

    async deleteUrlByShortCode(shortCode: string) {
        return await this.urlModel.deleteOne({shortCode})
    }
}