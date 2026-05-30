import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      this.logger.error(`Auth falhou — info: ${JSON.stringify(info?.message ?? info)}, err: ${err?.message ?? err}`);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}