import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    // MongooseModule.forRoot('mongodb+srv://rahnasx2:m6D9eW3JCEmtG6Tk@cluster0.a6mkmxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),

    MailerModule.forRoot({
      transport: {
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        }
      }
    }),

    AuthModule,
    UrlModule
  ],
})
export class AppModule { }
