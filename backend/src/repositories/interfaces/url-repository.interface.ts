import { DeleteResult } from "mongoose";
import { Url, UrlDocument } from "src/schemas/url.schema";

export interface IUrlRepository {
  createShortUrl(data: Url): Promise<UrlDocument>;
  findUrlsByUserId(userId: string): Promise<UrlDocument []>;
  findByShortCode(shortCode: string): Promise<UrlDocument | null>;
  deleteUrlByShortCode(shortCode: string): Promise<DeleteResult>;
}