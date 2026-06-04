import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
  @ApiOperation({ summary: 'Listar todos os modelos de diário' })
  findAll() {
    return this.diarioModelosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar modelo por ID' })
  findOne(@Param('id') id: string) {
    return this.diarioModelosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar modelo de diário' })
  create(@Body() dto: CreateDiarioModeloDto) {
    return this.diarioModelosService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar modelo de diário' })
  update(@Param('id') id: string, @Body() dto: UpdateDiarioModeloDto) {
    return this.diarioModelosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover modelo de diário' })
  remove(@Param('id') id: string) {
    return this.diarioModelosService.remove(id);
  }

  @Post(':id/itens')
  @ApiOperation({ summary: 'Adicionar item ao modelo' })
  addItem(@Param('id') id: string, @Body() dto: CreateDiarioModeloItemDto) {
    return this.diarioModelosService.addItem(id, dto);
  }

  @Patch(':id/itens/:itemId')
  @ApiOperation({ summary: 'Atualizar item do modelo' })
  updateItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateDiarioModeloItemDto,
  ) {
    return this.diarioModelosService.updateItem(id, itemId, dto);
  }

  @Delete(':id/itens/:itemId')
  @ApiOperation({ summary: 'Remover item do modelo' })
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.diarioModelosService.removeItem(id, itemId);
  }
}
