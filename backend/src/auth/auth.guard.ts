import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext):Promise<boolean> {
        console.log('start verifying token')
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }

        try {
            const payload = await this.jwtService.verify(
                token,
                {
                    secret: process.env.ACCESS_TOKEN_SECRET
                }
            );
            request['user'] = payload;
            console.log('payload ', payload)
        } catch {
            throw new UnauthorizedException('Unauthorized');
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}