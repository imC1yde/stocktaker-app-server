import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from "@nestjs/jwt"
import { JwtConfig } from '@src/infrastructure/config/jwt.config'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JwtConfig
  ) {}

  // available only with graphql
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext()
    const req = ctx.req
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new UnauthorizedException('Invalid token')

    const token = authHeader.split(" ")[1]

    try {
      const payload = await this.jwtService.verifyAsync(token)
      req.user = payload

      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid token or token is inspired')
    }
  }
}