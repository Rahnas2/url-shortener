import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserRepository } from "src/repositories/user.repository";

import { hash, compare } from 'bcryptjs'
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import { EmailVerification } from "src/utils/email-verification-mail";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";


@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
        private readonly mailService: MailerService
    ) { }
    async register(createUserDto: CreateUserDto) {

        const existingEmail = await this.userRepository.findUserByEmail(createUserDto.email)

        if (existingEmail) {
            throw new ConflictException('email already in use')
        }

        const hashPassword = await hash(createUserDto.password, 10)

        const user = await this.userRepository.createUser({ ...createUserDto, password: hashPassword })

        const payload = { sub: user._id.toString(), email: user.email }

        const verificationToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('EMAIL_VERIFICATION_SECRET'),
            expiresIn: jwtConstants.emailVerificationExpiresIn
        })

        const verificationLink = `${this.configService.get<string>('BACKEND_URI')}/api/auth/verify-email?token=${verificationToken}`

        await this.mailService.sendMail(EmailVerification(this.configService.get<string>('EMAIL_USER') as string, user.email, verificationLink))

        return { message: `We have sent a verification link to your email (${createUserDto.email}). Please verify it before logging in.` }
    }

    async login(loginUserDto: LoginUserDto, res: Response) {

        const user = await this.userRepository.findUserByEmail(loginUserDto.email)
        if (!user) {
            console.log('invalid email')
            throw new UnauthorizedException('invalid credential')
        }

        const isPasswordMatch = await compare(loginUserDto.password, user.password)

        if (!isPasswordMatch) {
            console.log('password not match ')
            throw new UnauthorizedException('invalid credential')
        }

        if (!user.isVerified) {
            console.log('not verified')
            throw new UnauthorizedException('email not verified')
        }

        const payload = { sub: user._id.toString(), email: user.email }

        console.log('jwt constands ', jwtConstants)

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
            expiresIn: jwtConstants.accessExpiresIn
        })

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
            expiresIn: jwtConstants.refreshExpiresIn
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NOD_ENV === 'production' ? true : false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return { accessToken }
    }

    async verifyEmail(token: string) {
        const secret = this.configService.get<string>('EMAIL_VERIFICATION_SECRET');

        let payload: JwtPayloadDto | null = null;
        let verified = false;

        try {
            // Verify token (throws if invalid or expired)
            payload = await this.jwtService.verify<JwtPayloadDto>(token, { secret });
            verified = true;

            if (payload.sub) {
                await this.userRepository.findUserByIdAndUpdate(payload.sub, { isVerified: true });
            }

        } catch (error) {
            console.error('Token verification failed:', error.message);

            try {
                // Decode without verifying to extract user ID and email
                const decoded = this.jwtService.decode(token) as JwtPayloadDto;

                if (decoded.sub) {
                    await this.userRepository.deleteUserById(decoded.sub);
                    payload = decoded;
                }
            } catch (decodeError) {
                console.error('Failed to decode token for deletion:', decodeError.message);
            }
        }

        return { verified, payload };
    }


    async refreshToken(refreshToken: string | undefined) {
        console.log('refresh token -> ', refreshToken)
        if (!refreshToken) {
            throw new UnauthorizedException('Unauthorized')
        }

        try {
            const token = this.jwtService.verify(refreshToken, { secret: this.configService.get<string>('REFRESH_TOKEN_SECRET') })
            const payload = { sub: token.sub, email: token.email }
            const accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                expiresIn: jwtConstants.accessExpiresIn
            })

            console.log('new access token ', accessToken)
            return { accessToken }
        } catch (error) {
            throw new UnauthorizedException('Unauthorized')
        }

    }

}