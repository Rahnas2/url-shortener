import { CreateShortUrlDto } from '../dto/create-short-url.dto';
import { UrlDocument } from 'src/schemas/url.schema';

export interface IUrlService {
  createShortUrl(createShortUrlDto: CreateShortUrlDto, user: string): Promise<UrlDocument>;
  getUserShortUrls(user: string): Promise<UrlDocument[]>;
  redirectToOriginalUrl(shortCode: string): Promise<string>;
  deleteShortUrl(shortCode: string):  Promise<void>;
}