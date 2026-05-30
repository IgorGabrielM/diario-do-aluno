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
import { ProfessorasService } from './professoras.service';
import { CreateProfessoraDto } from './dto/create-professora.dto';
import { UpdateProfessoraDto } from './dto/update-professora.dto';

@ApiTags('Professoras')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('professoras')
export class ProfessorasController {
  constructor(private readonly professorasService: ProfessorasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar professoras da escola' })
  @ApiQuery({ name: 'escola_id', required: false })
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId?: string,
  ) {
    return this.professorasService.findAll(user.userId, user.escolaId ?? escolaId!);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar professora por ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.professorasService.findOne(id, user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar professora' })
  create(
    @Body() dto: CreateProfessoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.professorasService.create(dto, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar professora' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProfessoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.professorasService.update(id, dto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover professora' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.professorasService.remove(id, user.userId);
  }
}