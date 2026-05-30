import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { DiariosService } from './diarios.service';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';

@UseGuards(JwtAuthGuard)
@Controller('diarios')
export class DiariosController {
  constructor(private readonly diariosService: DiariosService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('aluno_id') alunoId?: string,
    @Query('data') data?: string,
  ) {
    return this.diariosService.findAll(user.id, alunoId, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.findOne(id, user.id);
  }

  @Post()
  create(@Body() dto: CreateDiarioDto, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDiarioDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diariosService.update(id, dto, user.id);
  }

  @Post(':id/enviar')
  enviar(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.enviar(id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.remove(id, user.id);
  }
}