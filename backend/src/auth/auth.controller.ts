import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { Request, Response } from "express";

@Controller('api/auth')
@UsePipes(new ValidationPipe())
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(loginUserDto, res)
    }

    @Get('verify-email')
    async verifyEmail(@Query('token') token: string, @Res() res: Response) {
        const { verified, payload } = await this.authService.verifyEmail(token);

        const email = payload?.email ?? '';
        const status = verified ? 'success' : 'failed';
        const message = verified ? 'verified' : 'Verification failed';

        res.redirect(`${process.env.CLIENT_URI}/email-verified?status=${status}&message=${message}&email=${email}`);
    }

    @Get('refresh-token')
    async refreshToken(@Req() req: Request) {
        const refreshToken = req.cookies.refreshToken
        return await this.authService.refreshToken(refreshToken)
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) res: Response) {

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NOD_ENV === 'production' ? true : false,
            sameSite: 'strict',
        })
        return { message: 'Logged out successfully' }
    }
}