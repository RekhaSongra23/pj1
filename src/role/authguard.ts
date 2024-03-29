import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}    //dependency injection
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: `${process.env.JWT_SECRET}`,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  async validate(payload: any) {
    const user = {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

