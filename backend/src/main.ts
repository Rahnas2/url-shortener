import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URI,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  app.use(cookieParser())
  console.log('port env ', process.env.PORT)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
