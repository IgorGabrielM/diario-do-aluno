import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { UserRole } from './jwt.strategy';

export interface CurrentUserData {
  id: string;
  email?: string;
  role?: UserRole;
  userId: string;
  escolaId?: string;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): CurrentUserData => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);