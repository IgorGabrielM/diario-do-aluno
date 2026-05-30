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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { CoordenadorasService } from './coordenadoras.service';
import { CreateCoordenadoraDto } from './dto/create-coordenadora.dto';
import { UpdateCoordenadoraDto } from './dto/update-coordenadora.dto';

@ApiTags('Coordenadoras')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('coordenadoras')
export class CoordenadorasController {
  constructor(private readonly coordenadorasService: CoordenadorasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar coordenadoras' })
  @ApiQuery({ name: 'escola_id', required: false })
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId?: string,
  ) {
    return this.coordenadorasService.findAll(user.userId, user.escolaId ?? escolaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar coordenadora por ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.coordenadorasService.findOne(id, user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar coordenadora' })
  create(
    @Body() dto: CreateCoordenadoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.coordenadorasService.create(dto, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar coordenadora' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCoordenadoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.coordenadorasService.update(id, dto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover coordenadora' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.coordenadorasService.remove(id, user.userId);
  }
}