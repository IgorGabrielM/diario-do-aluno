import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { EscolasService } from './escolas.service';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';

@ApiTags('Escolas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('escolas')
export class EscolasController {
  constructor(private readonly escolasService: EscolasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar escolas do usuário' })
  findAll(@CurrentUser() user: CurrentUserData) {
    return this.escolasService.findAll(user.userId, user.role === 'admin');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar escola por ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.escolasService.findOne(id, user.userId, user.role === 'admin');
  }

  @Post()
  @ApiOperation({ summary: 'Criar escola' })
  create(@Body() dto: CreateEscolaDto, @CurrentUser() user: CurrentUserData) {
    return this.escolasService.create(dto, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar escola' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEscolaDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.escolasService.update(id, dto, user.userId, user.role === 'admin');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover escola' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.escolasService.remove(id, user.userId, user.role === 'admin');
  }
}