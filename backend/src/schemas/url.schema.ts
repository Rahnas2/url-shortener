import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type UrlDocument = HydratedDocument<Url>
@Schema({timestamps: true})
export class Url {

    @Prop({required: true, unique: true})
    shortCode: string;

    @Prop({required: true})
    originalUrl: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
    user: Types.ObjectId
   
}

export const UrlSchema =  SchemaFactory.createForClass(Url)