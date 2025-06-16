import { Module } from "@nestjs/common";
import { UrlController } from "./url.controller";
import { UrlService } from "./url.service";
import { UrlRepository } from "src/repositories/url.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Url, UrlSchema } from "src/schemas/url.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [MongooseModule.forFeature([{name: Url.name, schema: UrlSchema}]), 
JwtModule.register({})],
    controllers: [UrlController],
    providers: [UrlService, UrlRepository]
})
export class UrlModule {}