import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { DiarioModelosService } from './diario-modelos.service';
import { CreateDiarioModeloDto } from './dto/create-diario-modelo.dto';
import { UpdateDiarioModeloDto } from './dto/update-diario-modelo.dto';
import { CreateDiarioModeloItemDto } from './dto/create-diario-modelo-item.dto';
import { UpdateDiarioModeloItemDto } from './dto/update-diario-modelo-item.dto';

@ApiTags('Diário - Modelos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diario-modelos')
export class DiarioModelosController {
  constructor(private readonly diarioModelosService: DiarioModelosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar modelos de diário da turma' })
  @ApiQuery({ name: 'turma_id', required: true })
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('turma_id') turmaId: string,
  ) {
    return this.diarioModelosService.findAll(user.userId, turmaId, user.role === 'admin');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar modelo por ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diarioModelosService.findOne(id, user.userId, user.role === 'admin');
  }

  @Post()
  @ApiOperation({ summary: 'Criar modelo de diário' })
  create(@Body() dto: CreateDiarioModeloDto, @CurrentUser() user: CurrentUserData) {
    return this.diarioModelosService.create(dto, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar modelo de diário' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDiarioModeloDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.update(id, dto, user.userId, user.role === 'admin');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover modelo de diário' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diarioModelosService.remove(id, user.userId, user.role === 'admin');
  }

  @Post(':id/itens')
  @ApiOperation({ summary: 'Adicionar item ao modelo' })
  addItem(
    @Param('id') id: string,
    @Body() dto: CreateDiarioModeloItemDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.addItem(id, dto, user.userId, user.role === 'admin');
  }

  @Patch(':id/itens/:itemId')
  @ApiOperation({ summary: 'Atualizar item do modelo' })
  updateItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateDiarioModeloItemDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.updateItem(id, itemId, dto, user.userId, user.role === 'admin');
  }

  @Delete(':id/itens/:itemId')
  @ApiOperation({ summary: 'Remover item do modelo' })
  removeItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.removeItem(id, itemId, user.userId, user.role === 'admin');
  }
}