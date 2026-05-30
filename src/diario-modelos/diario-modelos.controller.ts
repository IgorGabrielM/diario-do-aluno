import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { DiarioModelosService } from './diario-modelos.service';
import { CreateDiarioModeloDto } from './dto/create-diario-modelo.dto';
import { UpdateDiarioModeloDto } from './dto/update-diario-modelo.dto';
import { CreateDiarioModeloItemDto } from './dto/create-diario-modelo-item.dto';
import { UpdateDiarioModeloItemDto } from './dto/update-diario-modelo-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('diario-modelos')
export class DiarioModelosController {
  constructor(private readonly diarioModelosService: DiarioModelosService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('turma_id') turmaId: string,
  ) {
    return this.diarioModelosService.findAll(user.id, turmaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diarioModelosService.findOne(id, user.id);
  }

  @Post()
  create(@Body() dto: CreateDiarioModeloDto, @CurrentUser() user: CurrentUserData) {
    return this.diarioModelosService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDiarioModeloDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.diarioModelosService.remove(id, user.id);
  }

  @Post(':id/itens')
  addItem(
    @Param('id') id: string,
    @Body() dto: CreateDiarioModeloItemDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.addItem(id, dto, user.id);
  }

  @Patch(':id/itens/:itemId')
  updateItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateDiarioModeloItemDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.updateItem(id, itemId, dto, user.id);
  }

  @Delete(':id/itens/:itemId')
  removeItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.diarioModelosService.removeItem(id, itemId, user.id);
  }
}