import { Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { LoginUserDto } from "../dto/login-user.dto";

export interface IAuthService {
    register(createUserDto: CreateUserDto): Promise<{message: string}>
    login(loginUserDto: LoginUserDto, res: Response): Promise<{accessToken: string}>
    verifyEmail(token: string): Promise<{verified: boolean, payload: JwtPayloadDto | null}>
    refreshToken(refreshToken: string | undefined) : Promise<{accessToken: string}>
}