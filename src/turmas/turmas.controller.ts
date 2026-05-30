import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@UseGuards(JwtAuthGuard)
@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId: string,
  ) {
    return this.turmasService.findAll(user.id, escolaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.turmasService.findOne(id, user.id);
  }

  @Post()
  create(@Body() dto: CreateTurmaDto, @CurrentUser() user: CurrentUserData) {
    return this.turmasService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTurmaDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.turmasService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.turmasService.remove(id, user.id);
  }
}
