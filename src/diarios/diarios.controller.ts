import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { DiariosService } from './diarios.service';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';

@ApiTags('Diários')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diarios')
export class DiariosController {
  constructor(private readonly diariosService: DiariosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar diários (filtro por aluno e/ou data)' })
  @ApiQuery({ name: 'aluno_id', required: false })
  @ApiQuery({ name: 'data', required: false, example: '2026-05-30' })
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('aluno_id') alunoId?: string,
    @Query('data') data?: string,
  ) {
    return this.diariosService.findAll(user.userId, alunoId, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar diário por ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.findOne(id, user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar diário' })
  create(@Body() dto: CreateDiarioDto, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.create(dto, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar diário' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDiarioDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diariosService.update(id, dto, user.userId);
  }

  @Post(':id/enviar')
  @ApiOperation({ summary: 'Enviar diário via WhatsApp para os responsáveis' })
  enviar(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.enviar(id, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover diário' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diariosService.remove(id, user.userId);
  }
}