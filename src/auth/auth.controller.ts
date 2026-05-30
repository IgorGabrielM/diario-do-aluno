import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { CurrentUserData } from './current-user.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  @Get('me')
  @ApiOperation({ summary: 'Retorna o usuário logado com seu role' })
  me(@CurrentUser() user: CurrentUserData) {
    return user;
  }
}