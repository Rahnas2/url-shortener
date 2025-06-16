import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserRepository } from "src/repositories/user.repository";
import { JwtModule } from "@nestjs/jwt";
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserRepository]
})   
export class AuthModule { }